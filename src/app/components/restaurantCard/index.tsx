"use client";

import Image from "next/image";
import food from '../../../../public/3.jpg'

interface RestaurantCardProps {
    name: string;
}

export function RestaurantCard({ name }: RestaurantCardProps) {
    return (
        <div className="w-48 rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
            <div className="relative h-32 w-full">
                <Image
                    src={food}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-2">
                <h3 className="text-sm font-semibold">{name}</h3>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <span>15 mins</span> • <span>⭐ 4.8</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">$3.99 delivery fee</p>
            </div>
        </div>
    );
}
