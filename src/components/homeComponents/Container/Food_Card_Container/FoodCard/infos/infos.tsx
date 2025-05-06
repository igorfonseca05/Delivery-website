"use client"

interface Dish_InfoProps {
    infoIsOpen: boolean,
    setInfoIsOpen: (infoIsOpen: boolean) => void
}

export function Dish_Info({ infoIsOpen, setInfoIsOpen }: Dish_InfoProps) {

    return (
        <div className={`h-0 overflow-hidden  ${infoIsOpen ? 'h-10 bg-amber-300 animate mt-1' : 'h-0 animate'}`}>
            <p>oi</p>
        </div>
    )
}