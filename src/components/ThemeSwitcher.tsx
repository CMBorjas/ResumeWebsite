"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-brand-cyan/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <button
        onClick={() => setTheme("cyberpunk")}
        className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
          theme === "cyberpunk" ? "border-brand-cyan scale-110" : "border-transparent opacity-50 hover:opacity-100"
        }`}
        style={{ background: "linear-gradient(135deg, #00ffe1, #ff0f4d)" }}
        title="Cyberpunk"
      />
      <div className="relative group">
        <button
          disabled
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 border-transparent opacity-30 cursor-not-allowed`}
          style={{ background: "linear-gradient(135deg, #00ff88, #ff9900)" }}
        />
        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-2 py-1 text-[10px] font-bold text-slate-300 bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Forestpunk (Under Construction)
        </span>
      </div>
      <div className="relative group">
        <button
          disabled
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 border-transparent opacity-30 cursor-not-allowed`}
          style={{ background: "linear-gradient(135deg, #ffffff, #0066cc)" }}
        />
        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 w-max px-2 py-1 text-[10px] font-bold text-slate-300 bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Corporate (Under Construction)
        </span>
      </div>
    </div>
  );
}
