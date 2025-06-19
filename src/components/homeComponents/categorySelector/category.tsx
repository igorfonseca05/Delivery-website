"use client";


import { useContext, useState } from "react";
import { MdOutlineFastfood, MdOutlineDinnerDining } from "react-icons/md";
import { IconType } from "react-icons";

import { useAdminContext } from "../../../../context/isAdminContext";

import { use } from "react";

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


export function CategorySelector({ dishes }: { dishes: string }) {

    const categories: DishesProps[] = JSON.parse(dishes)
    const { isAdmin } = useAdminContext()

    const [selected, setSelected] = useState('Todos');
    const [icons, setIcons] = useState([
        'infinito.svg',
        'marmita.svg',
        'dia.svg',
        'casa.svg',
        'macarrao.svg',
        'combos.svg',
        'porcoes.svg'
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
    const categorias = allCategoryItems.reduce<{ label: string, icon: string }[]>((acc, category, index) => {
        acc.push({ label: category, icon: icons[index] })
        return acc
    }, [])


    return (
        <div className={` ${isAdmin && 'hidden'} flex space-x-4 items-center overflow-y-auto`}>
            {categorias?.map((category, id) => {

                const isSelected = category.label === selected

                const upperCaseTitle = category.label[0].toUpperCase() + category.label.slice(1)

                return (
                    <div key={id} className={`rounded-lg flex flex-col justify-center min-w-30 items-center w-fit p-6 shadow-sm grow transition-colors duration-75 ease-in-out ${isSelected ? 'bg-orange-300' : 'bg-white'}`}
                        onClick={() => {
                            setSelected(category.label)
                            setCategory(category.label)
                        }}>
                        <figure className="w-10 h-10 flex justify-center items-center">
                            <img src={category.icon} className="w-full" alt="" />
                        </figure>
                        <p className="w-full text-center text-[clamp(0.8rem,0.8em,2rem)]">{upperCaseTitle}</p>
                    </div>
                )
            })}
        </div>
        // <div className={`bg-white rounded-lg md:w-full shadow-sm ${isAdmin && 'hidden'}`}>
        //     <div className="flex gap-3 overflow-x-auto categoryContainer">
        //         {categorias?.map((item, id) => {
        //             const Icon = item.icon;
        //             const isSelected = selected === item.label;
        //             return (
        //                 <button
        //                     key={id}
        //                     onClick={() => {
        //                         setSelected(item.label)
        //                         setCategory(item.label)
        //                     }}
        //                     className={`flex items-center gap-1 p-3 min-w-fit grow-2 capitalize justify-center rounded-lg text-sm font-medium
        //                   ${isSelected ? 'color text-white' : "buttonColorHover  text-gray-700"}
        //                   hover:bg-[#ffb443] hover:text-white transition`}
        //                 >
        //                     <Icon className="text-lg" size={24} />
        //                     {item.label}
        //                 </button>
        //             );
        //         })}
        //     </div>
        // </div>
    );
}
