import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Copy, CheckCircle2, Loader2, ArrowRight, RefreshCw, AlertCircle, Settings, SlidersHorizontal, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

const PROMPT_OPTIMIZER_API =
  import.meta.env.VITE_RAILWAY_API_URL || "http://127.0.0.1:8000";

const SUPPORTED_MODELS = [
  { 
    value: "chatgpt", 
    label: "ChatGPT", 
    description: "Optimize for reasoning and structured responses",
    color: "from-green-400 to-emerald-500",
    glow: "glow-turquoise"
  },
  { 
    value: "cursor", 
    label: "Cursor", 
    description: "Optimize for coding tasks and file operations",
    color: "from-blue-400 to-cyan-500",
    glow: "glow-blue"
  },
  { 
    value: "midjourney", 
    label: "Midjourney", 
    description: "Optimize for image generation with cinematic details",
    color: "from-purple-400 to-pink-500",
    glow: "glow-purple"
  },
  { 
    value: "leonardo", 
    label: "Leonardo AI", 
    description: "Optimize for image generation with camera details",
    color: "from-orange-400 to-red-500",
    glow: "glow-turquoise"
  },
  { 
    value: "sora", 
    label: "Sora", 
    description: "Optimize for video generation as shotlist",
    color: "from-indigo-400 to-violet-500",
    glow: "glow-purple"
  },
  { 
    value: "veo", 
    label: "Veo", 
    description: "Optimize for video generation with motion cues",
    color: "from-teal-400 to-cyan-500",
    glow: "glow-blue"
  },
  { 
    value: "runway", 
    label: "Runway", 
    description: "Optimize for Runway video and image generations",
    color: "from-amber-400 to-orange-500",
    glow: "glow-turquoise"
  },
  { 
    value: "windsurf", 
    label: "Windsurf", 
    description: "Optimize for IDE-native coding assistants",
    color: "from-sky-400 to-blue-500",
    glow: "glow-blue"
  },
  { 
    value: "gemini", 
    label: "Gemini", 
    description: "Optimize for Google Gemini with structured outputs",
    color: "from-cyan-400 to-indigo-500",
    glow: "glow-purple"
  },
  { 
    value: "antigravity", 
    label: "Antigravity", 
    description: "Optimize for experimental frontier creativity",
    color: "from-fuchsia-400 to-rose-500",
    glow: "glow-purple"
  },
  { 
    value: "github-copilot", 
    label: "GitHub Copilot", 
    description: "Optimize inline code comments for Copilot completions",
    color: "from-emerald-400 to-teal-500",
    glow: "glow-turquoise"
  },
  { 
    value: "grok", 
    label: "Grok", 
    description: "Optimize for sharp, info-dense Grok prompts",
    color: "from-slate-400 to-zinc-500",
    glow: "glow-blue"
  },
  { 
    value: "comfyui", 
    label: "ComfyUI", 
    description: "Optimize diffusion prompts and negative prompts",
    color: "from-lime-400 to-emerald-500",
    glow: "glow-turquoise"
  },
  { 
    value: "lovable", 
    label: "Lovable", 
    description: "Optimize prompts for warm, user-facing AI assistants",
    color: "from-pink-400 to-rose-500",
    glow: "glow-purple"
  },
  { 
    value: "seedance", 
    label: "Seedance", 
    description: "Optimize workflow-style, multi-step prompts",
    color: "from-amber-400 to-yellow-500",
    glow: "glow-turquoise"
  },
  { 
    value: "voiceflow", 
    label: "Voiceflow", 
    description: "Optimize conversational prompts for voice and chat flows",
    color: "from-violet-400 to-fuchsia-500",
    glow: "glow-purple"
  },
  { 
    value: "anthropic", 
    label: "Anthropic (Claude)", 
    description: "Optimize safe, structured prompts for Claude models",
    color: "from-stone-400 to-neutral-500",
    glow: "glow-blue"
  },
];

