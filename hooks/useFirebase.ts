
import { useState } from "react";
import { db } from "../firebase/firebase";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteField
}
    from "firebase/firestore";

export function UseFirebaseCart(userId: string) {

    const [cart, setCart] = useState([])

    // const 

    // Adicionar itens do carrinho ao firebase


}