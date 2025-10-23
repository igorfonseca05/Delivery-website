'use client'

// Contexto
import { useMessageContext } from "../../../../../context/messagesContext";
import { useWarningModalContext } from "../../../../../context/warningModalContext";
import { useFetchData } from "../../../../../hooks/useFetch";
import { useCategoryContext } from "../../../../../context/categoryContext";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Interface
import { DishesProps } from "../../../../../utils/types/types";

// Components
import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { FoodCard } from "../FoodCard/Card";
import { FoodModal } from "../modalFood/Modal";
import { GuestCheckoutWarning } from "@/components/globalComponents/warningModal/WarningModal";
import { CardsLoading } from "@/components/globalComponents/cardsLoading/CardsLoading";

import { getImageSourceType, verifyEnvironment } from "../../../../../utils/helperFunctions";


export default function FoodGrid() {
    const { category } = useCategoryContext()
    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [animate, setAnimate] = useState('')
    const [url, setUrl] = useState('')

    const { data: dishes, loading, error } = useFetchData(url)

    console.log(dishes)


    function getAPI_URL() {
        const baseUrl = category === 'Todos' ?
            `/api/cardapio`
            : `/api/cardapio?category=${category}`;

        setUrl(baseUrl)
    }

    useEffect(() => {
        category && getAPI_URL()
        setAnimate('animate')
        setTimeout(() => setAnimate(''), 100)
    }, [category])


    useEffect(() => {
        error && toast.error(error)
        msgFromMessageContext && toast.error(msgFromMessageContext)
        setError('')
    }, [error, msgFromMessageContext])


    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] gap-5 relative ${animate}`}>

                {/* Loading cards */}
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                {/* Rendering dishes cards on screen */}
                {dishes?.map((item, index) => {
                    return (
                        <a key={item._id}
                            className="cursor-pointer"
                            onClick={() => {
                                setModalIsOpen(!modalIsOpen)
                                setClickedDish(item)
                            }}>
                            <FoodCard
                                key={item._id}
                                _id={item._id}
                                name={item.name}
                                imageUrl={getImageSourceType(item.image)}
                                sizes={item.sizes}
                                category={item.category}
                                description={item.description}
                            />
                        </a>
                    )
                })}

                {!dishes &&
                    <NotFoundData
                        text='Nenhum prato encontrado.'
                        description="Volte mais tarde para ver se tem algo quentinho saindo da cozinha!" />}
            </div>

            {modalIsOpen &&
                clickedDish &&
                <FoodModal
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                    clickedDish={clickedDish}
                />}
            {isOpen && <GuestCheckoutWarning />}
        </>

    );
};