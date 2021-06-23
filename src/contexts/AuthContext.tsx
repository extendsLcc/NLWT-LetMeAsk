import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";


type User = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>,
}

type AuthContextProviderProps = {
  children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  const setUserStateFromFirebase = (user: firebase.User | undefined | null) => {
    if (user) {

      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });

    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      setUserStateFromFirebase(user);

      return () => {
        unsubscribe();
      };
    })
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    setUserStateFromFirebase(result.user);

  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}