
import SlideShow from "@/components/homeComponents/carrosel";
import { ContentContainer } from "@/components/globalComponents/Container/container";
import { CategorySelector } from "@/components/homeComponents/categorySelector/category";
import { DishesContainer } from "@/components/homeComponents/DishContainer/DishContainer";
import { GifLoading } from "../components/globalComponents/loading_gif";
import { Suspense } from "react";

import { useServerFetch } from "../../service/useServerFetch";
import { DishesProps } from "../../utils/types/types";
import { CategoryContextProvider } from "../../context/categoryContext";
import { ModalProvider } from "../../context/modalContext";
import { WarningModalProvider } from "../../context/warningModalContext";
import OrderSummary from "./(public)/payment/components/orderSummary/OrderSummary";
import OrdersSummary from "@/components/homeComponents/chooseText";
import { Providers } from "./providers";

import foodModel from "../../model/foodModel";
import { dbConnect } from "../../db/dbConnection";

export default async function Home() {
  // const data = await fetch(`http://localhost:3000/api/cardapio`, { cache: 'force-cache' })
  // const dishes = data.json()

  await dbConnect()
  const data = await foodModel.find(); // ou o filtro que você quiser
  const data2 = JSON.stringify(data)

  return (
    <ContentContainer>
      <Suspense fallback={<GifLoading />} >
        <SlideShow />
        <OrdersSummary />
        <Providers>
          <CategorySelector dishes={data2} />
          <DishesContainer />
        </Providers>
      </Suspense>
    </ContentContainer>
  );
}
