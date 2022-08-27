import React, {useContext, useEffect, useState} from "react";
import {auth} from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [IDToken, setIDToken] = useState()
    
  function googleOAuthLogin(response) {
    if (response) {
      return signInWithCustomToken(auth, response)
    }
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    // setIDToken("")
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user){
        // console.log("User = " + JSON.stringify(user))
        setCurrentUser(user)
        setIDToken(user.stsTokenManager.accessToken)
      }
      setLoading(false)
    })
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    googleOAuthLogin,
    setIDToken,
    IDToken
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}