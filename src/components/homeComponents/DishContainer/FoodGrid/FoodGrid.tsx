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

import { verifyEnvironment } from "../../../../../utils/helperFunctions";


export default function FoodGrid() {
    const { category } = useCategoryContext()
    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()

    const [url, setUrl] = useState('')
    const { data: dishes, loading, error } = useFetchData(url)

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function getAPI_URL() {
        const url = verifyEnvironment()

        console.log(url)

        const baseUrl = category === 'Todos' ?
            `${url}/api/cardapio`
            : `${url}/api/cardapio?category=${category}`;

        setUrl(baseUrl)
    }

    useEffect(() => {
        category && getAPI_URL()
    }, [category])


    useEffect(() => {
        error && toast.error(error)
        msgFromMessageContext && toast.error(msgFromMessageContext)
        setError('')
    }, [error, msgFromMessageContext])


    return (
        <>
            <div className={`grid grid-cols-1 min-h-[355px] md:grid-cols-[auto_auto] gap-5 relative animate`}>

                {/* Loading cards */}
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                {/* Rendering dishes cards on screen */}
                {dishes?.map((item, index) => (

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
                            imageUrl={item.image}
                            sizes={item.sizes}
                            category={item.category}
                            description={item.description}
                        />
                    </a>
                ))}

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