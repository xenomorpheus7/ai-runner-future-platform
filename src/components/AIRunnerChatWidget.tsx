import React, { useState } from "react";

interface ChatMessage {
  id: number;
  from: "user" | "ai";
  text: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    from: "ai",
    text: "Meow. I am the AI Runner Black Cat. Ask me anything about your prompts, workflows, or AI experiments.",
  },
];

const AIRunnerChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);
  const [isThinking, setIsThinking] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: ChatMessage = {
      id: nextId,
      from: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNextId((id) => id + 1);
    setInput("");
    setIsThinking(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed, source: "airunner-floating-chat" }),
      });

      if (!response.ok) {
        throw new Error(`Chat error: ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const replyText = data?.reply?.trim() || "The AI Runner cat could not fetch a reply right now. Please try again in a moment.";

      const aiMessage: ChatMessage = {
        id: nextId + 1,
        from: "ai",
        text: replyText,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setNextId((id) => id + 2);
    } catch (error: any) {
      const aiMessage: ChatMessage = {
        id: nextId + 1,
        from: "ai",
        text: "There was an issue contacting the AI backend. Please check your connection or try again shortly.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setNextId((id) => id + 2);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Expanded chat panel */}
      {isOpen && (
        <div className="glass-card border border-primary/40 rounded-2xl shadow-xl w-[22rem] md:w-[24rem] max-w-[95vw] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="relative px-4 pt-4 pb-3 border-b border-primary/30 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Holographic cat avatar */}
                <div className="relative h-10 w-10 rounded-full hologram-orb flex items-center justify-center">
                  <div className="relative h-7 w-7 hologram-cat" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
                    AI RUNNER
                  </span>
                  <span className="text-sm font-semibold text-cyan-100">
                    Black Cat Copilot
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className="h-7 w-7 inline-flex items-center justify-center rounded-full border border-cyan-400/60 bg-black/40 text-cyan-200 text-xs hover:bg-cyan-500/20 hover:text-cyan-50 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="px-3 pt-3 pb-2 max-h-64 overflow-y-auto space-y-2 text-xs cyber-grid bg-black/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed border backdrop-blur-sm shadow-md transition-all duration-200 ${
                    m.from === "user"
                      ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-50 text-right"
                      : "bg-slate-900/80 border-cyan-400/40 text-slate-50 text-left"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-xl px-3 py-2 text-[11px] border border-cyan-400/40 bg-slate-900/70 text-cyan-100/90 flex items-center gap-2">
                  <span className="relative flex h-1.5 w-8 items-center justify-between">
                    <span className="h-1 w-1.5 rounded-full bg-cyan-400/80 hologram-pulse" />
                    <span className="h-1 w-1.5 rounded-full bg-cyan-400/80 hologram-pulse delay-150" />
                    <span className="h-1 w-1.5 rounded-full bg-cyan-400/80 hologram-pulse delay-300" />
                  </span>
                  <span>Cat is thinking…</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-primary/30 bg-black/70 px-3 py-2">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI Runner cat…"
                className="flex-1 bg-transparent text-xs text-slate-50 placeholder:text-slate-400 border border-cyan-400/40 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400/80 focus:border-cyan-400/80"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="inline-flex items-center justify-center h-8 px-3 rounded-lg text-[11px] font-semibold uppercase tracking-wide bg-gradient-to-r from-cyan-500 to-purple-500 text-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-purple-400 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating glowing circle trigger with holographic cat */}
      <button
        type="button"
        onClick={handleToggle}
        className={`relative h-16 w-16 rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open AI Runner Black Cat chat"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/60 via-purple-500/40 to-blue-500/60 blur-lg opacity-90 hologram-ring" />
        <div className="relative h-14 w-14 rounded-full bg-black/80 border border-cyan-400/70 glass-card overflow-hidden flex items-center justify-center hologram-orb">
          <div className="relative h-9 w-9 hologram-cat" />
        </div>
      </button>
    </div>
  );
};

export default AIRunnerChatWidget;
