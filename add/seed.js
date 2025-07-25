// seed.js
import mongoose from 'mongoose'
import MenuModel from './Product.js'


const url = process.env.DB_CONNECTION

await mongoose.connect('mongodb://127.0.0.1:27017/next')


const produtos = [
    {
        "category": "marmitex",
        "name": "strogonoff de frango",
        "description": "strogonoff de frango acompanhado de arroz branco, batata palha e batata frita.",
        "image": "Strogonoff.jpg",
        "sizes": [{ "type": "único", "price": 22.5 }]
    },
    {
        "category": "marmitex",
        "name": "bife à milanesa",
        "description": "acompanhado de arroz, feijão, macarrão, batata frita e salada.",
        "image": "bife a milanesa mini.jpg",
        "sizes": [
            { "type": "mini", "price": 23.0 },
            { "type": "médio", "price": 24.44 }
        ]
    },
    {
        "category": "marmitex",
        "name": "filé de frango empanado",
        "description": "acompanhado de arroz, feijão, macarrão, batata frita e salada.",
        "image": "frango empanado mini.jpg",
        "sizes": [
            { "type": "mini", "price": 21.0 },
            { "type": "médio", "price": 25.85 }
        ]
    },
    {
        "category": "marmitex",
        "name": "filé de peixe Panga empanado",
        "description": "filé de peixe panga empanado sem espinho, acompanhado de arroz, feijão, macarrão, batata frita e salada do dia. serve 1 pessoa.",
        "image": "file peixe pangas.jpg",
        "sizes": [
            {
                "type": "mini",
                "price": 23
            },
            {
                "type": "médio",
                "price": 24.7
            }
        ]
    },
    {
        "category": "do dia",
        "name": "filé de frango empanado três queijos",
        "description": "filé de frango empanado com mistura de queijos, arroz, feijão (opcional) e batata frita.",
        "image": "file de frango queijo empandado mini.jpeg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.0 }
        ]
    },
    {
        "category": "do dia",
        "name": "parmegiana de frango com queijo cheddar",
        "description": "frango grelhado com queijo cheddar, arroz branco e batata frita crocante.",
        "image": "parmegiana de frango com queijo.jpg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.0 }
        ]
    },
    {
        "category": "do dia",
        "name": "parmegiana de frango",
        "description": "parmegiana caseira com arroz, feijão opcional e batata frita. serve 1 pessoa.",
        "image": "parmegiana de frango media.jpeg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.65 }
        ]
    },
    {
        "category": "do dia",
        "name": "pizzaiolo",
        "description": "filé de frango empanado, queijo ralado, tomate, presunto e temperos, acompanhado de batata frita e arroz (feijão opcional).",
        "image": "pizzaiolo mini.jpg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.0 }
        ]
    },
    {
        "category": "da casa",
        "name": "calçadão de carne com alho frito",
        "description": "bife à milanesa, ovo frito, presunto, queijo, alho frito por cima, arroz, feijão e batata frita.",
        "image": "calçadão medio.jpg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 30.0 }
        ]
    },
    {
        "category": "da casa",
        "name": "parmegiana de carne",
        "description": "parmegiana caseira com arroz e batata frita.",
        "image": "parmegiana de carne + coca.avif",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 29.76 }
        ]
    },
    {
        "category": "da casa",
        "name": "parmegiana de peixe",
        "description": "parmegiana de peixe sem espinho com arroz e batata frita, com molho caseiro.",
        "image": "parmediana peixe medio.jpeg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 28.0 }
        ]
    },
    {
        "category": "da casa",
        "name": "parmegiana de contra filé bovino",
        "description": "parmegiana de contra filé acompanhado de arroz e batata frita.",
        "image": "parmediana contra file media.jpg",
        "sizes": [{ "type": "médio", "price": 38.0 }]
    },
    {
        "category": "da casa",
        "name": "bife paraíso",
        "description": "bife à milanesa com anéis de cebola fritos, molho catupiry e queijo ralado, acompanhado de arroz, feijão e batata frita.",
        "image": "parmediana contra file media.jpg",
        "sizes": [
            { "type": "mini", "price": 27.0 },
            { "type": "médio", "price": 32.0 }
        ]
    },
    {
        "category": "da casa",
        "name": "filé de frango empanado ao molho",
        "description": "frango empanado com molho de catupiry, calabresa acebolada, arroz, feijão (opcional) e batata frita.",
        "image": "file-frango-acebolado.jpg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.0 }
        ]
    },
    {
        "category": "da casa",
        "name": "calçadão de frango",
        "description": "frango empanado, ovo frito, presunto e queijo, arroz, feijão opcional e batata frita.",
        "image": "calçadão frango.jpeg",
        "sizes": [
            { "type": "mini", "price": 25.0 },
            { "type": "médio", "price": 27.0 }
        ]
    },
    {
        "category": "massas",
        "name": "nhoque ao molho branco com bacon e queijo",
        "description": "nhoque ao molho branco com bacon e queijo cremoso. serve 2 pessoas.",
        "image": "nhoque queijo.jpeg",
        "sizes": [{ "type": "único", "price": 34.0 }]
    },
    {
        "category": "massas",
        "name": "nhoque ao molho vermelho",
        "description": "nhoque ao molho vermelho com calabresa e bacon. serve 2 pessoas.",
        "image": "nhoque calabresa.jpg",
        "sizes": [{ "type": "único", "price": 35.0 }]
    },
    {
        "category": "massas",
        "name": "nhoque à bolonhesa",
        "description": "marmitex somente de nhoque à bolonhesa. com 500g serve até 2 pessoas.",
        "image": "nhoque.jpg",
        "sizes": [{ "type": "único", "price": 32.0 }]
    },
    {
        "category": "combos",
        "name": "combo de nhoque à bolonhesa",
        "description": "nhoque ao molho vermelho com carne deliciosa, toque de queijo ralado. acompanha porção de arroz.",
        "image": "combo nhoque.jpg",
        "sizes": [{ "type": "único", "price": 45.0 }]
    },
    {
        "category": "combos",
        "name": "combo de parmegiana de frango",
        "description": "combo de parmegiana de frango completa: frango suculento, arroz soltinho e batata frita crocante. serve 2 pessoas.",
        "image": "combo parmegiana frango 2 pessoas.jpg",
        "sizes": [
            { "type": "mini", "price": 60.8 },
            { "type": "médio", "price": 99.9 }
        ]
    },
    {
        "category": "combos",
        "name": "combo de parmegiana de contra filé",
        "description": "combo de parmegiana de contra filé bovino, acompanhado de arroz, feijão, batata frita e batata rústica frita.",
        "image": "combo parmegiana carne.jfif",
        "sizes": [{ "type": "único", "price": 80.75 }]
    },
    {
        "category": "combos",
        "name": "combo frango empanado ao molho de catupiry",
        "description": "delicioso frango empanado ao molho de catupiry com bacon e queijo, com arroz e batata frita separados.",
        "image": "combo parmegiana frango 2 pessoas.jpg",
        "sizes": [{ "type": "único", "price": 60.8 }]
    },
    {
        "category": "combos",
        "name": "combo de parmegiana de carne",
        "description": "deliciosa parmegiana de carne que serve 2 pessoas, com arroz e batata frita.",
        "image": "combo parmegiana carne.jfif",
        "sizes": [{ "type": "único", "price": 69.35 }]
    },
    {
        "category": "porções",
        "name": "porção de batata frita com cheddar",
        "description": "porção de batata frita com cheddar original, bacon e queijo ralado. ",
        "image": "batata.jpg",
        "sizes": [
            { "type": "mini", "price": 18.0 },
            { "type": "médio", "price": 30.0 }
        ]
    },
    {
        "category": "porções",
        "name": "mandioca frita",
        "description": "150g de mandioca frita.",
        "image": "mandioca.jpeg",
        "sizes": [{ "type": "único", "price": 14.0 }]
    },
    {
        "category": "porções",
        "name": "porção de tiras de frango",
        "description": "porção de tiras de frango serve 2 pessoas com molho da casa.",
        "image": "tiras.jpeg",
        "sizes": [{ "type": "médio", "price": 30.0 }]
    },
    {
        "category": "porções",
        "name": "porção de batata frita com bacon",
        "description": "porção de batata frita com queijo e bacon. serve 3 pessoas.",
        "image": "fritas com bacon.jpeg",
        "sizes": [{ "type": "único", "price": 35.0 }]
    }
]



for (const dados of produtos) {
    const doc = new MenuModel(dados)
    await doc.save()
    console.log(`Produto salvo: ${doc.name}`)
}

await mongoose.disconnect()
