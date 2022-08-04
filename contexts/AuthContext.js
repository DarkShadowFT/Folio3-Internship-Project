import React, { useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
    
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
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    googleOAuthLogin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}