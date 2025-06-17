'use client'

import { useState } from "react";
import { DishesProps } from "../../../../../utils/types/types";

import { use } from "react";

import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { FoodCard } from "../FoodCard/Card";
import { FoodModal } from "../modalFood/Modal";
import { GuestCheckoutWarning } from "@/components/globalComponents/warningModal/WarningModal";

import { useMessageContext } from "../../../../../context/messagesContext";
import { useWarningModalContext } from "../../../../../context/warningModalContext";
import { useAdminContext } from "../../../../../context/isAdminContext";

export default function FoodGrid({ menu }: { menu: Promise<DishesProps[]> }) {
    const dishes = use(menu)

    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()
    const { isAdmin } = useAdminContext()

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] gap-5 relative animate`}>

                {/* Cards de loading */}
                {/* {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))} */}

                {/* Pratos disponiveis */}
                {dishes?.map((item, index) => (
                    <a key={item._id}
                        onClick={() => {
                            setModalIsOpen(!modalIsOpen)
                            setClickedDish(item)
                        }} className="cursor-pointer">
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

                {/* {!dishes && <NotFoundData text='Dados não encontrados' />} */}
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