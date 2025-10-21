import { ContentContainer } from "@/components/globalComponents/Container/container";

export default function Page() {
  return (
    <ContentContainer>
      <div className="p-4 min-h-screen flex justify-center items-start">
        {/* Container Principal do Formulário */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full mt-6 mb-6">
          {/* Título da Página/Modal */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
            Editar Promoções
          </h1>

          {/* Layout de Duas Colunas (Informações e Imagem) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna 1: Informações da Promoção */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Informações da Promoção
              </h2>

              <div className="space-y-6">
                {/* Título da Promoção */}
                <div>
                  <label
                    htmlFor="tituloPromocao"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Título da Promoção
                  </label>
                  <input
                    type="text"
                    id="tituloPromocao"
                    defaultValue="Combo Família Feliz"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    rows={4}
                    defaultValue="Aproveite nosso combo especial com 2 pratos principais, 2 acompanhamentos e 2 bebidas."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  ></textarea>
                </div>

                {/* Preço e Desconto (em Linha) */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Preço (R$) */}
                  <div>
                    <label
                      htmlFor="preco"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preço (R$)
                    </label>
                    <input
                      type="text"
                      id="preco"
                      defaultValue="89,90"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Desconto (%) */}
                  <div>
                    <label
                      htmlFor="desconto"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Desconto (%)
                    </label>
                    <input
                      type="text"
                      id="desconto"
                      defaultValue="10"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2: Imagem de Capa e Upload */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Imagem de Capa
              </h2>

              {/* Área de Visualização e Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center h-full min-h-[350px]">
                {/* Imagem de Exemplo (ou preview de upload) */}
                <div className="mb-4 w-48 h-48 bg-white rounded-lg shadow-inner overflow-hidden">
                  <img
                    src="https://via.placeholder.com/200x200?text=Placeholder"
                    alt="Capa da Promoção"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ícone de Nuvem (Placeholder) */}
                <span className="text-4xl text-gray-400 mb-3">☁️</span>

                {/* Texto de Upload */}
                <p className="text-sm text-center text-gray-500">
                  <span className="font-semibold text-red-500 cursor-pointer hover:text-red-600">
                    Carregue um arquivo
                  </span>{" "}
                  ou arraste e solte
                </p>
                <p className="text-xs text-center text-gray-400 mt-1">
                  PNG, JPG, GIF até 10MB
                </p>

                {/* Input de Arquivo (oculto) */}
                <input
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg, image/gif"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-150">
              Cancelar
            </button>
            <button className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-150">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
