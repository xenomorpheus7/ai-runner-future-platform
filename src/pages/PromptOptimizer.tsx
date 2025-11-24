import { useState } from "react";
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

const PROMPT_OPTIMIZER_API = import.meta.env.VITE_PROMPT_OPTIMIZER_API || "http://localhost:8000";

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
];

const PromptOptimizer = () => {
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
  const { toast } = useToast();

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
      const response = await fetch(`${PROMPT_OPTIMIZER_API}/optimize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: rawPrompt,
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
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Zap className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-primary/40 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
            </div>
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI Runner 2033
                </span>
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="underline decoration-primary decoration-4 underline-offset-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Prompt Optimizer
                </span>
              </h2>
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
                        <div className="flex flex-col">
                          <span className="font-medium" style={{ fontFamily: "'Orbitron', sans-serif" }}>{model.label}</span>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
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
                  disabled={isOptimizing || !rawPrompt.trim() || !selectedModel}
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
                        <span className="font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Optimized for {selectedModelData.label}</span>
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
                      className={`relative group p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                        selectedModel === model.value
                          ? `border-primary bg-gradient-to-br ${model.color} bg-opacity-20 glow-turquoise scale-105`
                          : "border-primary/20 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                      }`}
                    >
                      <div className="text-sm font-semibold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{model.label}</div>
                      {selectedModel === model.value && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping" />
                      )}
                    </button>
                  ))}
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
      </div>

      <Footer />
    </div>
  );
};

export default PromptOptimizer;
