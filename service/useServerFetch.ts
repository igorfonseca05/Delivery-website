

interface useServerProps {
    cache: RequestCache | undefined,
    next?: {
        revalidate: number | undefined,
        tags?: string[] | undefined
    }
}

export async function useServerFetch(url: string, options?: useServerProps) {
    const res = await fetch(url, options)

    if (!res.ok) {
        throw new Error('Falha ao obter dados' + res.status)
    }

    return res.json()
}