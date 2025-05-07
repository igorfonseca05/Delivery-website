"use client";

import { useState } from "react";
import { FaHamburger, FaPizzaSlice, FaFish, FaDrumstickBite } from "react-icons/fa";
import { GiNoodles, GiCow, GiChopsticks } from "react-icons/gi";
import { MdOutlineAllInclusive } from "react-icons/md";

const categories = [
    { label: "Todos", icon: MdOutlineAllInclusive },
    { label: "Burger", icon: FaHamburger },
    { label: "Pizza", icon: FaPizzaSlice },
    { label: "Pasta", icon: GiNoodles },
    { label: "Asian", icon: GiChopsticks },
    { label: "Beef", icon: GiCow },
    { label: "Chicken", icon: FaDrumstickBite },
    { label: "Fish", icon: FaFish },
];

export function CategorySelector() {
    const [selected, setSelected] = useState("Todos");

    return (
        <div className="basicStyle shadow-sm">
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selected === category.label;
                    return (
                        <button
                            key={category.label}
                            onClick={() => setSelected(category.label)}
                            className={`flex items-center gap-1 p-3 grow-2 justify-center rounded-lg text-sm font-medium
                  ${isSelected ? "bg-[#ffb443]" : "bg-white text-gray-700"}
                  hover:bg-[#ffb443] hover:text-white transition`}
                        >
                            <Icon className="text-lg" />
                            {category.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
