import { ContentContainer } from "@/components/globalComponents/Container/container";
import { AdmName } from "./components/AdmName";

export default function Page() {
  return (
    <ContentContainer>
      <div className="p-4 md:pt-6 min-h-screen">
        {/* Título Principal */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-base text-gray-700">
            Olá, <span className="font-bold text-red-600">Admin!</span>{" "}
            Bem-vindo de volta.
          </p>
        </header>

        {/* Estatísticas e Configurações (Layout Principal Responsivo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna Principal (Estatísticas e Tabela de Pratos) - 9/12 colunas no desktop */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. Cards de Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Total de Pedidos */}
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Tabs (Abas) */}
              <div className="flex border-b border-gray-200 mb-6">
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:border-b-2 hover:border-red-600 transition duration-150">
                  Pedidos
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-red-600 border-b-2 border-red-600">
                  Pratos cadastrados
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Lista de Pratos
              </h2>

              {/* Barra de Ferramentas (Busca e Adicionar) */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                {/* Busca */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Buscar por nome..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                  {/* Ícone de Busca (Placeholder) */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                    🔍
                  </div>
                </div>

                {/* Filtro de Categoria */}
                <select className="w-full sm:w-auto border border-gray-300 rounded-lg pr-8 focus:ring-red-500 focus:border-red-500">
                  <option>Todas as Categorias</option>
                  <option>Massas</option>
                  <option>Carnes</option>
                </select>

                {/* Botão Adicionar */}
                <button className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-150">
                  {/* Ícone de Adicionar (Placeholder) */}
                  <span className="h-5 w-5 mr-2">+</span>
                  Adicionar Prato
                </button>
              </div>

              {/* Tabela Responsiva de Pratos */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  {/* Cabeçalho da Tabela */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Prato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  {/* Corpo da Tabela */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Item 1 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Feijoada"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Feijoada Completa
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                        Acompanha arroz, couve e farofa.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ 25,00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-900 mr-4"
                        >
                          Editar
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Remover
                        </a>
                      </td>
                    </tr>
                    {/* Item 2 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Frango à Parmegiana"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Frango a Parmegiana
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                        Arroz, fritas e salada.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ 22,00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-900 mr-4"
                        >
                          Editar
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Remover
                        </a>
                      </td>
                    </tr>
                    {/* Item 3 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Strogonoff de Carne"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          Strogonoff de Carne
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                        Arroz e batata palha.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ 23,50
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-900 mr-4"
                        >
                          Editar
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Remover
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Coluna Lateral (Cards de Configuração) - 3/12 colunas no desktop */}
          <div className="lg:col-span-3 space-y-6">
            {/* 3. Card Status do Estabelecimento (Aberto/Fechado) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Status do Estabelecimento
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Fechado</span>

                {/* Toggle Switch (Simulação pura) */}
                <label
                  htmlFor="toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    {/* Note que o input é essencial para o estado, mesmo que `sr-only` (screen-reader only) */}
                    <input
                      type="checkbox"
                      id="toggle"
                      className="sr-only"
                      defaultChecked
                    />
                    {/* Linha/Trilha do switch (Cor "ligada" padrão) */}
                    <div className="block bg-red-600 w-10 h-5 rounded-full"></div>
                    {/* Círculo/Botão do switch (Posição "ligada" padrão) */}
                    <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition transform translate-x-5"></div>
                  </div>
                </label>
                <span className="text-sm font-semibold text-green-600 ml-2">
                  Aberto
                </span>
              </div>
            </div>

            {/* 4. Card Horário de Funcionamento */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-start text-gray-900">
                  Horário de Funcionamento
                </h3>
                {/* Ícone de Editar (Placeholder) */}
                <span className="w-5 h-5 text-gray-500 hover:text-red-600 cursor-pointer">
                  ✏️
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="font-medium text-gray-900">
                    11:00 - 22:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-medium text-gray-900">
                    11:00 - 23:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-medium text-red-600">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
