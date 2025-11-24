import React from "react";

interface LogoProps {
  className?: string;
  selected?: boolean;
}

// ChatGPT/OpenAI Logo
export const ChatGPTLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-green-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" : ""}`}
    >
      <path
        d="M21.62 4.26a1.724 1.724 0 0 0-1.447-.988L2.38 2.272a1.724 1.724 0 0 0-1.447.988 1.724 1.724 0 0 0 .276 1.97l3.62 3.62v7.24a1.724 1.724 0 0 0 1.724 1.724h.862l-1.724 3.448a.862.862 0 0 0 1.543.776l2.585-5.17h5.17a1.724 1.724 0 0 0 1.724-1.724V8.87l3.62-3.62a1.724 1.724 0 0 0 .276-1.97z"
        fill="currentColor"
      />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-green-400/40 animate-pulse" />
    )}
  </div>
);

// Cursor Logo
export const CursorLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-blue-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" : ""}`}
    >
      <path
        d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-blue-400/40 animate-pulse" />
    )}
  </div>
);

// Midjourney Logo
export const MidjourneyLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-purple-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" : ""}`}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path
        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
        fill="currentColor"
      />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-purple-400/40 animate-pulse" />
    )}
  </div>
);

// Leonardo AI Logo
export const LeonardoLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-orange-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" : ""}`}
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="currentColor"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-orange-400/40 animate-pulse" />
    )}
  </div>
);

// Sora Logo (OpenAI)
export const SoraLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-indigo-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" : ""}`}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" opacity="0.2" />
      <path
        d="M8 10L12 14L16 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-indigo-400/40 animate-pulse" />
    )}
  </div>
);

// Veo Logo (Google)
export const VeoLogo: React.FC<LogoProps> = ({ className = "", selected = false }) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-all duration-300 ${selected ? "text-teal-400" : "text-muted-foreground"} ${selected ? "drop-shadow-[0_0_8px_rgba(94,234,212,0.6)]" : ""}`}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="currentColor"
      />
    </svg>
    {selected && (
      <div className="absolute inset-0 blur-xl bg-teal-400/40 animate-pulse" />
    )}
  </div>
);

