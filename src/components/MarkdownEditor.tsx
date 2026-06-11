"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(
    "# Markdown Notes\n\nWrite your *cyberpunk* notes here...\n\n- [x] Hack the mainframe\n- [ ] Upload virus\n- [>] Migrate servers to Neo-Tokyo\n- [<] Schedule maintenance for subnet 4\n- ○ Team sync at 14:00\n- - Look into new encryption algorithms\n\n```javascript\nconsole.log('System breached.');\n```\n\n> \"The net is vast and infinite.\" - Motoko Kusanagi"
  );
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("markdown_notes");
    if (saved) setMarkdown(saved);
  }, []);

  // Save to localstorage
  useEffect(() => {
    localStorage.setItem("markdown_notes", markdown);
  }, [markdown]);

  const insertText = (prefix: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    
    // Check if we need a newline before inserting
    const needsNewline = start > 0 && markdown[start - 1] !== '\n';
    const textToInsert = (needsNewline ? '\n' : '') + prefix;
    
    const newMarkdown = markdown.substring(0, start) + textToInsert + markdown.substring(end);
    setMarkdown(newMarkdown);
    
    // reset cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
      }
    }, 0);
  };

  return (
    <div className="w-full h-[700px] flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-black/50 border border-brand-cyan/30 rounded-xl overflow-hidden flex flex-col shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_10%,transparent)]">
        <div className="bg-brand-cyan/10 px-4 py-2 border-b border-brand-cyan/30 flex justify-between items-center">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            INPUT.md
          </span>
          <button onClick={() => setMarkdown("")} className="text-[10px] text-red-400 hover:text-red-300 hover:bg-red-400/10 px-2 py-1 rounded transition-colors uppercase tracking-widest font-mono">
            Clear Buffer
          </button>
        </div>
        
        {/* BuJo Toolbar */}
        <div className="bg-black/80 px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar border-b border-brand-cyan/20 shrink-0">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-2 flex items-center">BuJo:</span>
          {[
            { label: "• Task", value: "- [ ] " },
            { label: "✕ Done", value: "- [x] " },
            { label: "❯ Migrated", value: "- [>] " },
            { label: "❮ Scheduled", value: "- [<] " },
            { label: "○ Event", value: "- ○ " },
            { label: "- Note", value: "- - " },
            { label: "★ Priority", value: "**★** " },
            { label: "💡 Idea", value: "**💡** " },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={() => insertText(btn.value)}
              className="text-[10px] font-mono text-slate-300 hover:text-brand-cyan hover:bg-brand-cyan/10 px-2 py-1 rounded transition-colors whitespace-nowrap border border-white/5"
              title={`Insert ${btn.label}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-1 w-full bg-transparent text-slate-300 p-4 outline-none font-mono text-sm resize-none custom-scrollbar"
          spellCheck={false}
          placeholder="Start typing markdown..."
        />
      </div>
      
      <div className="flex-1 bg-[#0a0f18] border border-brand-pink/30 rounded-xl overflow-hidden flex flex-col shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-pink)_10%,transparent)]">
        <div className="bg-brand-pink/10 px-4 py-2 border-b border-brand-pink/30">
          <span className="text-xs font-mono text-brand-pink uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-pink shadow-[0_0_5px_currentColor]"></span>
            OUTPUT.preview
          </span>
        </div>
        <div className="flex-1 w-full p-6 overflow-y-auto custom-scrollbar">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({...props}) => <h1 className="text-3xl font-bold text-white mb-4 border-b border-brand-cyan/30 pb-2 tracking-tight" {...props} />,
              h2: ({...props}) => <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
              h3: ({...props}) => <h3 className="text-xl font-bold text-brand-cyan mt-4 mb-2" {...props} />,
              p: ({...props}) => <p className="text-slate-300 mb-4 leading-relaxed" {...props} />,
              a: ({...props}) => <a className="text-brand-cyan hover:text-brand-pink transition-colors underline" target="_blank" rel="noopener noreferrer" {...props} />,
              ul: ({...props}) => <ul className="list-none text-slate-300 mb-4 space-y-1 ml-1" {...props} />,
              ol: ({...props}) => <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1 ml-2 marker:text-brand-pink" {...props} />,
              li: ({children, ...props}: any) => {
                let content = children;
                let icon = null;
                
                // Bullet Journal Custom Rendering
                if (Array.isArray(children) && typeof children[0] === 'string') {
                  const text = children[0];
                  if (text.startsWith('[>] ')) {
                    icon = <span className="text-brand-pink font-bold mr-2 text-sm inline-flex justify-center items-center w-4">❯</span>;
                    content = [text.slice(4), ...children.slice(1)];
                  } else if (text.startsWith('[<] ')) {
                    icon = <span className="text-brand-cyan font-bold mr-2 text-sm inline-flex justify-center items-center w-4">❮</span>;
                    content = [text.slice(4), ...children.slice(1)];
                  } else if (text.startsWith('○ ')) {
                    icon = <span className="text-yellow-400 font-bold mr-2 text-sm inline-flex justify-center items-center w-4">○</span>;
                    content = [text.slice(2), ...children.slice(1)];
                  } else if (text.startsWith('- ')) {
                    icon = <span className="text-slate-400 font-bold mr-2 text-sm inline-flex justify-center items-center w-4">-</span>;
                    content = [text.slice(2), ...children.slice(1)];
                  }
                } else if (typeof children === 'string') {
                  const text = children as string;
                  if (text.startsWith('[>] ')) {
                    icon = <span className="text-brand-pink font-bold mr-2 text-sm inline-flex justify-center items-center w-4">❯</span>;
                    content = text.slice(4);
                  } else if (text.startsWith('[<] ')) {
                    icon = <span className="text-brand-cyan font-bold mr-2 text-sm inline-flex justify-center items-center w-4">❮</span>;
                    content = text.slice(4);
                  } else if (text.startsWith('○ ')) {
                    icon = <span className="text-yellow-400 font-bold mr-2 text-sm inline-flex justify-center items-center w-4">○</span>;
                    content = text.slice(2);
                  } else if (text.startsWith('- ')) {
                    icon = <span className="text-slate-400 font-bold mr-2 text-sm inline-flex justify-center items-center w-4">-</span>;
                    content = text.slice(2);
                  }
                }
                
                if (icon) {
                  return <li className="text-slate-300 flex items-start"><div className="mt-1">{icon}</div><div>{content}</div></li>;
                }
                
                // Fallback to standard rendering. If it's a standard bullet, add a generic dot
                return <li className="text-slate-300 flex items-start" {...props}><div className="mt-2 mr-2 w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0"></div><div>{children}</div></li>;
              },
              code: ({inline, className, ...props}: any) => {
                const match = /language-(\w+)/.exec(className || '')
                return inline 
                  ? <code className="text-yellow-400 bg-black/80 px-1.5 py-0.5 rounded text-sm font-mono border border-white/10" {...props} />
                  : <pre className="bg-black/80 border border-brand-cyan/20 rounded-lg p-4 mb-4 overflow-x-auto custom-scrollbar shadow-inner"><code className="text-brand-cyan font-mono text-sm" {...props} /></pre>
              },
              blockquote: ({...props}) => <blockquote className="border-l-4 border-brand-pink/50 pl-4 italic text-slate-400 mb-4 bg-brand-pink/5 py-3 pr-4 rounded-r" {...props} />,
              table: ({...props}) => <div className="overflow-x-auto mb-4"><table className="w-full text-left border-collapse border border-brand-cyan/20" {...props} /></div>,
              th: ({...props}) => <th className="border border-brand-cyan/20 bg-brand-cyan/10 px-4 py-2 font-semibold text-white" {...props} />,
              td: ({...props}) => <td className="border border-brand-cyan/20 px-4 py-2 text-slate-300" {...props} />,
              img: ({...props}) => <img className="max-w-full rounded-lg border border-white/10 shadow-lg mb-4" {...props} />
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
