import SlideShow from "@/components/home/carrosel";
import { ContentContainer } from "@/components/home/Container";
import { CategorySelector } from "../components/home/categorySelector";
import { DishesContainer } from "../components/home/Container/Food_Card_Container";
import { GifLoading } from "../components/home/Container/Food_Card_Container/loading_gif";
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
