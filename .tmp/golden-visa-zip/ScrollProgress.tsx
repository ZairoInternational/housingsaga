// components/golden-visa/ScrollProgress.tsx
"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div 
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-150 ease-out shadow-lg shadow-amber-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
