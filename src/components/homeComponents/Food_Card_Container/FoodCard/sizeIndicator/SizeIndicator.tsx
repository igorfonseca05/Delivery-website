

import { MdFastfood } from "react-icons/md";
import { Sizes } from "../../../../../../utils/types/types";
import { IconType } from "react-icons";
import React from "react";

interface SizeProps {
    id?: number,
    price?: number,
    type?: string,
    icon?: IconType,
    sizes: Sizes[],
    sizeDishName: string,
    setSizeDishName: (sizeDishName: string) => void
}

export function SizeIndicator({
    id,
    price,
    icon: Icon,
    type,
    sizes,
    sizeDishName,
    setSizeDishName
}: SizeProps) {

    // console.log(sizeDishName)

    return (
        <div className="flex items-center">
            <div className="flex gap-2 items-baseline-last">
                {sizes.map((item, index) => (

                    <button key={index} className={`flex flex-col items-center p-1 rounded-lg 
                    ${item.type === 'Médio' && 'order-2'}
                    ${item.type === sizeDishName && item.type !== "Único" && ' bg-orange-100 border-orange-300 shadow-sm'}`}
                        onClick={() => setSizeDishName(item?.type as string)}>

                        {Icon && <Icon className={`m-auto text-[14px] 
                         ${item.type === 'Médio' || item.type === 'Único' ? 'text-[18px]' : ''}`} />}

                        <p className="text-[11px]">{item.type}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}