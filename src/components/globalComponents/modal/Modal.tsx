"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size: number
};

export const Modal = ({ isOpen, onClose, children, size }: ModalProps) => {
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div style={{width: `${size}px`}} className={`bg-white rounded-lg p-6 relative max-h-150 overflow-y-auto`}>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X/>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};