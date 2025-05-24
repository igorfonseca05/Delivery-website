"use client";


import { useContext, useState } from "react";
import { MdOutlineFastfood, MdOutlineDinnerDining } from "react-icons/md";
import { IconType } from "react-icons";

import { useAdminContext } from "../../../../context/isAdminContext";


import {
    Infinity,
    Utensils,
    HandPlatter,
    Coffee,
    ChefHat,
    CupSoda,
    IceCreamBowl,
} from 'lucide-react';


import { DishesProps } from "../../../../utils/types/types";
import { useCategoryContext } from "../../../../context/categoryContext";


export function CategorySelector({ categories }: { categories: DishesProps[] }) {

    const { isAdmin } = useAdminContext()


    const [selected, setSelected] = useState('Todos');
    const [icons, setIcons] = useState([
        Infinity,
        Utensils,
        Coffee,
        ChefHat,
        MdOutlineFastfood,
        CupSoda,
        HandPlatter,
        IceCreamBowl,
        MdOutlineDinnerDining
    ])

    const { setCategory } = useCategoryContext()

    // obtendo categorias dos itens da base de dados
    const categorySet = new Set<string>()
    categories?.map(({ category }) => {
        categorySet.add(category)
    })

    // Aqui inclui a categoria "Todos"
    const allCategoryItems = Array('Todos', ...categorySet)

    // Criando array de objeto do tipo { label: category, icon: icons[index] }
    const categorias = allCategoryItems.reduce<{ label: string, icon: IconType }[]>((acc, category, index) => {
        acc.push({ label: category, icon: icons[index] })
        return acc
    }, [])


    return (
        <div className={`basicStyle shadow-sm ${isAdmin && 'hidden'}`}>
            <div className="flex gap-3 overflow-x-auto categoryContainer">
                {categorias?.map((item, id) => {
                    const Icon = item.icon;
                    const isSelected = selected === item.label;
                    return (
                        <button
                            key={id}
                            onClick={() => {
                                setSelected(item.label)
                                setCategory(item.label)
                            }}
                            className={`flex items-center gap-1 p-3 min-w-fit grow-2 capitalize justify-center rounded-lg text-sm font-medium
                          ${isSelected ? 'color text-white' : "buttonColorHover  text-gray-700"}
                          hover:bg-[#ffb443] hover:text-white transition`}
                        >
                            <Icon className="text-lg" size={24} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
