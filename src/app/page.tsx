
import SlideShow from "@/components/homeComponents/carrosel";
import { ContentContainer } from "@/components/globalComponents/Container/container";
import { CategorySelector } from "@/components/homeComponents/categorySelector/category";
import { DishesContainer } from "../components/homeComponents/Food_Card_Container/FoodCardContainer";
import { GifLoading } from "../components/globalComponents/loading_gif";
import { Suspense } from "react";

import { useServerFetch } from "../../service/useServerFetch";
import { DishesProps } from "../../utils/types/types";
import { CategoryContextProvider } from "../../context/categoryContext";


export default async function Home() {
  const url = 'http://localhost:5000/cardapio'
  const data: DishesProps[] = await useServerFetch(url)

  return (
    <ContentContainer>
      <Suspense fallback={<GifLoading />} >
        {/* <SlideShow /> */}
        <h1 className="text-2xl mt-5 font-bold">Escolha uma categoria</h1>
        <CategoryContextProvider>
          <CategorySelector categories={data} />
          <DishesContainer />
        </CategoryContextProvider>
      </Suspense>
    </ContentContainer>
  );
}
