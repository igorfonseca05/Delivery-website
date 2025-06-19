import { ReactNode } from "react";


export default function Overlay({ isOpen, children }: { isOpen: boolean, children: ReactNode }) {
    return (
        <div className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center transition-opacity ease-in-out duration-400 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
            {children}
        </div>
    );
};