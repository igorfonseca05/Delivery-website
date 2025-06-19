
import { useCartContext } from "../../../../../../context/cartContext";
import { CardItem } from "../CardItem/card_SideBar";

export default function Body() {
    const { cartItensArray } = useCartContext()

    return (
        <div className="flex flex-col grow-2 rounded-lg gap-y-2 mt-1 overflow-y-auto cartScroll">
            {cartItensArray && cartItensArray?.map(({ _id, name, price, imageUrl, quantity }) => (
                <CardItem
                    key={_id}
                    id={_id}
                    name={name}
                    price={price}
                    imageUrl={imageUrl}
                    quantity={quantity} />
            ))}
        </div>
    );
};