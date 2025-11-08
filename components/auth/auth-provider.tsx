"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  picture?: string
  xp: number
  completedLevels: number[]
  selectedLanguage: string
  badges: string[]
  certifications: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isFirstLogin: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithSocial: (provider: "google" | "github") => Promise<void>
  logout: () => void
  updateUserProgress: (xp: number, completedLevels: number[]) => void
  updateLanguage: (language: string) => void
  updateProfile: (name: string, language: string) => void
  completeOnboarding: () => void
  awardCertificate: (certId: string) => void
  awardBadge: (badgeId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth0 configuration - prefer environment variables to avoid committing secrets.
// Set NEXT_PUBLIC_AUTH0_DOMAIN and NEXT_PUBLIC_AUTH0_CLIENT_ID in your local
// `.env.local` (do NOT commit secrets). These are exposed to the client and
// therefore use the NEXT_PUBLIC_ prefix.
// Intentionally do NOT fallback to an embedded tenant in production builds.
// If these are missing, we'll stop and show a clear error to the developer.
const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLogin, setIsFirstLogin] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("codequest_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const existingUsers = JSON.parse(localStorage.getItem("codequest_users") || "{}")

    if (existingUsers[email]) {
      if (existingUsers[email].password === password) {
        const userData = existingUsers[email]
        setUser(userData)
        localStorage.setItem("codequest_user", JSON.stringify(userData))
      } else {
        throw new Error("Invalid password")
      }
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split("@")[0],
        xp: 0,
        completedLevels: [],
        selectedLanguage: "python",
        badges: [],
        certifications: [],
      }

      existingUsers[email] = { ...newUser, password }
      localStorage.setItem("codequest_users", JSON.stringify(existingUsers))
      localStorage.setItem("codequest_user", JSON.stringify(newUser))
      setUser(newUser)
      setIsFirstLogin(true)
    }
  }

  const loginWithSocial = async (provider: "google" | "github") => {
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2


    // Open server-side login route which will redirect to Auth0 and perform the code exchange.
    // We intentionally do not block on client-side env checks here so the popup shows any server-side
    // diagnostic page (useful when NEXT_PUBLIC_* vars are not configured).
    const popup = window.open(
      `/api/auth/login?provider=${provider}`,
      `Auth0 Login - ${provider}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
    )

    if (!popup) {
      alert("Please allow popups for this site to use social login")
      return
    }

    const messageHandler = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === "auth0-callback") {
        const { accessToken, user: authUser } = event.data

        try {
          const email = authUser?.email
          const name = authUser?.name || authUser?.nickname || (email && email.split("@")[0])
          const picture = authUser?.picture

          const existingUsers = JSON.parse(localStorage.getItem("codequest_users") || "{}")

          if (email && existingUsers[email]) {
            const userData = { ...existingUsers[email], picture }
            setUser(userData)
            localStorage.setItem("codequest_user", JSON.stringify(userData))
          } else if (email) {
            const newUser: User = {
              id: authUser.sub || Date.now().toString(),
              email,
              name,
              picture,
              xp: 0,
              completedLevels: [],
              selectedLanguage: "python",
              badges: [],
              certifications: [],
            }

            existingUsers[email] = newUser
            localStorage.setItem("codequest_users", JSON.stringify(existingUsers))
            localStorage.setItem("codequest_user", JSON.stringify(newUser))
            setUser(newUser)
            setIsFirstLogin(true)
          } else {
            console.warn("Auth callback received no email/profile")
          }
        } catch (error) {
          console.error("Auth0 error:", error)
          alert("Authentication failed. Please try again.")
        }

        window.removeEventListener("message", messageHandler)
      }
    }

    window.addEventListener("message", messageHandler)

    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup)
        window.removeEventListener("message", messageHandler)
      }
    }, 500)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("codequest_user")
  }

  const updateUserProgress = (xp: number, completedLevels: number[]) => {
    if (user) {
      const updatedUser = { ...user, xp, completedLevels }
      setUser(updatedUser)
      localStorage.setItem("codequest_user", JSON.stringify(updatedUser))

      const existingUsers = JSON.parse(localStorage.getItem("codequest_users") || "{}")
      if (existingUsers[user.email]) {
        existingUsers[user.email] = { ...existingUsers[user.email], xp, completedLevels }
        localStorage.setItem("codequest_users", JSON.stringify(existingUsers))
      }
    }
  }

  const updateLanguage = (language: string) => {
    if (user) {
      const updatedUser = { ...user, selectedLanguage: language }
      setUser(updatedUser)
      localStorage.setItem("codequest_user", JSON.stringify(updatedUser))

      const existingUsers = JSON.parse(localStorage.getItem("codequest_users") || "{}")
      if (existingUsers[user.email]) {
        existingUsers[user.email] = { ...existingUsers[user.email], selectedLanguage: language }
        localStorage.setItem("codequest_users", JSON.stringify(existingUsers))
      }
    }
  }

  const updateProfile = (name: string, language: string) => {
    if (user) {
      const updatedUser = { ...user, name, selectedLanguage: language }
      setUser(updatedUser)
      localStorage.setItem("codequest_user", JSON.stringify(updatedUser))

      const existingUsers = JSON.parse(localStorage.getItem("codequest_users") || "{}")
      if (existingUsers[user.email]) {
        existingUsers[user.email] = { ...existingUsers[user.email], name, selectedLanguage: language }
        localStorage.setItem("codequest_users", JSON.stringify(existingUsers))
      }
    }
  }

  const completeOnboarding = () => {
    setIsFirstLogin(false)
  }

  const awardBadge = (badgeId: string) => {
    if (user && !user.badges?.includes(badgeId)) {
      const updatedUser = { ...user, badges: [...(user.badges || []), badgeId] }
      setUser(updatedUser)
      localStorage.setItem("codequest_user", JSON.stringify(updatedUser))
    }
  }

  const awardCertificate = (certId: string) => {
    if (user && !user.certifications?.includes(certId)) {
      const updatedUser = { ...user, certifications: [...(user.certifications || []), certId] }
      setUser(updatedUser)
      localStorage.setItem("codequest_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isFirstLogin,
        login,
        loginWithSocial,
        logout,
        updateUserProgress,
        updateLanguage,
        updateProfile,
        completeOnboarding,
        awardBadge,
        awardCertificate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
