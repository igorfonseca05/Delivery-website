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
    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()

    const [url, setUrl] = useState('')
    const { data: dishes, loading, error } = useFetchData(url)

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    console.log(dishes)

    function verifyEnvironment() {
        const isDevelopmentEnv = process.env.NODE_ENV === 'development'
        const isProductionEnv = process.env.NODE_ENV === 'production'
        const localAPI = process.env.NEXT_PUBLIC_API
        const remoteAPI = process.env.NEXT_PUBLIC_MENU_API

        const apiURL = isDevelopmentEnv && localAPI || isProductionEnv && remoteAPI

        return apiURL
    }

    function getAPI_URL() {
        const url = verifyEnvironment()

        const baseUrl = category === 'Todos' ?
            `${url}/api/cardapio`
            : `${url}/api/cardapio?category=${category}`;

        setUrl(`${process.env.NEXT_PUBLIC_MENU_API}`)
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
            <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] gap-5 relative animate`}>

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
                {!dishes || dishes.length === 0 && <NotFoundData text='Dados não encontrados' />}

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

    function notFoundFood() {
        return (
            <div>

            </div>
        )
    }
};