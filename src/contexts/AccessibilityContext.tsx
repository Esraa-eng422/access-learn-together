
import React, { createContext, useContext, useState, useEffect } from "react";

type FontSize = "normal" | "large" | "x-large";
type ColorMode = "default" | "dark" | "high-contrast";

interface AccessibilityContextType {
  fontSize: FontSize;
  colorMode: ColorMode;
  motionReduced: boolean;
  textToSpeech: boolean;
  keyboardNavigation: boolean;
  setFontSize: (size: FontSize) => void;
  setColorMode: (mode: ColorMode) => void;
  setMotionReduced: (reduced: boolean) => void;
  setTextToSpeech: (enabled: boolean) => void;
  setKeyboardNavigation: (enabled: boolean) => void;
  speak: (text: string) => void;
}

const defaultValues: AccessibilityContextType = {
  fontSize: "normal",
  colorMode: "default",
  motionReduced: false,
  textToSpeech: false,
  keyboardNavigation: false,
  setFontSize: () => {},
  setColorMode: () => {},
  setMotionReduced: () => {},
  setTextToSpeech: () => {},
  setKeyboardNavigation: () => {},
  speak: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultValues);

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  // Load settings from localStorage or use defaults
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem("a11y-font-size");
    return (saved as FontSize) || "normal";
  });

  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem("a11y-color-mode");
    return (saved as ColorMode) || "default";
  });

  const [motionReduced, setMotionReduced] = useState(() => {
    const saved = localStorage.getItem("a11y-motion-reduced");
    return saved === "true";
  });

  const [textToSpeech, setTextToSpeech] = useState(() => {
    const saved = localStorage.getItem("a11y-text-to-speech");
    return saved === "true";
  });

  const [keyboardNavigation, setKeyboardNavigation] = useState(() => {
    const saved = localStorage.getItem("a11y-keyboard-navigation");
    return saved === "true";
  });

  // Web Speech API for text-to-speech
  const speak = (text: string) => {
    if (textToSpeech && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("a11y-font-size", fontSize);
    localStorage.setItem("a11y-color-mode", colorMode);
    localStorage.setItem("a11y-motion-reduced", String(motionReduced));
    localStorage.setItem("a11y-text-to-speech", String(textToSpeech));
    localStorage.setItem("a11y-keyboard-navigation", String(keyboardNavigation));
  }, [fontSize, colorMode, motionReduced, textToSpeech, keyboardNavigation]);

  // Apply settings to document
  useEffect(() => {
    const html = document.documentElement;

    // Apply font size
    if (fontSize === "large") {
      html.style.setProperty("--font-size", "1.2rem");
      html.style.setProperty("--line-height", "1.7");
    } else if (fontSize === "x-large") {
      html.style.setProperty("--font-size", "1.4rem");
      html.style.setProperty("--line-height", "1.8");
    } else {
      html.style.setProperty("--font-size", "1rem");
      html.style.setProperty("--line-height", "1.5");
    }

    // Apply color mode
    html.classList.remove("dark", "high-contrast");
    if (colorMode === "dark") {
      html.classList.add("dark");
    } else if (colorMode === "high-contrast") {
      html.classList.add("high-contrast");
    }

    // Apply motion reduction
    if (motionReduced) {
      html.classList.add("motion-reduce");
    } else {
      html.classList.remove("motion-reduce");
    }

    // Apply keyboard navigation
    if (keyboardNavigation) {
      html.classList.add("keyboard-nav");
    } else {
      html.classList.remove("keyboard-nav");
    }
  }, [fontSize, colorMode, motionReduced, keyboardNavigation]);

  const value = {
    fontSize,
    colorMode,
    motionReduced,
    textToSpeech,
    keyboardNavigation,
    setFontSize,
    setColorMode,
    setMotionReduced,
    setTextToSpeech,
    setKeyboardNavigation,
    speak,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
