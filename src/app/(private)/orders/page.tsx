import { ContentContainer } from "@/components/globalComponents/Container/container";
import OrderStatusCard from "./order.";

export default function Orders() {

    const user = {
        nome: 'Gabriel Mendes',
        email: 'gabriel@email.com',
        telefone: '(11) 99999-9999',
        endereco: {
            cidade: 'São Paulo',
            complemento: 'Apto 101',
            bairro: 'Centro',
            numero: '123',
            CEP: '01000-000',
            rua: 'Rua das Flores',
        },
    };

    const item = {
        id: '1',
        name: 'Marmitex Executivo',
        price: 29.9,
        imageUrl: '/marmitex.png', // imagem na pasta public
        sizeDishName: 'Grande',
        quantity: 2,
        orderNote: 'Sem cebola, por favor.',
    };
    return (
        <ContentContainer>
            <h1>Seus Pedidos</h1>
            <OrderStatusCard user={user} item={item} status="A Caminho" />
            <OrderStatusCard user={user} item={item} status="A Caminho" />
        </ContentContainer>
    )
}