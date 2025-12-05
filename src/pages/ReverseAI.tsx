import { useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Wand2, Link as LinkIcon, ImageIcon, Video, FileText, Settings } from "lucide-react";

type ReverseAIResult = {
  reconstructed_prompt: string;
  style_breakdown?: string | null;
  tech_stack?: string[] | null;
  ai_probability?: number | null;
  extra_notes?: string | null;
};

const ReverseAI = () => {
  const [mode, setMode] = useState<string>("image");
  const [url, setUrl] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [creativity, setCreativity] = useState<number>(40);
  const [depth, setDepth] = useState<number>(70);
  const [detectAI, setDetectAI] = useState<string>("balanced");
  const [result, setResult] = useState<ReverseAIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_RAILWAY_API_URL || "http://127.0.0.1:8000";

  const handleRun = async () => {
    if (!url.trim()) {
      setError("Please provide a URL or text to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/reverse-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          target: url,
          notes,
          creativity,
          depth,
          detect_ai: detectAI,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.detail || data?.error || `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      const data: ReverseAIResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Failed to run Reverse AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 glow-turquoise">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">AI Lab · Reverse Mode</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Reverse Engineer AI Content
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Send in an image, website, video or article and get back a reconstructed prompt, style recipe and tech stack. This is a visual placeholder for your future Reverse AI model.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8 items-start animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 md:p-8 rounded-3xl border-primary/30 glow-turquoise">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-primary" />
                      Reverse Engineering Input
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose what you want to decode and paste a URL or description. File upload can be wired later.
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-[0.16em]">
                    Content Type
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      type="button"
                      variant={mode === "image" ? "default" : "outline"}
                      className={mode === "image" ? "bg-primary text-primary-foreground" : "border-primary/30"}
                      onClick={() => setMode("image")}
                    >
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Image
                    </Button>
                    <Button
                      type="button"
                      variant={mode === "site" ? "default" : "outline"}
                      className={mode === "site" ? "bg-primary text-primary-foreground" : "border-primary/30"}
                      onClick={() => setMode("site")}
                    >
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Site
                    </Button>
                    <Button
                      type="button"
                      variant={mode === "video" ? "default" : "outline"}
                      className={mode === "video" ? "bg-primary text-primary-foreground" : "border-primary/30"}
                      onClick={() => setMode("video")}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Video
                    </Button>
                    <Button
                      type="button"
                      variant={mode === "article" ? "default" : "outline"}
                      className={mode === "article" ? "bg-primary text-primary-foreground" : "border-primary/30"}
                      onClick={() => setMode("article")}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Article
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      {mode === "image"
                        ? "Image URL"
                        : mode === "video"
                        ? "Video URL (YouTube, Vimeo, etc.)"
                        : mode === "site"
                        ? "Website URL"
                        : "Article URL or paste text"}
                    </label>
                    {mode === "article" ? (
                      <Textarea
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste the article URL or the full article text here..."
                        className="min-h-[140px] bg-background/50 border-primary/30 text-foreground"
                      />
                    ) : (
                      <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={
                          mode === "image"
                            ? "https://... (image link)"
                            : mode === "video"
                            ? "https://youtube.com/..."
                            : "https://example.com"
                        }
                        className="bg-background/50 border-primary/30 text-foreground"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Extra context (optional)
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="What do you want Reverse AI to focus on? Style, tone, camera, color grading, site stack, copywriting tricks..."
                      className="min-h-[100px] bg-background/50 border-primary/30 text-foreground"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-destructive mb-2 text-center">{error}</p>
                  )}
                  <Button
                    type="button"
                    onClick={handleRun}
                    disabled={isLoading || !url.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise flex items-center justify-center gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    {isLoading ? "Analyzing..." : "Run Reverse AI"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Uses your backend at {API_BASE}/reverse-ai. Configure GROQ_API_KEY on the backend to enable analysis.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border-primary/30">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Reverse AI Settings</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Prompt Creativity</span>
                      <span className="text-xs text-muted-foreground">{creativity}%</span>
                    </div>
                    <Slider
                      value={[creativity]}
                      onValueChange={([v]) => setCreativity(v)}
                      min={0}
                      max={100}
                      step={5}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower = closer to the original. Higher = more speculative, exploratory prompts.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Analysis Depth</span>
                      <span className="text-xs text-muted-foreground">{depth}%</span>
                    </div>
                    <Slider
                      value={[depth]}
                      onValueChange={([v]) => setDepth(v)}
                      min={20}
                      max={100}
                      step={5}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Controls how much detail the model gives: quick sketch vs. full breakdown.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">AI Detection Mode</label>
                    <Select value={detectAI} onValueChange={(v) => setDetectAI(v)}>
                      <SelectTrigger className="bg-background/50 border-primary/30">
                        <SelectValue placeholder="Balanced" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light touch (assume human, flag only strong AI signals)</SelectItem>
                        <SelectItem value="balanced">Balanced (mix of style + statistical cues)</SelectItem>
                        <SelectItem value="strict">Strict (aggressive AI detection, more false positives)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      When you connect detection models, use this to tune sensitivity for classrooms or pro workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Reverse AI Result Section */}
          <div className="max-w-5xl mx-auto mt-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-6 md:p-8 rounded-3xl border-primary/20 text-sm text-muted-foreground space-y-4">
              <p className="mb-1 font-medium text-foreground text-base">Reverse AI Result</p>
              {result ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-[0.16em]">Reconstructed Prompt</p>
                    <Textarea
                      value={result.reconstructed_prompt || "No prompt reconstructed."}
                      readOnly
                      className="min-h-[220px] bg-background/50 border-primary/30 text-foreground text-sm"
                    />
                  </div>
                  {result.style_breakdown && (
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Style Breakdown</p>
                      <p className="text-xs md:text-sm whitespace-pre-line">{result.style_breakdown}</p>
                    </div>
                  )}
                  {result.tech_stack && result.tech_stack.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Likely Tech Stack</p>
                      <div className="flex flex-wrap gap-1">
                        {result.tech_stack.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[11px] md:text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {typeof result.ai_probability === "number" && (
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">AI Probability</p>
                      <p className="text-xs md:text-sm">
                        {(result.ai_probability * 100).toFixed(1)}% likely generated or heavily assisted by AI.
                      </p>
                    </div>
                  )}
                  {result.extra_notes && (
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Extra Notes</p>
                      <p className="text-xs md:text-sm whitespace-pre-line">{result.extra_notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs md:text-sm">
                  Run Reverse AI to see a reconstructed prompt, style breakdown, likely tech stack and AI probability for the content you provide.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReverseAI;
