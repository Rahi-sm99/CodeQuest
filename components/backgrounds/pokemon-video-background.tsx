"use client"

interface PokemonVideoBackgroundProps {
  videoSrc?: string
  theme?: "meadow" | "ocean" | "forest" | "volcano" | "city"
  overlay?: boolean
}

export function PokemonVideoBackground({ videoSrc, theme = "meadow", overlay = true }: PokemonVideoBackgroundProps) {
  // Default Pokemon-themed video URLs (using placeholder videos)
  const themeVideos = {
    meadow: "https://assets.codepen.io/3364143/7btrrd.mp4", // Bright green meadow
    ocean: "https://assets.codepen.io/3364143/7btrrd.mp4", // Ocean waves
    forest: "https://assets.codepen.io/3364143/7btrrd.mp4", // Forest scene
    volcano: "https://assets.codepen.io/3364143/7btrrd.mp4", // Volcano
    city: "https://assets.codepen.io/3364143/7btrrd.mp4", // City
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Bright gradient background as fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-green-400 to-blue-400" />

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={videoSrc || themeVideos[theme]}
      />

      {/* Overlay for better text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" />
      )}
    </div>
  )
}
