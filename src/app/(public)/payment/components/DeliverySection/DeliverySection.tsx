import { FormEvent } from "react";
import { UserData } from "../../../../../../utils/types/types";
import Delivery from "../addressForm/Delivery";
import GetOrderContainer from "../getOrderContainer/getOrderContainer";
import PickUpSection from "../pickUpInStoreSection/PickUpSection";

interface DeliverySectionProps {
    order?: number
    getOrder?: number
    setGetOrder: (getOrder: number) => void,
    message: string,
    handleFormSubmit: (e: FormEvent) => void,
    formData: UserData,
    setFormData: (FormData: UserData) => void,
    moveToTheNextForm: () => void
}

export default function DeliverySection({
    getOrder,
    setGetOrder,
    message,
    handleFormSubmit,
    formData,
    setFormData,
    moveToTheNextForm,
}: DeliverySectionProps) {
    return (
        <>
            <GetOrderContainer
                setGetOrder={setGetOrder}
                message='Como você gostaria que obter seu pedido?'
                order={getOrder}
            />

            {
                getOrder === 1 ? (
                    <Delivery
                        handleFormSubmit={handleFormSubmit}
                        formData={formData}
                        setFormData={setFormData} />

                ) : (
                    <PickUpSection moveToTheNextForm={moveToTheNextForm} />
                )
            }
        </>
    );
};