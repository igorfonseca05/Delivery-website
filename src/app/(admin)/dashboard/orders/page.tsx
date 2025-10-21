import { ContentContainer } from "@/components/globalComponents/Container/container";

export default function Page() {
  return (
    <ContentContainer>
        <div className="p-4 md:p-6 min-h-screen">
  {/* Header da Página de Pedidos */}
  <header className="flex  flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
    <h1 className="text-3xl font-extrabold text-gray-900">Pedidos</h1>

    {/* Filtros */}
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
      {/* Filtro de Status */}
      <select className="border border-gray-300 bg-white rounded-lg py-2 pl-3 pr-8 text-base focus:ring-red-500 focus:border-red-500 w-full sm:w-auto">
        <option>Todos os status</option>
        <option>Pendente</option>
        <option>Em Andamento</option>
        <option>Concluído</option>
        <option>Cancelado</option>
      </select>

      {/* Seletor de Data */}
      <div className="relative w-full sm:w-auto">
        <input 
          type="date" 
          defaultValue="2023-10-27" 
          className="border bg-white border-gray-300 rounded-lg py-2 pl-3 pr-10 text-base focus:ring-red-500 focus:border-red-500 w-full"
        />
      </div>
    </div>
  </header>

  {/* Cards de Resumo dos Pedidos (Top 3) */}
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    {/* Card 1: Pedido #1024 (Pendente/Destaque) */}
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
      <p className="text-lg font-bold text-gray-900 mb-1">Pedido #1024</p>
      <p className="text-sm text-gray-600 mb-2">Cliente: João Silva</p>
      <p className="text-2xl font-extrabold text-gray-900">R$ 150,00</p>
    </div>

    {/* Card 2: Pedido #1021 */}
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-200">
      <p className="text-lg font-bold text-gray-900 mb-1">Pedido #1021</p>
      <p className="text-sm text-gray-600 mb-2">Cliente: Maria Oliveira</p>
      <p className="text-2xl font-extrabold text-gray-900">R$ 135,50</p>
    </div>

    {/* Card 3: Pedido #1023 */}
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-200">
      <p className="text-lg font-bold text-gray-900 mb-1">Pedido #1023</p>
      <p className="text-sm text-gray-600 mb-2">Cliente: Carlos Pereira</p>
      <p className="text-2xl font-extrabold text-gray-900">R$ 120,75</p>
    </div>
  </section>

  {/* Tabela de Pedidos Detalhada */}
  <section className="bg-white p-6 rounded-lg shadow-md">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Cabeçalho da Tabela */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ID Pedido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Observações</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Ações</th>
          </tr>
        </thead>
        
        {/* Corpo da Tabela */}
        <tbody className="bg-white divide-y divide-gray-100">
          
          {/* Função para renderizar o Status Badge */}
          {/* Note: Em React, você usaria um componente ou função para isso. Aqui, repetimos as classes. */}
          
          {/* Pedido #1024 - Pendente */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#1024</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">João Silva</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ 150,00</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">PENDENTE</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer">Ver</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button className="text-yellow-500 hover:text-yellow-700">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </td>
          </tr>

          {/* Pedido #1023 - Concluído */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#1023</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Carlos Pereira</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ 120,75</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">CONCLUÍDO</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Sem cebola.</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button className="text-yellow-500 hover:text-yellow-700">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </td>
          </tr>

          {/* Pedido #1022 - Cancelado */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#1022</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Ana Costa</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ 95,00</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">CANCELADO</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer">Ver</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button className="text-yellow-500 hover:text-yellow-700">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </td>
          </tr>
          
          {/* Pedido #1021 - Em Andamento */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#1021</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Maria Oliveira</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ 135,50</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">EM ANDAMENTO</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Ponto da carne mal passado.</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button className="text-yellow-500 hover:text-yellow-700">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </td>
          </tr>
          
          {/* Pedido #1020 - Concluído */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#1020</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Pedro Martins</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ 88,20</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">CONCLUÍDO</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">-</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button className="text-yellow-500 hover:text-yellow-700">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </section>
</div>
    </ContentContainer>
  )
}