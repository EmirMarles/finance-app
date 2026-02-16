import { useState, useEffect } from "react"

export function useDebouncedSearch(value) {

    const [debouncedV, setDebouncedV] = useState('')

    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebouncedV(value)
        }, 1000)

        return () => clearTimeout(timeId)
    }, [value])

    return debouncedV
}