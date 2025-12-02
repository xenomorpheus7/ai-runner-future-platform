import React from "react";

const PitchDeck: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4 py-16">
      <div className="max-w-xl w-full border border-slate-800 rounded-xl bg-slate-900/60 shadow-xl backdrop-blur-sm p-8 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">AI Runner Pitch Deck</h1>
        <p className="text-sm text-slate-300">
          This page is not linked from the main website. You can only access it via the
          direct URL that was shared with you.
        </p>
        <div className="mt-4 space-y-3">
          <a
            href="/ai-runner-pitch-deck.pptx"
            className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors w-full text-center"
          >
            Download pitch deck (.pptx)
          </a>
          <p className="text-xs text-slate-400">
            If the file doesn’t open automatically in your browser, it will download instead.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PitchDeck;
