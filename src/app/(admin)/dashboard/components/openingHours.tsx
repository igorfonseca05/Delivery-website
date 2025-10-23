"use client";

import { Modal } from "@/components/globalComponents/modal/Modal";
import { useModal } from "../../../../../context/DashModal";
import React, { FormEvent, useEffect, useState } from "react";
import { Settings } from "lucide-react";

export function OpeningHours() {
  const { isOpen, openModal, closeModal } = useModal();
  const [form, setForm] = useState({
    week_open: "",
    week_close: "",
    saturday_open: "",
    saturday_close: "",
    sunday: "",
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }

    return () => root.classList.remove("overflow-hidden");
  }, [isOpen]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { week_open, week_close, saturday_open, saturday_close, sunday } =
      form;

    const time = {
      week: { open: week_open, close: week_close },
      saturday: { open: saturday_open, close: saturday_close },
      sunday: sunday || "Fechado",
    };

    console.log(time);

    closeModal();
  }

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} size={450}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Editar Horário de Funcionamento
            </h2>

            <form onSubmit={(e) => handleForm(e)} className="space-y-4">
              {/* Segunda a Sexta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Segunda a Sexta
                </label>
                <div className="flex gap-2">
                  <input
                    onChange={(e) => handleChange(e)}
                    name="week_open"
                    type="time"
                    value={form.week_open}
                    className="w-1/2 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Abertura"
                  />
                  <input
                    onChange={(e) => handleChange(e)}
                    name="week_close"
                    type="time"
                    value={form.week_close}
                    className="w-1/2 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Fechamento"
                  />
                </div>
              </div>

              {/* Sábado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sábado
                </label>
                <div className="flex gap-2">
                  <input
                    onChange={(e) => handleChange(e)}
                    type="time"
                    value={form.saturday_open}
                    name="saturday_open"
                    className="w-1/2 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Abertura"
                  />
                  <input
                    onChange={(e) => handleChange(e)}
                    type="time"
                    value={form.saturday_close}
                    name="saturday_close"
                    className="w-1/2 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Fechamento"
                  />
                </div>
              </div>

              {/* Domingo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domingo
                </label>
                <select
                  value={form.sunday}
                  onChange={(e) => handleChange(e)}
                  name="sunday"
                  className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fechado">Fechado</option>
                  <option value="aberto">Aberto</option>
                </select>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-start text-gray-900">
            Horário de <br></br> Funcionamento
          </h3>
          {/* Ícone de Editar (Placeholder) */}
          <Settings onClick={() => openModal()} />
        </div>

        {form.week_open ? (
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Segunda a Sexta:</span>
              <span className="font-medium text-gray-900">
                {form.week_open} - {form.week_close}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sábado:</span>
              <span className="font-medium text-gray-900">
                {form.saturday_open} - {form.saturday_close}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Domingo:</span>
              <span className="font-medium text-red-600">{form.sunday}</span>
            </div>
          </div>
        ) : (
          <p>Cadastre seus horários</p>
        )}
      </div>
    </>
  );
}
