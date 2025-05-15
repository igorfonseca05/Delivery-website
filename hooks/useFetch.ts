'use client'

import { useEffect, useState } from "react";
import { DishesProps } from "../utils/types/types";

export function useFetchData(url: string) {

    const [data, setData] = useState<DishesProps[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return

        async function getData() {
            setLoading(true)
            setError(null)

            try {

                const res = await fetch(url)

                if (!res.ok) {
                    throw new Error('Erro ao obter dados da API')
                }

                const dishes = await res.json()
                setData(dishes)

            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getData()

    }, [url])

    return { data, loading, error }

}