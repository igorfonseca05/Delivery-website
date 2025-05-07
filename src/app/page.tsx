import SlideShow from "@/components/homeComponents/carrosel";
import { ContentContainer } from "@/components/homeComponents/Container";
import { CategorySelector } from "../components/homeComponents/categorySelector";
import { DishesContainer } from "../components/homeComponents/Container/Food_Card_Container";
import { GifLoading } from "../components/homeComponents/Container/Food_Card_Container/loading_gif";
import { Suspense } from "react";

import Image from "next/image";

export default function Home() {


  return (
    <ContentContainer>
      <Suspense fallback={<GifLoading />} >
        <SlideShow />
        <h1 className="text-2xl mt-5">Escolha uma categoria</h1>
        <CategorySelector />
        <Suspense fallback={<GifLoading />}>
          <DishesContainer />
        </Suspense>
      </Suspense>
    </ContentContainer>
  );
}
