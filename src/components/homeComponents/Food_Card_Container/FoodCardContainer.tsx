'use client'

import { NotFoundData } from "@/components/globalComponents/notFoundData/notFound"
import { useFetchData } from "../../../../hooks/useFetch"
import { useCategoryContext } from "../../../../context/categoryContext"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useToggleCartContext } from "../../../../context/toggleCartContext"

import { FoodCard } from "./FoodCard/Card"
import { CardsLoading } from "@/components/globalComponents/cardsLoading/CardsLoading"
import Link from "next/link"
import { FoodModal } from "./modalFood/Modal"
import { DishConfig, DishesProps } from "../../../../utils/types/types"
import { useMessageContext } from "../../../../context/messagesContext"
import { useWarningModalContext } from "../../../../context/warningModalContext"
import { GuestCheckoutWarning } from "@/components/globalComponents/warningModal/WarningModal"

import { useAdminContext } from "../../../../context/isAdminContext"
import OrdersTable from "./adminPainel/AdminPainel"


export function DishesContainer() {

    const { category } = useCategoryContext()
    const { error: msgFromMessageContext, setError } = useMessageContext()
    const { isOpen } = useWarningModalContext()
    const { isAdmin } = useAdminContext()

    // Gerando URL dinâmicamente com base na categoria
    const url = category === 'Todos' ?
        `http://localhost:5000/cardapio` :
        `http://localhost:5000/cardapio?category=${category}`

    // Buscando dados
    const { data: dishes, loading, error } = useFetchData(url)

    const [clickedDish, setClickedDish] = useState<DishesProps>()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    // Capturando erro de fetch
    useEffect(() => {
        error && toast.error(error)
        msgFromMessageContext && toast.error(msgFromMessageContext)

        setTimeout(() => {
            setError('')
        }, 2000)

    }, [error, msgFromMessageContext])



    return (
        <>
            {!isAdmin ? (
                <>
                    <div className="min-h-150">
                        <h1 className="capitalize text-2xl mb-3 font-medium animate">{category || "Todos"}</h1>
                        <div className={`grid grid-cols-1 md:grid-cols-[auto_auto] gap-5 relative animate`}>

                            {/* Cards de loading */}
                            {loading && [...Array(10)].map((_, i) => (<CardsLoading key={i} />))}

                            {/* Pratos disponiveis */}
                            {!loading && dishes?.map((item, index) => (
                                <button key={item.id}
                                    onClick={() => {
                                        setModalIsOpen(!modalIsOpen)
                                        setClickedDish(item)
                                    }} className="cursor-pointer">
                                    <FoodCard
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        imageUrl={item.image}
                                        sizes={item.sizes}
                                        category={item.category}
                                        description={item.description}
                                    />
                                </button>
                            ))}
                            {!dishes && <NotFoundData text='Dados não encontrados' />}
                        </div>
                    </div>
                    {modalIsOpen && clickedDish && <FoodModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        clickedDish={clickedDish} />}
                    {isOpen && <GuestCheckoutWarning />}
                </>
            ) : (
                <OrdersTable />
            )}
        </>
    )
}