"use client";

import { useTheme } from "./ThemeProvider";
import Tooltip from "./Tooltip";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-brand-cyan/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <Tooltip text="Cyberpunk Theme" position="top" align="right">
        <button
          onClick={() => setTheme("cyberpunk")}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
            theme === "cyberpunk" ? "border-brand-cyan scale-110" : "border-transparent opacity-50 hover:opacity-100"
          }`}
          style={{ background: "linear-gradient(135deg, #00ffe1, #ff0f4d)" }}
          aria-label="Cyberpunk"
        />
      </Tooltip>
      
      <Tooltip text="Forestpunk" position="top" align="right">
        <button
          onClick={() => setTheme("forestpunk")}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
            theme === "forestpunk" ? "border-brand-cyan scale-110" : "border-transparent opacity-50 hover:opacity-100"
          }`}
          style={{ background: "linear-gradient(135deg, #00ff88, #ff9900)" }}
          aria-label="Forestpunk"
        />
      </Tooltip>
      
      <Tooltip text="Corporate" position="top" align="right">
        <button
          onClick={() => setTheme("corporate")}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
            theme === "corporate" ? "border-brand-cyan scale-110" : "border-transparent opacity-50 hover:opacity-100"
          }`}
          style={{ background: "linear-gradient(135deg, #3C6288, #D47C43)" }}
          aria-label="Corporate"
        />
      </Tooltip>
    </div>
  );
}
