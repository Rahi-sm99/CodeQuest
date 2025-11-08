"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PokeballTransition } from "./pokeball-transition"

interface PageTransitionWrapperProps {
  children: React.ReactNode
  transitionKey: string
}

export function PageTransitionWrapper({ children, transitionKey }: PageTransitionWrapperProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [prevKey, setPrevKey] = useState(transitionKey)

  useEffect(() => {
    if (transitionKey !== prevKey) {
      setIsTransitioning(true)
      // Wait for transition to show new content
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setPrevKey(transitionKey)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [transitionKey, prevKey, children])

  return (
    <>
      <PokeballTransition isActive={isTransitioning} onComplete={() => setIsTransitioning(false)} />
      <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {displayChildren}
      </div>
    </>
  )
}
