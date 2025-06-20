'use client'

import { useEffect, useState } from "react";
import { DishesProps } from "../utils/types/types";

const cache: Record<string, DishesProps[]> = {}

export function useFetchData(url: string) {

    const [data, setData] = useState<DishesProps[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        if (!url) return

        const controller = new AbortController()

        async function getData() {
            setLoading(true)
            setError(null)

            try {

                // Analisando se dados então cacheados
                if (cache[url]) {
                    setData(cache[url])
                    return
                }
                // await new Promise(resolve => setTimeout(() => resolve(''), 5000))

                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error('Erro ao obter dados da API')
                }

                const dishes = await res.json()
                setData(dishes)
                cache[url] = dishes

            } catch (error: any) {
                if (error.name === "AbortError") {
                    // setError('Requisição abortada');
                } else {
                    // setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }

        getData()

        return () => controller.abort()
    }, [url])

    return { data, loading, error }

}