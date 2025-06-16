// seed.js
import mongoose from 'mongoose'
import MenuModel from './Product.js'

await mongoose.connect('mongodb://localhost:27017/next')

const produtos = [
    {
        "category": "do dia",
        "name": "Strogonoff de Frango",
        "description": "Delicado strogonoff de frango, servido com arroz soltinho, feijão caseiro, batata frita crocante e batata palha.",
        "image": "Strogonoff.webp",
        "sizes": [
            {
                "type": "Mini",
                "price": 18.0
            },
            {
                "type": "Médio",
                "price": 20.0
            }
        ]
    },
    {
        "category": "do dia",
        "name": "Bife à Milanesa",
        "description": "Clássico bife à milanesa servido com arroz, macarrão ao dente, batata frita e uma salada fresca.",
        "image": "bife.jfif",
        "sizes": [
            {
                "type": "Mini",
                "price": 18.0
            },
            {
                "type": "Médio",
                "price": 20.0
            }
        ]
    },
    {
        "category": "do dia",
        "name": "Filé de Frango Crocante",
        "description": "Filé de frango empanado crocante com Ovo Frito, acompanhado de arroz, feijão temperado, batata frita e uma salada variada.",
        "image": "file.jfif",
        "sizes": [
            {
                "type": "Médio",
                "price": 23.0
            }
        ]
    },
    {
        "category": "combos",
        "name": "Frango Empanado ",
        "description": "Frango empanado crocante ao molho cremoso de catupiry, enriquecido com queijo derretido e pedaços de bacon, acompanhado de arroz e batata frita separados.",
        "image": "1.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 55.0
            }
        ]
    },
    {
        "category": "combos",
        "name": "Parmegiana de Carne",
        "description": "Parmegiana de carne caseira, preparada com carinho, servida com arroz e batata frita para duas pessoas.",
        "image": "parmegianacarne.jfif",
        "sizes": [
            {
                "type": "Único",
                "price": 65.0
            }
        ]
    },
    {
        "category": "da casa",
        "name": "Parmegiana de Frango",
        "description": "Parmegiana de frango caseira, com sabor incomparável, servida com arroz e batata frita crocante.",
        "image": "parmegianafrango.webp",
        "sizes": [
            {
                "type": "Mini",
                "price": 22.0
            },
            {
                "type": "Médio",
                "price": 24.0
            }
        ]
    },
    {
        "category": "Combos com Coca",
        "name": "Parmegiana de Frango",
        "description": "Parmegiana de frango caseira com sabor irresistível, acompanhada de arroz e batata frita crocante. Inclui uma lata de Coca-Cola de 350ml para complementar a refeição.",
        "image": "3.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 30.0
            }
        ]
    },
    {
        "category": "Combos com Coca",
        "name": "Parmegiana de Carne ",
        "description": "Deliciosa parmegiana de carne caseira, servida com arroz soltinho e batata frita dourada. Acompanha uma Coca-Cola de 350ml.",
        "image": "5.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 34.0
            }
        ]
    },
    {
        "category": "bebidas",
        "name": "P4 Lemon",
        "description": "Bebida refrescante com sabor de limão e zero açúcar, perfeita para acompanhar suas refeições.",
        "image": "p4.jfif",
        "sizes": [
            {
                "type": "Único",
                "price": 4.0
            }
        ]
    },
    {
        "category": "bebidas",
        "name": "Guaraná Cibal 2L",
        "description": "Tradicional guaraná de 2 litros, ideal para compartilhar em família ou entre amigos.",
        "image": "cical.webp",
        "sizes": [
            {
                "type": "Único",
                "price": 10.0
            }
        ]
    },
    {
        "category": "bebidas",
        "name": "Coca-Cola 2L",
        "description": "A clássica Coca-Cola de 2 litros, refrescante e ideal para qualquer ocasião.",
        "image": "coca.png",
        "sizes": [
            {
                "type": "Único",
                "price": 13.0
            }
        ]
    },
    {
        "category": "bebidas",
        "name": "Coca-Cola Lata",
        "description": "A tradicional Coca-Cola de 350ml, na medida perfeita para uma refeição individual.",
        "image": "5.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 6.0
            }
        ]
    },
    {
        "category": "bebidas",
        "name": "Coca-Cola Lata Zero",
        "description": "A mesma Coca-Cola, agora sem açúcar, para quem deseja uma opção mais leve, sem abrir mão do sabor.",
        "image": "2.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 6.0
            }
        ]
    },
    {
        "category": "porções",
        "name": "Porção de Peixe",
        "description": "Suculenta porção de 700g de filé de peixe panga sem espinhos, acompanhada de limão para realçar o sabor. Ideal para compartilhar.",
        "image": "4.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 65.0
            }
        ]
    },
    {
        "category": "porções",
        "name": "Porção de Peixe",
        "description": "Porção de 570g de filé de peixe panga sem espinhos, servida com limão fresco. Perfeita para uma refeição leve e saborosa.",
        "image": "3.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 40.0
            }
        ]
    },
    {
        "category": "porções",
        "name": "Porção de Coxinha de Frango",
        "description": "Crocantes coxinhas de frango empanadas com farinha panko, acompanhadas de molho barbecue para uma explosão de sabor.",
        "image": "4.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 50.0
            }
        ]
    },
    {
        "category": "porções",
        "name": "Porção de Batata Frita",
        "description": "Batata frita dourada e crocante, coberta com queijo cheddar cremoso e pedaços de bacon crocante. Um verdadeiro deleite!",
        "image": "2.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 45.0
            }
        ]
    },
    {
        "category": "sobremesas",
        "name": "Copo Paraíso Misto",
        "description": "Essa sobremesa é da casa, rica em sabor. Copo paraíso de creme de ninho com bolo fofinho com brigadeiro gourmet de panela.",
        "image": "1.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 10.0
            }
        ]
    },
    {
        "category": "sobremesas",
        "name": "Copo Paraíso de Geleia de Morango",
        "description": "Essa sobremesa é da casa, rica em sabor. Copo paraíso de ninho com morango, pedaços de bolo e geleia de morango caseira.",
        "image": "5.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 10.0
            }
        ]
    },
    {
        "category": "sobremesas",
        "name": "Mini Churros",
        "description": "Essa deliciosa sobremesa de mini churros é uma porção com 10 mini churros deliciosos passados no açúcar e canela, prontos para acompanhar um doce de leite cremoso.",
        "image": "2.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 20.0
            }
        ]
    },
    {
        "category": "massas",
        "name": "Nhoque à Bolonhesa",
        "description": "Marmitex somente de nhoque à bolonhesa.",
        "image": "2.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 30.0
            }
        ]
    },
    {
        "category": "massas",
        "name": "Nhoque com Queijo",
        "description": "Marmitex somente de nhoque com queijo ao molho vermelho.",
        "image": "2.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 28.0
            }
        ]
    },
    {
        "category": "massas",
        "name": "Macarrão Recheado",
        "description": ".jpg",
        "image": "5.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 28.0
            }
        ]
    },
    {
        "category": "massas",
        "name": "Nhoque com Queijo e Bacon - Copia",
        "description": "Marmitex de nhoque com queijo e bacon ao molho vermelho.",
        "image": "3.jpg",
        "sizes": [
            {
                "type": "Único",
                "price": 30.0
            }
        ]
    },
    {
        "category": "massas",
        "name": "Macarrão ao Molho Branco com Bacon",
        "description": "Marmitex de macarrão ao molho branco com toque de catupiry com queijo e bacon.",
        "image": "1.jpg",
        "sizes": [
            {
                "type": "Mini",
                "price": 23.0
            },
            {
                "type": "Médio",
                "price": 25.0
            }
        ]
    }
]

for (const dados of produtos) {
    const doc = new MenuModel(dados)
    await doc.save()
    console.log(`Produto salvo: ${doc.name}`)
}

await mongoose.disconnect()
