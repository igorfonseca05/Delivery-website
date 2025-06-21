

// import { MdFastfood } from "react-icons/md";
import { Sizes } from "../../../../../../utils/types/types";
import { IconType } from "react-icons";
import React from "react";

interface SizeProps {
    icon?: IconType,
    sizes: Sizes[] | undefined,
    sizeDishName: string,
    setSizeDishName: (sizeDishName: string) => void,
    category: string | undefined
}

export function SizeIndicator({
    icon: Icon,
    sizes,
    sizeDishName,
    setSizeDishName,
    category
}: SizeProps) {


    return (
        <div className="flex items-center">
            <div className="flex gap-2 items-baseline-last">
                {sizes?.map((item, index) => {

                    const dishTypeIsEqualToSizeDishName = item.type === sizeDishName
                    const sizeDishIsNotUniqueType = item.type !== "Único"
                    const sizeDishIsMiddleSize = item.type === 'Médio'
                    const sizesArrayLengthEqual2 = sizes.length === 2

                    // Não mostrar icon de tamanho para bebidas
                    // if (category === 'bebidas') return

                    return (
                        <button key={index} className={`flex flex-col items-center p-2 rounded-sm
                            ${dishTypeIsEqualToSizeDishName &&
                            sizesArrayLengthEqual2 && 'TextColor'}`}
                            onClick={() => setSizeDishName(item?.type as string)}>

                            {Icon && <Icon className={`m-auto text-[16px]
                            ${!dishTypeIsEqualToSizeDishName ||
                                !sizeDishIsNotUniqueType && 'text-gray-400'}`} />}

                            <p className={`text-[12px] 
                            ${!dishTypeIsEqualToSizeDishName &&
                                !sizesArrayLengthEqual2 && 'text-gray-400'}`}>{item.type}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}