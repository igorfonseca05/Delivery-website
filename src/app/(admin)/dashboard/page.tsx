import { ContentContainer } from "@/components/globalComponents/Container/container";
import { AdmName } from "./components/AdmName";
import { CardCloseOpen } from "./components/CardCloseOpen";
import { OpeningHours } from "./components/openingHours";
import { OrdersTable } from "./components/OrdersTable";

export default function Page() {
  return (
    <ContentContainer>
      <div className="pt-6 min-h-screen">
        {/* Título Principal */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <AdmName/>
        </header>

        {/* Estatísticas e Configurações (Layout Principal Responsivo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Total de Pedidos
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  1,234
                </p>
              </div>

              {/* Card 2: Pedidos do Dia */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Pedidos do Dia
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  56
                </p>
              </div>

              {/* Card 3: Lucro Estimado */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Lucro Estimado
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  R$ 8.750,00
                </p>
              </div>
            </div>

            {/* 2. Painel de Gerenciamento de Pratos/Pedidos (Tabela) */}
            <OrdersTable/>
          </div>

          {/* Coluna Lateral (Cards de Configuração) - 3/12 colunas no desktop */}
          <div className="lg:col-span-3 space-y-6">
            {/* 3. Card Status do Estabelecimento (Aberto/Fechado) */}
            <CardCloseOpen/>

            {/* 4. Card Horário de Funcionamento */}
          <OpeningHours/>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
