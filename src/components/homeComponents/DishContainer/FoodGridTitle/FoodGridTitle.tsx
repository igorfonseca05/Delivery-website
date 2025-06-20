"use client"

import { useCategoryContext } from "../../../../../context/categoryContext";

export default function FoodGridTitle() {

    const { category } = useCategoryContext()

    return (
        <h1 className="capitalize text-2xl my-3 font-extralight animate">{category || "Todos"}</h1>
    );
};