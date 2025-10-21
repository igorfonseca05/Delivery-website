"use client";

import { useEffect, useState } from "react";

// Context
import { AuthContextProvider } from "../../../context/useAuthContext";

// Firebase type
import { User } from "firebase/auth";

// Hook
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components
import { CustomLoadingPage } from "@/app/fallbackContainer";

// import { useRouter } from 'next/compat/router'
import { useRouter } from "next/navigation";

import { useAdminContext } from "../../../context/isAdminContext";

export function AuthGlobalContext({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {isAdmin ,setIsAdmin } = useAdminContext();

  // Variavel que recebe dados do usuário do firebase(tipagem recomendada)
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const loadingUser = user === undefined; // true or false

  // Ouvindo estado de autenticação usuário
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid === "SMKOEBvBVVdbdjw1hWcih4kbMEm2") {
        setIsAdmin(true);
        setUser(user);
        router?.push("/dashboard");
      } else {
        setUser(user);
        setIsAdmin(false);
        router?.push("/");
      }
    });
  }, [auth]);


  if (loadingUser) {
    return <CustomLoadingPage />;
  }

  return <AuthContextProvider value={{ user }}>{children}</AuthContextProvider>;
}
