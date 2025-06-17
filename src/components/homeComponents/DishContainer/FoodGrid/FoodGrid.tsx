'use client'

import { useEffect, useState } from "react";
import { DishesProps } from "../../../../../utils/types/types";

import { use } from "react";

import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { FoodCard } from "../FoodCard/Card";
import { FoodModal } from "../modalFood/Modal";
import { GuestCheckoutWarning } from "@/components/globalComponents/warningModal/WarningModal";

import { useMessageContext } from "../../../../../context/messagesContext";
import { useWarningModalContext } from "../../../../../context/warningModalContext";
import { useAdminContext } from "../../../../../context/isAdminContext";
import { useFetchData } from "../../../../../hooks/useFetch";
import { CardsLoading } from "@/components/globalComponents/cardsLoading/CardsLoading";

import { useCategoryContext } from "../../../../../context/categoryContext";
import { toast } from "react-toastify";


export default function FoodGrid() {

    const { category } = useCategoryContext()

    const url = !category || category === 'Todos' ?
        `${process.env.NEXT_PUBLIC_API}` :
        `${process.env.NEXT_PUBLIC_API}?category=${category}`

    const { data: dishes, loading, error } = useFetchData(url)

    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()
    const { isAdmin } = useAdminContext()

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        error && toast.error(error)
        msgFromMessageContext && toast.error(msgFromMessageContext)

        setError('')

    }, [error, msgFromMessageContext])

    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] gap-5 relative animate`}>

                {/* Cards de loading */}
                {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                {/* Pratos disponiveis */}
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
                {!dishes && <NotFoundData text='Dados não encontrados' />}

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