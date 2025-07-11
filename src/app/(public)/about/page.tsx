
import { ContentContainer } from "@/components/globalComponents/Container/container"
import Image from "next/image"

export default function About() {
    return (
        <ContentContainer>
            <div className="max-w-7xl mx-auto relative mt-3">
                <figure className="relative h-60 rounded-lg overflow-hidden">
                    <Image src='/aboutUs.jpg' className="rounded-2xl" fill alt="Capa página sobre nós" objectFit="cover" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src={"/logo.svg"}
                            alt="Logo Paraíso da Gastronomia"
                            width={350}
                            height={350}
                        />
                    </div>
                </figure>
                <section className="mb-16 mt-3">
                    <h1 className="text-3xl font-bold mb-6 text-start flex justify-center items-center relative">Sobre Nós</h1>
                    <main className="flex gap-x-4">
                        <article>
                            <p className="text-lg text-start text-gray-700 mb-4">
                                No Paraíso da Gastronomia, acreditamos que uma boa refeição transforma o dia. Fundado por Leandro Uchoa em Cruzeiro-SP, nosso propósito é oferecer marmitex saborosos, acessíveis e preparados com carinho. Utilizamos ingredientes frescos e receitas caseiras para garantir qualidade em cada pedido.
                                Seja no trabalho ou em casa, leve mais sabor para sua rotina com a gente!
                            </p>
                            {/* <p className="text-lg text-gray-700">
                                No Paraíso da Gastronomia, nossa missão é garantir a satisfação de nossos clientes com o melhor em qualidade, sabor e
                                atendimento. Venha nos visitar e descubra o prazer de comer bem!
                            </p> */}
                        </article>
                    </main>
                </section>

                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Qualidade no Sabor</h3>
                            <p className="text-gray-600">
                                Pratos feitos com ingredientes frescos, garantindo um sabor inconfundível em cada refeição.
                            </p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Praticidade e Agilidade</h3>
                            <p className="text-gray-600">
                                Marmitex prontos para levar, com um serviço rápido e eficiente para sua conveniência.
                            </p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
                            <p className="text-gray-600">
                                Atendimento cordial e atento, sempre focado em proporcionar a melhor experiência para você.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Onde nos encontrar</h2>
                    <div className="w-full h-[300px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.259205852605!2d-44.94054222546217!3d-22.558376625510743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9df6c43ceaef5d%3A0x35dd57423878f4dd!2sR.%20Eroni%20do%20Santos%20Goulart%2C%2024%20-%20Jardim%20Paraiso%2C%20Cruzeiro%20-%20SP%2C%2012721-295!5e1!3m2!1spt-BR!2sbr!4v1731684403898!5m2!1spt-BR!2sbr"
                            className="w-full h-full border-0 rounded-lg shadow"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>

        </ContentContainer >
    )
}