const PromptOptimizer = () => {
  const navigate = useNavigate();
  const [rawPrompt, setRawPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2000]);
  const [autoCopy, setAutoCopy] = useState(false);
  const [showModelLogos, setShowModelLogos] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const title = "AI Prompt Optimizer – AI Runner 2033 AI Lab";
    const description =
      "Optimize ChatGPT, Cursor, Midjourney, Sora and other AI prompts automatically with AI Runner 2033's free prompt optimizer and testing lab.";

    document.title = title;
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, []);

  const selectedModelData = SUPPORTED_MODELS.find(m => m.value === selectedModel);

  const handleOptimize = async () => {
    if (!rawPrompt.trim()) {
      setError("Please enter a prompt to optimize");
      toast({
        title: "Error",
        description: "Please enter a prompt to optimize",
        variant: "destructive",
      });
      return;
    }

    if (!selectedModel) {
      setError("Please select a target AI model");
      toast({
        title: "Error",
        description: "Please select a target AI model",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    setError(null);
    setOptimizedPrompt("");

    try {
      // Adapt prompt based on selected preset before sending to backend
      let promptToSend = rawPrompt;

      if (selectedPreset === "text-to-image") {
        promptToSend = `You are optimizing a text-to-image prompt for a generative model. Rewrite the following description so it is a clear, information-dense image prompt.\n\nOriginal user idea:\n${rawPrompt}`;
      } else if (selectedPreset === "image-to-image") {
        promptToSend = `You are optimizing an image-to-image prompt. The user already has a base image and wants to transform or enhance it. Rewrite the description so it clearly specifies what should change, what should stay consistent, and any style or composition goals.\n\nUser instructions about the transformation:\n${rawPrompt}`;
      } else if (selectedPreset === "character-consistency") {
        promptToSend = `You are optimizing a prompt for strict character consistency across multiple generations. Extract and rewrite the character description so it is precise and repeatable (appearance, clothing, personality, poses) while avoiding contradictions.\n\nUser description:\n${rawPrompt}`;
      } else if (selectedPreset === "image-to-video") {
        promptToSend = `You are optimizing an image-to-video prompt. The user has a keyframe or base image and wants a short video derived from it. Rewrite the instructions to clearly describe motion, camera movement, duration, and how the final video should evolve from the base image.\n\nUser description of desired motion/video:\n${rawPrompt}`;
      } else if (selectedPreset === "text-to-speech") {
        promptToSend = `You are optimizing a text-to-speech script prompt. Rewrite the text so it is natural to speak aloud, with clear pacing, emphasis, and pronunciation notes where needed. Avoid markup unless explicitly requested.\n\nOriginal script idea:\n${rawPrompt}`;
      } else if (selectedPreset === "text-to-code") {
        promptToSend = `You are optimizing a text-to-code generation request. Rewrite the instructions so they clearly specify the language, environment, function names, inputs, outputs, and constraints for the code the user wants.\n\nUser request for code:\n${rawPrompt}`;
      }

      const response = await fetch(`${PROMPT_OPTIMIZER_API}/optimize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptToSend,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error occurred" }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOptimizedPrompt(data.optimized_prompt || "");
      
      // Auto-copy if enabled
      if (autoCopy && data.optimized_prompt) {
        await navigator.clipboard.writeText(data.optimized_prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      
      toast({
        title: "Success",
        description: "Prompt optimized successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to optimize prompt. Make sure the backend is running.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopy = async () => {
    if (!optimizedPrompt) return;

    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Optimized prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setRawPrompt("");
    setSelectedModel("");
    setOptimizedPrompt("");
    setError(null);
  };

  const handleDownload = () => {
    if (!optimizedPrompt) return;
    const blob = new Blob([optimizedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `optimized-prompt-${selectedModel}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Prompt saved to file",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-10">
          {/* AI LAB Title with Energy Effects */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-black mb-4 electric-glow electric-flicker electric-pulse relative inline-block">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative z-10">
                AI LAB
              </span>
              {/* Electric spark effects */}
              <span className="absolute -top-2 -left-2 w-2 h-2 bg-primary rounded-full electric-spark" style={{ animationDelay: "0s" }} />
              <span className="absolute -top-4 right-4 w-1.5 h-1.5 bg-secondary rounded-full electric-spark" style={{ animationDelay: "0.2s" }} />
              <span className="absolute -bottom-2 left-8 w-1 h-1 bg-accent rounded-full electric-spark" style={{ animationDelay: "0.4s" }} />
              <span className="absolute -bottom-4 -right-2 w-2 h-2 bg-primary rounded-full electric-spark" style={{ animationDelay: "0.6s" }} />
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-16 mb-4">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold">
                <span className="underline decoration-primary decoration-4 underline-offset-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Prompt Optimizer
                </span>
              </h3>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Transform your raw prompts into optimized, model-specific prompts using AI Runner 2033's advanced optimization engine powered by GROQ Llama 3.1 8B
          </p>
        </div>

        {/* Main Content - Wider Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <Card className="glass-card border-primary/20 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                    Your Prompt
                  </CardTitle>
                  <CardDescription>Enter your raw prompt below</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="hover:bg-primary/10"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              {/* Settings Panel */}
              {showSettings && (
                <Card className="bg-primary/5 border-primary/20 mb-4 animate-slide-in">
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Temperature: {temperature[0]}</Label>
                        <span className="text-xs text-muted-foreground">Creativity</span>
                      </div>
                      <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Max Tokens: {maxTokens[0]}</Label>
                        <span className="text-xs text-muted-foreground">Length</span>
                      </div>
                      <Slider
                        value={maxTokens}
                        onValueChange={setMaxTokens}
                        min={500}
                        max={4000}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-copy">Auto-copy optimized prompt</Label>
                      <Switch
                        id="auto-copy"
                        checked={autoCopy}
                        onCheckedChange={setAutoCopy}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-logos">Show model logos</Label>
                      <Switch
                        id="show-logos"
                        checked={showModelLogos}
                        onCheckedChange={setShowModelLogos}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Label htmlFor="model-select" className="text-base">Target AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger id="model-select" className="w-full h-12 text-base">
                    <SelectValue placeholder="Select a target AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{model.label}</span>
                            <span className="text-xs text-muted-foreground">{model.description}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="raw-prompt" className="text-base">Raw Prompt</Label>
                <Textarea
                  id="raw-prompt"
                  placeholder="Type your prompt here... e.g., 'a beautiful sunset over mountains with dramatic clouds'"
                  value={rawPrompt}
                  onChange={(e) => setRawPrompt(e.target.value)}
                  className="min-h-[300px] resize-none text-base border-primary/20 focus:border-primary focus:ring-primary/20"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {rawPrompt.length} characters
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleOptimize}
                  disabled={isOptimizing || !rawPrompt.trim()}
                  className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-turquoise"
                >
                  {isOptimizing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Optimize Prompt
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isOptimizing}
                  className="h-12 w-12 border-primary/20 hover:border-primary hover:bg-primary/10"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive animate-slide-in">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="glass-card border-primary/20 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CheckCircle2 className="h-6 w-6 text-primary animate-pulse" />
                Optimized Prompt
              </CardTitle>
              <CardDescription>Your AI-optimized prompt ready to use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              {optimizedPrompt ? (
                <>
                  <div className="relative">
                    <Textarea
                      value={optimizedPrompt}
                      readOnly
                      className="min-h-[300px] resize-none bg-primary/5 border-primary/20 text-base focus:ring-primary/20"
                    />
                    <div className="absolute top-2 right-2 bg-primary/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">
                      {optimizedPrompt.length} chars
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="w-full h-12 border-primary/20 hover:border-primary hover:bg-primary/10 hover:glow-turquoise transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-5 w-5" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="w-full h-12 border-primary/20 hover:border-primary hover:bg-primary/10"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>
                  {selectedModelData && (
                    <div className={`p-4 rounded-lg bg-gradient-to-r ${selectedModelData.color} bg-opacity-10 border border-primary/20`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✨</span>
                        <span className="font-semibold">Optimized for {selectedModelData.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedModelData.description}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-primary/20 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse" />
                  <div className="text-center text-muted-foreground relative z-10">
                    <Zap className="h-16 w-16 mx-auto mb-4 opacity-30 animate-pulse" />
                    <p className="text-lg font-semibold mb-2">Your optimized prompt will appear here</p>
                    <p className="text-sm">Select a model and enter a prompt, then click Optimize</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Model Logos Grid */}
        {showModelLogos && (
          <div className="max-w-7xl mx-auto mb-12">
            <Card className="glass-card border-primary/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Supported AI Models</CardTitle>
                <CardDescription>Select a model to see its optimization style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SUPPORTED_MODELS.map((model) => (
                    <button
                      key={model.value}
                      onClick={() => setSelectedModel(model.value)}
                      className={`relative group p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedModel === model.value
                          ? `border-primary bg-gradient-to-br ${model.color} bg-opacity-20 glow-turquoise scale-105`
                          : "border-primary/20 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                      }`}
                    >
                      <div className="text-sm font-semibold">{model.label}</div>
                      {selectedModel === model.value && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Generation Presets</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select what kind of task you are optimizing for. The optimizer will adapt your prompt for that use case before sending it to the selected model.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[ 
                      { id: "text-to-image", label: "Text to Image" },
                      { id: "image-to-image", label: "Image to Image" },
                      { id: "character-consistency", label: "Character Consistency" },
                      { id: "image-to-video", label: "Image to Video" },
                      { id: "text-to-speech", label: "Text to Speech" },
                      { id: "text-to-code", label: "Text to Code" },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset.id)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-200 text-left ${
                          selectedPreset === preset.id
                            ? "border-primary bg-primary/10 shadow-lg glow-turquoise"
                            : "border-primary/20 bg-background/40 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <Card className="glass-card border-primary/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3 group">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg text-foreground glow-turquoise group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <h3 className="font-semibold text-lg">Enter Your Prompt</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-16">
                    Type your raw, unoptimized prompt in the input field. Be as descriptive or as simple as you want.
                  </p>
                </div>
                <div className="space-y-3 group">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center font-bold text-lg text-foreground glow-purple group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <h3 className="font-semibold text-lg">Select Target Model</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-16">
                    Choose the AI model you want to optimize for. Each model has specialized optimization templates.
                  </p>
                </div>
                <div className="space-y-3 group">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-lg text-foreground glow-blue group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <h3 className="font-semibold text-lg">Get Optimized Result</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-16">
                    Receive a model-specific, optimized prompt powered by GROQ Llama 3.1 8B Instant.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Testing Space Section */}
        <section className="max-w-7xl mx-auto mb-12 py-24 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 cyber-grid opacity-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">AI Testing Space</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  How to efficiently communicate with AI
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                Test your prompt skills and see how different approaches affect AI-generated results
              </p>
              <Button
                onClick={() => navigate("/prompt-testing")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
              >
                Open Full AI Testing Space
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Reverse Engineer AI Content Placeholder */}
            <div className="max-w-5xl mx-auto mt-32 mb-24 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Card className="glass-card p-10 md:p-12 rounded-3xl border-primary/40 glow-turquoise relative overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-40 blur-3xl pointer-events-none" />
                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/40 mb-4">
                      <Sparkles className="h-4 w-4 text-primary mr-2" />
                      <span className="text-xs font-medium tracking-wider uppercase">New Lab Mode</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Reverse Engineer AI Content
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-4">
                      Drop in an image, video, article, code snippet or website URL and let the lab reconstruct the hidden prompt, style blueprint and tech stack behind it.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
                        <p className="text-xs font-semibold tracking-wide text-primary mb-2">WHAT IT CAN UNPACK</p>
                        <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Likely prompt structure and key instructions</li>
                          <li>Visual style, composition and camera language</li>
                          <li>Probable tools, models and workflow choices</li>
                          <li>Patterns you can reuse in your own prompts</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-2xl border border-secondary/30 bg-secondary/5 backdrop-blur-sm">
                        <p className="text-xs font-semibold tracking-wide text-secondary mb-2">PERFECT FOR</p>
                        <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Studying viral AI images, videos or pages</li>
                          <li>Learning how pros structure complex prompts</li>
                          <li>Rebuilding prompts from client references</li>
                          <li>Documenting style guides for your own brand</li>
                        </ul>
                      </div>
                    </div>
                    <div className="inline-flex flex-wrap gap-2 mt-1">
                      <span className="px-3 py-1 rounded-full text-xs bg-primary/10 border border-primary/30 text-primary">Prompt Blueprint</span>
                      <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 border border-secondary/30 text-secondary">Style DNA</span>
                      <span className="px-3 py-1 rounded-full text-xs bg-accent/10 border border-accent/30 text-accent">Tech Stack Guess</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch gap-3 w-full md:w-auto md:min-w-[220px]">
                    {/* Glowing neural network looped animation */}
                    <div className="relative h-20 mb-2 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-2xl animate-pulse" />
                      <div className="relative w-20 h-20 border border-primary/40 rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite]">
                        {/* Outer and inner orbits */}
                        <div className="absolute w-16 h-16 rounded-full border border-primary/40 border-dashed animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-10 h-10 rounded-full border border-secondary/50 border-dashed animate-[spin_8s_linear_infinite_reverse]" />

                        {/* Neural connection lines */}
                        <div className="absolute w-14 h-px bg-gradient-to-r from-primary/40 via-secondary/60 to-accent/60 rotate-12 animate-pulse" />
                        <div className="absolute w-12 h-px bg-gradient-to-r from-accent/60 via-primary/50 to-secondary/40 -rotate-24 animate-[pulse_2.5s_ease-in-out_infinite]" />
                        <div className="absolute h-12 w-px bg-gradient-to-b from-primary/40 via-secondary/60 to-accent/60 rotate-6 animate-[pulse_3s_ease-in-out_infinite]" />

                        {/* Central node */}
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-ping" />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={() => navigate("/reverse-ai")}
                      className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground glow-turquoise text-base font-semibold tracking-wide"
                    >
                      REVERSE AI
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                      Use our full reverse-engineering model.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/30 blur-3xl animate-pulse" />
                <div className="absolute -top-10 -left-8 w-32 h-32 rounded-full bg-accent/30 blur-3xl animate-[ping_3s_ease-in-out_infinite]" />
              </Card>
            </div>

            {/* Main Content - Test Your Prompt Skills Card */}
            <div className="max-w-6xl mx-auto mt-40">
              <Card className="glass-card p-12 rounded-3xl border-primary/30 glow-turquoise text-center animate-fade-in">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 glow-turquoise">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Test Your Prompt Skills</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                    Write a prompt and see how the AI interprets it. Learn what makes a good prompt versus a weak one.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    // Scroll to top of the AI lab page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300"
                >
                  Start Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PromptOptimizer;
