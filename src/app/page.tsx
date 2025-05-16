
import SlideShow from "@/components/homeComponents/carrosel";
import { ContentContainer } from "@/components/globalComponents/Container/container";
import { CategorySelector } from "@/components/homeComponents/categorySelector/category";
import { DishesContainer } from "../components/homeComponents/Food_Card_Container/FoodCardContainer";
import { GifLoading } from "../components/homeComponents/Food_Card_Container/loading_gif";
import { Suspense } from "react";

import { useServerFetch } from "../../service/useServerFetch";
import { DishesProps } from "../../utils/types/types";


export default async function Home() {
  const url = 'http://localhost:5000/cardapio'
  const data: DishesProps[] = await useServerFetch(url)

  return (
    <ContentContainer>
      <Suspense fallback={<GifLoading />} >
        {/* <SlideShow /> */}
        <h1 className="text-2xl mt-5">Escolha uma categoria</h1>
        <CategorySelector categories={data} />
        <DishesContainer dishes={data} />
      </Suspense>
    </ContentContainer>
  );
}
