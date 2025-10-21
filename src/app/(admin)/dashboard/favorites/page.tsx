import { ContentContainer } from "@/components/globalComponents/Container/container";

export default function Page() {
  return (
    <ContentContainer>
      <div className="p-4 md:p-6 min-h-screen">
        {/* Seção 1: Itens mais Apreciados pelos Clientes */}
        <section className="mb-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
            Itens mais Apreciados pelos Clientes
          </h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-6">
            Top 3 Favoritos
          </h2>

          {/* Cards dos Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1: Feijoada Completa */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              {/* Imagem */}
              <div className="h-48 bg-gray-200">
                <img
                  src="https://via.placeholder.com/300x200?text=Feijoada"
                  alt="Feijoada Completa"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Feijoada Completa
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  {/* Avaliação */}
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold mr-3">4.8</span>
                  {/* Favoritos */}
                  <span className="text-red-500 mr-1">❤️</span>
                  <span>125</span>
                </div>
              </div>
            </div>

            {/* Card 2: Strogonoff de Frango */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              {/* Imagem */}
              <div className="h-48 bg-gray-200">
                <img
                  src="https://via.placeholder.com/300x200?text=Strogonoff"
                  alt="Strogonoff de Frango"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Strogonoff de Frango
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  {/* Avaliação */}
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold mr-3">4.7</span>
                  {/* Favoritos */}
                  <span className="text-red-500 mr-1">❤️</span>
                  <span>98</span>
                </div>
              </div>
            </div>

            {/* Card 3: Parmegiana de Carne */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              {/* Imagem */}
              <div className="h-48 bg-gray-200">
                <img
                  src="https://via.placeholder.com/300x200?text=Parmegiana"
                  alt="Parmegiana de Carne"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Parmegiana de Carne
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  {/* Avaliação */}
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="font-semibold mr-3">4.6</span>
                  {/* Favoritos */}
                  <span className="text-red-500 mr-1">❤️</span>
                  <span>82</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Cardápio Completo (Tabela) */}
        <section className="bg-white p-6 rounded-lg shadow-xl">
          {/* Cabeçalho da Tabela com Filtro */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 sm:mb-0">
              Cardápio Completo
            </h2>

            {/* Filtro de Classificação */}
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:ring-red-500 focus:border-red-500">
                <option>Mais avaliados</option>
                <option>Mais pedidos</option>
                <option>Menor preço</option>
              </select>
              {/* Ícone de Seta para baixo para simular o design do select */}
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Tabela Responsiva */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Cabeçalho da Tabela */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Nota de Avaliação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12 ">
                    Favoritos
                  </th>
                </tr>
              </thead>

              {/* Corpo da Tabela */}
              <tbody className="bg-white divide-y divide-gray-100">
                {/* Item 1 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Feijoada Completa
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    Feijão preto, carnes suínas, arroz, couve e farofa.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center flex items-center justify-center">
                    <span className="text-yellow-500 mr-1">⭐</span>4.8
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    125
                  </td>
                </tr>

                {/* Item 2 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Strogonoff de Frango
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    Cubos de frango ao creme de leite, com arroz e batata palha.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center flex items-center justify-center">
                    <span className="text-yellow-500 mr-1">⭐</span>4.7
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    98
                  </td>
                </tr>

                {/* Item 3 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Parmegiana de Carne
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    Bife à milanesa, molho de tomate, queijo, arroz e fritas.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center flex items-center justify-center">
                    <span className="text-yellow-500 mr-1">⭐</span>4.6
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    82
                  </td>
                </tr>

                {/* Item 4 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Lasanha à Bolonhesa
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    Massa, molho bolonhesa, presunto, queijo e molho branco.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center flex items-center justify-center">
                    <span className="text-yellow-500 mr-1">⭐</span>4.5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    75
                  </td>
                </tr>

                {/* Item 5 */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    Salmão Grelhado
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                    Salmão grelhado com legumes no vapor e arroz.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center flex items-center justify-center">
                    <span className="text-yellow-500 mr-1">⭐</span>4.4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                    61
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
