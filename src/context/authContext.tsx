import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../../config/firebase"

interface Store {
  currentUser: User
}
export const AuthContext = createContext<Store>({} as Store)

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user as User)
    })
    return unsub;
  }, [currentUser.uid])

  return <AuthContext.Provider value={{ currentUser }}>
    {children}
  </AuthContext.Provider>

}
