"use client";

import { useState } from "react";
// import { FaHamburger, FaPizzaSlice, FaFish, FaDrumstickBite } from "react-icons/fa";
// import { GiNoodles, GiCow, GiChopsticks } from "react-icons/gi";
import { MdOutlineAllInclusive } from "react-icons/md";

import { FaUtensils, FaGlassWhiskey, FaIceCream } from 'react-icons/fa';
import { MdFastfood, MdLocalBar } from 'react-icons/md';
import { GiChefToque, GiFrenchFries, GiNoodles } from 'react-icons/gi';

import { DishesProps } from "../../../../utils/types/types";
import { IconType } from "react-icons";

import { useCategoryContext } from "../../../../context/categoryContext";

import { useFetchData } from "../../../../hooks/useFetch";

export function CategorySelector({ categories }: { categories: DishesProps[] }) {


    const [selected, setSelected] = useState('Todos');
    const [icons, setIcons] = useState([
        MdOutlineAllInclusive,
        FaUtensils,
        MdFastfood,
        GiChefToque,
        FaGlassWhiskey,
        MdLocalBar,
        GiFrenchFries,
        FaIceCream,
        GiNoodles
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
        <div className="basicStyle shadow-sm">
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
                          ${isSelected ? "bg-[#ffb443]" : "bg-white text-gray-700"}
                          hover:bg-[#ffb443] hover:text-white transition`}
                        >
                            <Icon className="text-lg" />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
