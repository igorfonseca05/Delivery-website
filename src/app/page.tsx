import SlideShow from "@/components/homeComponents/carrosel";
import { DivContainer } from "@/components/homeComponents/divContainer";
import { CategorySelector } from "../components/homeComponents/categorySelector";
import { DishesContainer } from "../components/homeComponents/dishesContainer";
import { GifLoading } from "../components/homeComponents/dishesContainer/FoodCard/loading_gif";
import { Suspense } from "react";

import Image from "next/image";

export default function Home() {
  return (
    <DivContainer>
      <SlideShow />
      <h1 className="text-2xl my-3">Escolha uma categoria</h1>
      <CategorySelector />
      <Suspense fallback={<GifLoading />}>
        <DishesContainer />
      </Suspense>
      {/* <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nisi itaque aliquam accusantium. Possimus magnam consequatur ipsa placeat provident, odio nisi corrupti impedit deserunt fugiat? Neque nihil ea vero impedit?
        Eius voluptate, rerum cupiditate molestiae repellendus sed exercitationem omnis tenetur quia sapiente veritatis obcaecati incidunt harum, provident reprehenderit, deleniti aliquam fugit voluptatem fugiat illo magnam. Magni, libero? Laborum, ipsum sunt.
        Reiciendis inventore vero obcaecati, aliquid harum rerum error, dolorum id suscipit tenetur, mollitia libero maxime enim a. Sed labore dolorum qui repudiandae similique tempora iure earum recusandae voluptatum quod. Possimus!
        Adipisci hic fuga voluptatibus totam sit voluptatum excepturi? Natus quibusdam doloribus est reprehenderit ducimus deleniti nobis? Quam ducimus nemo, ab magni perspiciatis pariatur facere quo et tempora, qui aut? Reprehenderit.
        Nostrum beatae sequi nihil quisquam laborum quia dignissimos ducimus vel, nesciunt recusandae dolor. Asperiores necessitatibus ipsam eligendi consectetur enim non excepturi perferendis incidunt, minima, accusantium nostrum quidem. Dolore, sunt beatae!
        Aut corrupti numquam est magni exercitationem minus consequuntur aliquam, velit non. Vero odio ratione, quod dolorem doloribus minus illum mollitia laborum, laudantium cumque omnis. Esse earum eos illum consectetur hic?
        Nam enim atque obcaecati aut nostrum reprehenderit fuga tempore quos, voluptate cupiditate repellat officia dolor corporis tenetur consectetur quidem amet recusandae, dolorum ipsa. Tempora ducimus, veniam repellendus quasi molestiae explicabo.
        Vero non numquam nulla excepturi adipisci quam eos assumenda natus cum aperiam? Architecto sapiente impedit placeat similique? Sapiente accusamus ipsa nobis culpa. Sunt totam enim laudantium aperiam ullam, dolor veritatis!
        In corporis incidunt, aliquam, nemo ipsa eveniet consequuntur eligendi nulla fuga deserunt eum magnam iste harum veritatis ipsam est vel architecto corrupti reprehenderit tempore adipisci! Temporibus incidunt nobis dolores assumenda.
        Accusantium quibusdam aspernatur minus repellat doloremque laboriosam. Vitae, repellendus mollitia doloribus distinctio, corporis natus doloremque neque provident numquam nisi quaerat quasi! Vel non labore, laboriosam beatae nam mollitia numquam omnis!
      </p> */}
    </DivContainer>
  );
}
