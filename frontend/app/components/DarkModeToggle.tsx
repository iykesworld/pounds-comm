"use client";
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const newDark = !prev;
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
      }
      return newDark;
    });
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleDark}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 dark:bg-gray-900 text-white dark:text-blue-400 p-3 rounded-full shadow-lg hover:scale-110 transition"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.375-9.165a.75.75 0 01.976.937A7.501 7.501 0 0019.5 15.75a.75.75 0 01.937.976z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.06-1.06M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" />
        </svg>
      )}
    </button>
  );
} 