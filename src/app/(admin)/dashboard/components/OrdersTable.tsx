"use client";

import { Modal } from "@/components/globalComponents/modal/Modal";
import { useModal } from "../../../../../context/DashModal";
import { useEffect, useState } from "react";

import { CirclePlus, Trash, Upload } from "lucide-react";

export function OrdersTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState(1);

  function addInput() {
    if(inputAmount >= 3) return
    setInputAmount(inputAmount + 1);
  }

  

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} size={600}>
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <p className="text-2xl font-bold tracking-tight">
                Cadastrar novo item
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Adição rápida para o cardápio.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Nome do item */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  placeholder="Nome do Item (Ex: Pizza Margherita)"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 h-12 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                />
              </div>

              {/* Categoria */}
              <div className="w-32">
                <select
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Categoria
                  </option>
                  <option value="pizza">Pizza</option>
                  <option value="bebida">Bebida</option>
                  <option value="sobremesa">Sobremesa</option>
                  <option value="entrada">Entrada</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <textarea
                placeholder="Descrição (Ex: Molho de tomate, mussarela e manjericão)"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 min-h-[70px] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 resize-none"
              ></textarea>
            </div>

            {/* Tamanhos e preços */}
            <div className="space-y-2">
              {/* Exemplo de um tamanho */}
              {inputAmount === 3 && <p className="text-xs text-red-600">Você atingiu o número máximo de tamanhos permitidos {inputAmount}.</p>}
              {Array(inputAmount).fill(null).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    name={`size-${i}`}
                    placeholder="Tamanho (Ex: P)"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 h-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
                <div className="w-24">
                  <input
                    name={`price-${i}`}
                    placeholder="29,90"
                    type="number"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 h-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  />
                </div>
                <button
                onClick={() => inputAmount > 1 && setInputAmount(inputAmount - 1)}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  type="button"
                >
                  <Trash size={22} />
                </button>
              </div>
              ))}
            </div>

            <button
              onClick={addInput}
              className="flex items-center justify-start gap-2 rounded-lg py-2 text-sm font-semibold text-orange-300 hover:text-orange-400 transition-colors"
              type="button"
            >
              <CirclePlus />
              Adicionar outro tamanho
            </button>

            {/* Upload de imagem */}
            <div
              onClick={() =>
                document.querySelector<HTMLInputElement>("#fileInput")?.click()
              }
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 text-center cursor-pointer hover:border-orange-300 dark:hover:border-orange-300 transition-colors h-24 flex items-center justify-center mt-6"
            >
              <div className="">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Upload className="text-gray-500 hover:text-orange-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Arraste e solte ou{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "var(--detailsColor)" }}
                    >
                      clique para selecionar arquivo
                    </span>
                  </p>
                  <input id="fileInput" type="file" className="hidden" />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                type="button"
              >
                Cancelar
              </button>
              <button
                className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-800 bg-orange-300 hover:bg-orange-300 transition-colors"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </Modal>

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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300">
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
          <button
            onClick={openModal}
            className="flex items-center justify-center px-4 py-2 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-150"
          >
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
                  <a href="#" className="text-red-600 hover:text-red-900 mr-4">
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
                  <a href="#" className="text-red-600 hover:text-red-900 mr-4">
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
                  <a href="#" className="text-red-600 hover:text-red-900 mr-4">
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
    </>
  );
}
