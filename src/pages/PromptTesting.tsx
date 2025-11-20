import { useState, useRef, useEffect } from "react";
import { Sparkles, Zap, Lightbulb, CheckCircle2, XCircle, Loader2, ArrowRight, Settings, X, Download, Copy, Wand2, User, TrendingDown, Network, Layers, Brain, Heart, Cpu, Workflow, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WorkflowBuilder } from "@/components/WorkflowBuilder";
import Footer from "@/components/Footer";

type GameState = "playing" | "result" | "tips";
type PromptQuality = "good" | "bad" | null;
type ActiveTab = "prompt" | "workflow";

interface GenerationSettings {
  negativePrompt: string;
  guidanceScale: number;
  numInferenceSteps: number;
  width: number;
  height: number;
  aspectRatio: string;
}

interface PromptEnhancement {
  original: string;
  enhanced: string;
  improvements: Array<{
    text: string;
    reason: string;
    startIndex: number;
    endIndex: number;
  }>;
}

const PromptTesting = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("prompt");
  const [prompt, setPrompt] = useState("");
  const [gameState, setGameState] = useState<GameState>("playing");
  const [promptQuality, setPromptQuality] = useState<PromptQuality>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingEnhanced, setIsGeneratingEnhanced] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState<PromptEnhancement | null>(null);
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enhancedError, setEnhancedError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showToolsSection, setShowToolsSection] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  // Settings state
  const [settings, setSettings] = useState<GenerationSettings>({
    negativePrompt: "blurry, low quality, distorted, ugly, bad anatomy, watermark, signature",
    guidanceScale: 7.5,
    numInferenceSteps: 20,
    width: 1024,
    height: 1024,
    aspectRatio: "1:1",
  });

  // Aspect ratio presets
  const aspectRatios = [
    { label: "Square (1:1)", value: "1:1", width: 1024, height: 1024 },
    { label: "Portrait (2:3)", value: "2:3", width: 832, height: 1216 },
    { label: "Landscape (3:2)", value: "3:2", width: 1216, height: 832 },
    { label: "Wide (16:9)", value: "16:9", width: 1344, height: 768 },
    { label: "Tall (9:16)", value: "9:16", width: 768, height: 1344 },
  ];

  // Prompt presets
  const promptPresets = [
    {
      name: "Cyberpunk Portrait",
      prompt: "A photorealistic portrait of a cyberpunk character with neon blue hair, cinematic lighting, high quality, 8k resolution, detailed facial features, futuristic background",
    },
    {
      name: "Mountain Landscape",
      prompt: "A majestic mountain landscape at sunset with dramatic clouds, cinematic composition, golden hour lighting, professional photography style, ultra-detailed, 4k",
    },
    {
      name: "Futuristic City",
      prompt: "A futuristic cityscape with flying cars and holographic advertisements, cyberpunk aesthetic, neon lights, night scene, highly detailed, 4k quality, cinematic",
    },
    {
      name: "Fantasy Character",
      prompt: "A detailed fantasy character portrait, magical atmosphere, intricate details, high quality, digital art style, vibrant colors, 8k resolution",
    },
    {
      name: "Abstract Art",
      prompt: "Abstract digital art, vibrant colors, geometric patterns, modern art style, high quality, detailed, 4k resolution, artistic composition",
    },
  ];

  // Cursor blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Focus textarea when component mounts
  useEffect(() => {
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }, []);

  // Update dimensions when aspect ratio changes
  useEffect(() => {
    const ratio = aspectRatios.find((r) => r.value === settings.aspectRatio);
    if (ratio) {
      setSettings((prev) => ({
        ...prev,
        width: ratio.width,
        height: ratio.height,
      }));
    }
  }, [settings.aspectRatio]);

  // Analyze prompt quality
  const analyzePrompt = (text: string): PromptQuality => {
    const lowerText = text.toLowerCase();
    const wordCount = text.trim().split(/\s+/).length;
    
    // Good prompt indicators
    const hasDetails = wordCount >= 8;
    const hasStyle = /style|artistic|photorealistic|digital|painting|illustration|cinematic/i.test(text);
    const hasSubject = /portrait|landscape|character|scene|object|animal|person/i.test(text);
    const hasQuality = /high quality|detailed|sharp|4k|8k|professional/i.test(text);
    const hasComposition = /composition|lighting|angle|perspective|framing/i.test(text);
    
    // Bad prompt indicators
    const tooShort = wordCount < 5;
    const tooVague = /something|thing|stuff|nice|good|bad/i.test(text) && wordCount < 8;
    const noDetails = !hasStyle && !hasQuality && wordCount < 10;
    
    const goodScore = (hasDetails ? 1 : 0) + (hasStyle ? 1 : 0) + (hasSubject ? 1 : 0) + 
                     (hasQuality ? 1 : 0) + (hasComposition ? 1 : 0);
    
    if (tooShort || tooVague || (noDetails && goodScore < 2)) {
      return "bad";
    }
    
    if (goodScore >= 3 || (hasDetails && hasStyle && hasSubject)) {
      return "good";
    }
    
    return "bad";
  };

  // Enhance prompt with AI improvements
  const enhancePrompt = (originalPrompt: string): PromptEnhancement => {
    const words = originalPrompt.trim().split(/\s+/);
    const improvements: Array<{ text: string; reason: string }> = [];
    const additions: string[] = [];

    // Check for missing style keywords
    if (!/photorealistic|realistic|cinematic|artistic|digital|painting|illustration/i.test(originalPrompt)) {
      additions.push("photorealistic");
      improvements.push({
        text: "photorealistic",
        reason: "Added style keyword to help AI understand the desired aesthetic",
      });
    }

    // Check for missing quality indicators
    if (!/high quality|detailed|sharp|4k|8k|professional|ultra/i.test(originalPrompt)) {
      additions.push("high quality, detailed");
      improvements.push({
        text: "high quality, detailed",
        reason: "Added quality indicators to ensure crisp, professional results",
      });
    }

    // Check for missing lighting/composition
    if (!/lighting|composition|angle|perspective|framing|cinematic/i.test(originalPrompt)) {
      additions.push("cinematic lighting");
      improvements.push({
        text: "cinematic lighting",
        reason: "Added lighting description to improve visual composition",
      });
    }

    // Check for missing subject details
    if (words.length < 10 && !/detailed|intricate|specific/i.test(originalPrompt)) {
      additions.push("intricate details");
      improvements.push({
        text: "intricate details",
        reason: "Added detail keywords to help AI focus on precision",
      });
    }

    // If prompt is too short, add resolution
    if (words.length < 8 && !/4k|8k|resolution/i.test(originalPrompt)) {
      additions.push("4k resolution");
      improvements.push({
        text: "4k resolution",
        reason: "Added resolution specification for higher quality output",
      });
    }

    // Build enhanced prompt
    let enhanced = originalPrompt;
    if (additions.length > 0) {
      enhanced = additions.join(", ") + ", " + originalPrompt;
    }

    // Clean up double commas and spaces
    enhanced = enhanced.replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();

    // Calculate indices for highlighting
    const improvementsWithIndices = improvements.map((imp) => {
      const index = enhanced.indexOf(imp.text);
      return {
        text: imp.text,
        reason: imp.reason,
        startIndex: index,
        endIndex: index + imp.text.length,
      };
    });

    return {
      original: originalPrompt,
      enhanced,
      improvements: improvementsWithIndices,
    };
  };

  // Generate image with retry logic
  const generateImage = async (
    promptText: string,
    isEnhanced: boolean = false,
    retries: number = 3
  ): Promise<string | null> => {
    const setLoading = isEnhanced ? setIsGeneratingEnhanced : setIsGenerating;
    const setErr = isEnhanced ? setEnhancedError : setError;

    try {
      setLoading(true);
      setErr(null);
      
      const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
      
      if (!HF_TOKEN) {
        setErr("API token not found. Please add VITE_HF_TOKEN to your .env file.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        return null;
      }

      // Use proxy endpoint to avoid CORS issues
      const apiUrl = "/api/hf/generate-image";

      for (let attempt = 0; attempt < retries; attempt++) {
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-HF-Token": HF_TOKEN, // Pass token in custom header
            },
            body: JSON.stringify({
              prompt: promptText,
              negativePrompt: settings.negativePrompt,
              guidanceScale: settings.guidanceScale,
              numInferenceSteps: settings.numInferenceSteps,
              width: settings.width,
              height: settings.height,
            }),
          });

          if (response.status === 503) {
            // Model is loading, wait and retry
            if (attempt < retries - 1) {
              await new Promise(resolve => setTimeout(resolve, 5000 * (attempt + 1)));
              continue;
            }
            setErr("Model is loading. Please wait a moment and try again.");
            return null;
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 429) {
              if (attempt < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
                continue;
              }
              setErr("Rate limit exceeded. Please wait a moment before trying again.");
              return null;
            }
            setErr(errorData.error || `API error: ${response.statusText}`);
            return null;
          }

          const blob = await response.blob();
          
          // Check if response is an image
          if (blob.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
          } else {
            // Might be JSON error
            const text = await blob.text();
            try {
              const json = JSON.parse(text);
              if (json.error) {
                setErr(json.error);
                return null;
              }
            } catch {
              // Not JSON, might be HTML error page
              setErr("Unexpected response format. Please try again.");
              return null;
            }
          }
        } catch (fetchError: any) {
          if (attempt < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
            continue;
          }
          throw fetchError;
        }
      }

      return null;
    } catch (error: any) {
      console.error("Generation error:", error);
      setErr(error.message || "Failed to generate image. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setHint("Please enter a prompt to test your skills!");
      return;
    }

    const quality = analyzePrompt(prompt);
    setPromptQuality(quality);
    setGameState("result");
    setError(null);
    setEnhancedError(null);
    setGeneratedImage(null);
    setEnhancedImage(null);
    setEnhancedPrompt(null);

    // Generate feedback
    if (quality === "good") {
      setFeedback("Excellent! Your prompt is detailed and specific. This will help the AI understand exactly what you want.");
      setHint("Great job! You included style, subject, and quality details.");
    } else {
      setFeedback("Your prompt could be more specific. Try adding details about style, composition, lighting, or quality.");
      setHint("Tip: Include specific details like 'photorealistic', 'cinematic lighting', or 'high quality' to get better results.");
    }

    // Enhance prompt
    const enhancement = enhancePrompt(prompt);
    setEnhancedPrompt(enhancement);

    // Generate both images in parallel
    const [userImage, enhancedImg] = await Promise.all([
      generateImage(prompt, false),
      generateImage(enhancement.enhanced, true),
    ]);

    if (userImage) {
      setGeneratedImage(userImage);
    }
    if (enhancedImg) {
      setEnhancedImage(enhancedImg);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setGameState("playing");
    setPromptQuality(null);
    setGeneratedImage(null);
    setEnhancedImage(null);
    setEnhancedPrompt(null);
    setFeedback("");
    setHint("");
    setError(null);
    setEnhancedError(null);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const showTips = () => {
    setGameState("tips");
  };

  const applyPreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
    setHint("");
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setHint("Prompt copied to clipboard!");
    setTimeout(() => setHint(""), 2000);
  };

  // Render enhanced prompt with highlighted improvements
  const renderEnhancedPrompt = (enhancement: PromptEnhancement) => {
    if (!enhancement.improvements.length) {
      return <span className="text-foreground">{enhancement.enhanced}</span>;
    }

    const parts: Array<{ text: string; isHighlight: boolean; reason?: string }> = [];
    let lastIndex = 0;

    // Sort improvements by start index
    const sortedImprovements = [...enhancement.improvements].sort((a, b) => a.startIndex - b.startIndex);

    sortedImprovements.forEach((improvement) => {
      // Add text before highlight
      if (improvement.startIndex > lastIndex) {
        parts.push({
          text: enhancement.enhanced.substring(lastIndex, improvement.startIndex),
          isHighlight: false,
        });
      }
      // Add highlighted text
      parts.push({
        text: enhancement.enhanced.substring(improvement.startIndex, improvement.endIndex),
        isHighlight: true,
        reason: improvement.reason,
      });
      lastIndex = improvement.endIndex;
    });

    // Add remaining text
    if (lastIndex < enhancement.enhanced.length) {
      parts.push({
        text: enhancement.enhanced.substring(lastIndex),
        isHighlight: false,
      });
    }

    return (
      <TooltipProvider>
        <span className="text-foreground">
          {parts.map((part, index) => {
            if (part.isHighlight && part.reason) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <span className="text-secondary bg-secondary/20 px-1 rounded cursor-help underline decoration-secondary/50 decoration-2 underline-offset-2 hover:bg-secondary/30 transition-colors">
                      {part.text}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-popover border-secondary/50">
                    <p className="text-sm">{part.reason}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }
            return <span key={index}>{part.text}</span>;
          })}
        </span>
      </TooltipProvider>
    );
  };

  const examplePrompts = {
    good: [
      "A photorealistic portrait of a cyberpunk character with neon blue hair, cinematic lighting, high quality, 8k resolution, detailed facial features",
      "A majestic mountain landscape at sunset with dramatic clouds, cinematic composition, golden hour lighting, professional photography style, ultra-detailed",
      "A futuristic cityscape with flying cars and holographic advertisements, cyberpunk aesthetic, neon lights, night scene, highly detailed, 4k quality"
    ],
    bad: [
      "A picture",
      "Something cool",
      "A nice image with good quality"
    ]
  };

  return (
    <div className="min-h-screen">
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">AI Testing Space</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                How to efficiently communicate with AI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your prompt skills and see how different approaches affect AI-generated results
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)} className="mb-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card border-primary/20">
                <TabsTrigger 
                  value="prompt" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Prompt Testing
                </TabsTrigger>
                <TabsTrigger 
                  value="workflow"
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflow Builder
                </TabsTrigger>
              </TabsList>

              {/* Prompt Testing Tab */}
              <TabsContent value="prompt" className="mt-6">
            {gameState === "playing" && (
              <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
                {/* Main Prompt Area */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Prompt Input */}
                  <div className="glass-card p-8 rounded-2xl border-primary/30 hover:border-primary/50 transition-all duration-300 hover:glow-turquoise">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-primary">
                        Enter Your Prompt
                      </label>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyPrompt}
                          disabled={!prompt.trim()}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSettings(!showSettings)}
                          className="h-8 w-8 p-0"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value);
                          setHint("");
                        }}
                        placeholder="Describe what you want to generate... (e.g., 'A photorealistic portrait of a cyberpunk character with neon blue hair, cinematic lighting, high quality')"
                        className="min-h-[120px] bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50 pr-8"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            handleSubmit();
                          }
                        }}
                      />
                      {prompt && (
                        <div className="absolute bottom-4 right-4 pointer-events-none">
                          <span className={`inline-block w-0.5 h-5 bg-primary transition-opacity ${cursorVisible ? "opacity-100" : "opacity-0"}`} />
                        </div>
                      )}
                    </div>
                    {hint && (
                      <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        {hint}
                      </p>
                    )}
                    {error && (
                      <p className="mt-3 text-sm text-destructive flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        {error}
                      </p>
                    )}

                    {/* Prompt Presets */}
                    <div className="mt-4">
                      <Label className="text-xs text-muted-foreground mb-2 block">Quick Presets:</Label>
                      <div className="flex flex-wrap gap-2">
                        {promptPresets.map((preset, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset(preset.prompt)}
                            className="text-xs border-primary/30 hover:bg-primary/10"
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isGenerating || !prompt.trim()}
                      className="mt-6 w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30 transition-all duration-300"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Result
                          <Sparkles className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Settings Panel */}
                  {showSettings && (
                    <div className="glass-card p-6 rounded-2xl border-primary/30 animate-fade-in">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                          <Settings className="h-5 w-5 text-primary" />
                          Generation Settings
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSettings(false)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {/* Negative Prompt */}
                        <div>
                          <Label htmlFor="negative-prompt" className="text-sm font-medium mb-2 block text-foreground">
                            Negative Prompt
                          </Label>
                          <Textarea
                            id="negative-prompt"
                            value={settings.negativePrompt}
                            onChange={(e) => setSettings({ ...settings, negativePrompt: e.target.value })}
                            placeholder="What to avoid in the image..."
                            className="min-h-[80px] bg-background/50 border-primary/30 text-foreground text-sm"
                          />
                        </div>

                        {/* Aspect Ratio */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block text-foreground">Aspect Ratio</Label>
                          <Select
                            value={settings.aspectRatio}
                            onValueChange={(value) => setSettings({ ...settings, aspectRatio: value })}
                          >
                          <SelectTrigger className="bg-background/50 border-primary/30 text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                            <SelectContent>
                              {aspectRatios.map((ratio) => (
                                <SelectItem key={ratio.value} value={ratio.value}>
                                  {ratio.label} ({ratio.width}x{ratio.height})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Guidance Scale */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block text-foreground">
                            Guidance Scale: {settings.guidanceScale}
                          </Label>
                          <Slider
                            value={[settings.guidanceScale]}
                            onValueChange={([value]) => setSettings({ ...settings, guidanceScale: value })}
                            min={1}
                            max={20}
                            step={0.5}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Higher values make the AI follow your prompt more closely
                          </p>
                        </div>

                        {/* Inference Steps */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block text-foreground">
                            Inference Steps: {settings.numInferenceSteps}
                          </Label>
                          <Slider
                            value={[settings.numInferenceSteps]}
                            onValueChange={([value]) => setSettings({ ...settings, numInferenceSteps: value })}
                            min={10}
                            max={50}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            More steps = better quality but slower generation
                          </p>
                        </div>

                        {/* Dimensions Display */}
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label className="text-sm font-medium mb-2 block text-foreground">Width</Label>
                            <Input
                              type="number"
                              value={settings.width}
                              onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) || 1024 })}
                              className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground/50"
                              min={256}
                              max={2048}
                              step={64}
                            />
                          </div>
                          <div className="flex-1">
                            <Label className="text-sm font-medium mb-2 block text-foreground">Height</Label>
                            <Input
                              type="number"
                              value={settings.height}
                              onChange={(e) => setSettings({ ...settings, height: parseInt(e.target.value) || 1024 })}
                              className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground/50"
                              min={256}
                              max={2048}
                              step={64}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tips Button */}
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={showTips}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Lightbulb className="mr-2 h-4 w-4" />
                      View Prompt Tips
                    </Button>
                  </div>
                </div>

                {/* Settings Sidebar (when not in mobile) */}
                {!showSettings && (
                  <div className="lg:block hidden">
                    <div className="glass-card p-6 rounded-2xl border-primary/30 sticky top-24">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <Settings className="h-5 w-5 text-primary" />
                        Quick Settings
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() => setShowSettings(true)}
                        className="w-full border-primary/30 hover:bg-primary/10"
                      >
                        Open Settings
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {gameState === "result" && (
              <div className="space-y-6 animate-fade-in">
                {/* Comparison View */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* User Prompt Result */}
                  <div className="glass-card p-6 rounded-2xl border-primary/30 glow-turquoise">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 glow-turquoise">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-primary">Your Prompt</h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Prompt:</p>
                      <div className="bg-background/50 p-3 rounded-lg border border-primary/20">
                        <p className="text-foreground italic text-sm">"{prompt}"</p>
                      </div>
                    </div>

                    {/* User Generated Image */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-primary/20 mb-4">
                      {isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                          <p className="text-muted-foreground text-sm">Generating...</p>
                        </div>
                      ) : generatedImage ? (
                        <>
                          <img
                            src={generatedImage}
                            alt="Your generated result"
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => downloadImage(generatedImage, `user-prompt-${Date.now()}.png`)}
                              className="bg-background/80 backdrop-blur-sm h-8"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              <span className="text-xs">Download</span>
                            </Button>
                          </div>
                        </>
                      ) : error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <XCircle className="h-8 w-8 text-destructive mb-2" />
                          <p className="text-center text-destructive text-sm">{error}</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">No image generated</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Runner Result */}
                  {enhancedPrompt && (
                    <div className="glass-card p-6 rounded-2xl border-secondary/30 glow-purple">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20 glow-purple">
                          <Wand2 className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary">AI Runner</h3>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Enhanced Prompt:</p>
                        <div className="bg-background/50 p-3 rounded-lg border border-secondary/20">
                          <p className="text-sm italic text-foreground">
                            "{renderEnhancedPrompt(enhancedPrompt)}"
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Generated Image */}
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-secondary/20 mb-4">
                        {isGeneratingEnhanced ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Loader2 className="h-12 w-12 text-secondary animate-spin mb-4" />
                            <p className="text-muted-foreground text-sm">Generating enhanced...</p>
                          </div>
                        ) : enhancedImage ? (
                          <>
                            <img
                              src={enhancedImage}
                              alt="AI enhanced result"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute top-2 right-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => downloadImage(enhancedImage, `ai-enhanced-${Date.now()}.png`)}
                                className="bg-background/80 backdrop-blur-sm h-8"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                <span className="text-xs">Download</span>
                              </Button>
                            </div>
                          </>
                        ) : enhancedError ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <XCircle className="h-8 w-8 text-destructive mb-2" />
                            <p className="text-center text-destructive text-sm">{enhancedError}</p>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-muted-foreground text-sm">No image generated</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Feedback Card */}
                <div className="glass-card p-6 rounded-2xl border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    {promptQuality === "good" ? (
                      <>
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-bold text-primary">Great Prompt!</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-destructive" />
                        <h3 className="text-xl font-bold text-destructive">Prompt Needs Improvement</h3>
                      </>
                    )}
                  </div>

                  {feedback && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      promptQuality === "good" 
                        ? "bg-primary/10 border border-primary/30" 
                        : "bg-destructive/10 border border-destructive/30"
                    }`}>
                      <p className="text-foreground">{feedback}</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 border-primary/30 hover:bg-primary/10"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => {
                        setGameState("playing");
                        setShowSettings(false);
                        setTimeout(() => {
                          textareaRef.current?.focus();
                        }, 100);
                      }}
                      className="flex-1 bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30"
                    >
                      Edit Prompt
                    </Button>
                    <Button
                      onClick={showTips}
                      className="flex-1 bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30"
                    >
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Tips
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {gameState === "tips" && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass-card p-8 rounded-2xl border-primary/30 glow-turquoise">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">Prompt Writing Tips</h3>
                  </div>

                  <div className="space-y-8">
                    {/* Good Prompts */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <h4 className="text-xl font-bold text-primary">Effective Prompts</h4>
                      </div>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">Include specific style keywords (photorealistic, cinematic, artistic)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">Describe composition, lighting, and perspective</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">Mention quality indicators (high quality, detailed, 4k, 8k)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">Be specific about subjects, colors, and mood</span>
                        </li>
                      </ul>
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                        <p className="text-sm font-medium mb-2 text-primary">Example:</p>
                        <p className="text-foreground italic text-sm">
                          "{examplePrompts.good[0]}"
                        </p>
                      </div>
                    </div>

                    {/* Bad Prompts */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="h-5 w-5 text-destructive" />
                        <h4 className="text-xl font-bold text-destructive">Weak Prompts</h4>
                      </div>
                      <ul className="space-y-3 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">•</span>
                          <span className="text-foreground">Too vague or generic (e.g., "a picture", "something cool")</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">•</span>
                          <span className="text-foreground">Lacks specific details about style or quality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">•</span>
                          <span className="text-foreground">Too short (less than 5-8 words)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">•</span>
                          <span className="text-foreground">No indication of desired aesthetic or mood</span>
                        </li>
                      </ul>
                      <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
                        <p className="text-sm font-medium mb-2 text-destructive">Example:</p>
                        <p className="text-foreground italic text-sm">
                          "{examplePrompts.bad[0]}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setGameState("playing");
                      setTimeout(() => {
                        textareaRef.current?.focus();
                      }, 100);
                    }}
                    className="mt-8 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground"
                  >
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
              </TabsContent>

              {/* Workflow Builder Tab */}
              <TabsContent value="workflow" className="mt-6">
                <div className="animate-fade-in">
                  <WorkflowBuilder
                    onTemplateGenerate={(template, variables) => {
                      setPrompt(template);
                      setActiveTab("prompt");
                      setGameState("playing");
                      setTimeout(() => {
                        textareaRef.current?.focus();
                      }, 100);
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* What is AI Made Of Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
              <Layers className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">Understanding AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                What is AI Made Of?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the fundamental building blocks that power modern artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Segment 1: Gradient Descent */}
            <div className="group relative">
              <div className="glass-card p-8 rounded-3xl border-primary/20 hover:border-primary/50 transition-all duration-500 hover:glow-turquoise h-full flex flex-col">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 group-hover:scale-110 transition-transform duration-500">
                    <TrendingDown className="h-10 w-10 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-primary transition-colors">
                  Gradient Descent
                </h3>
                <p className="text-sm font-medium text-primary/70 mb-4">
                  The Engine of Learning
                </p>

                {/* Visual Representation */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                  {/* 3D Valley Visualization */}
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    {/* Valley Surface */}
                    <defs>
                      <linearGradient id="valley-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    
                    {/* Valley contours */}
                    <ellipse cx="100" cy="100" rx="80" ry="15" fill="url(#valley-gradient-1)" className="group-hover:opacity-80 transition-opacity" />
                    <ellipse cx="100" cy="90" rx="60" ry="12" fill="url(#valley-gradient-1)" opacity="0.6" className="group-hover:opacity-90 transition-opacity" />
                    <ellipse cx="100" cy="80" rx="40" ry="10" fill="url(#valley-gradient-1)" opacity="0.8" className="group-hover:opacity-100 transition-opacity" />
                    
                    {/* Descent path */}
                    <path
                      d="M 30 50 Q 60 70, 80 85 Q 90 92, 100 95"
                      stroke="rgb(34, 211, 238)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4,4"
                      className="group-hover:stroke-[3] group-hover:opacity-100 opacity-70 transition-all duration-500"
                    />
                    
                    {/* Arrow markers */}
                    <polygon
                      points="95,93 100,95 95,97"
                      fill="rgb(34, 211, 238)"
                      className="group-hover:fill-primary transition-colors"
                    />
                    <polygon
                      points="75,87 80,85 75,83"
                      fill="rgb(34, 211, 238)"
                      className="group-hover:fill-primary transition-colors"
                    />
                    <polygon
                      points="55,73 60,70 55,67"
                      fill="rgb(34, 211, 238)"
                      className="group-hover:fill-primary transition-colors"
                    />
                    
                    {/* Minimum point glow */}
                    <circle
                      cx="100"
                      cy="95"
                      r="4"
                      fill="rgb(34, 211, 238)"
                      className="group-hover:r-[6] group-hover:opacity-100 opacity-70 transition-all duration-500"
                    >
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Imagine a blindfolded hiker trying to reach the bottom of a valley. Every small step downhill brings them closer to the lowest point. That's exactly how Gradient Descent works. It helps AI models learn by minimizing their 'error valley' — adjusting parameters step by step until the system finds the best possible solution. Without it, neural networks wouldn't know how to improve or adapt from mistakes.
                </p>
              </div>
            </div>

            {/* Segment 2: Backpropagation */}
            <div className="group relative">
              <div className="glass-card p-8 rounded-3xl border-secondary/20 hover:border-secondary/50 transition-all duration-500 hover:glow-purple h-full flex flex-col">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl group-hover:bg-secondary/40 transition-all duration-500" />
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 border border-secondary/30 group-hover:scale-110 transition-transform duration-500">
                    <Network className="h-10 w-10 text-secondary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-secondary group-hover:text-secondary transition-colors">
                  Backpropagation
                </h3>
                <p className="text-sm font-medium text-secondary/70 mb-4">
                  The Art of Self-Correction
                </p>

                {/* Visual Representation */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 group-hover:border-secondary/40 transition-all duration-500">
                  {/* Neural Network Visualization */}
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="network-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.4" />
                      </linearGradient>
                      <marker id="arrowhead-2" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="rgb(34, 211, 238)" />
                      </marker>
                    </defs>
                    
                    {/* Input layer nodes */}
                    <circle cx="30" cy="20" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="30" cy="40" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="30" cy="60" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="30" cy="80" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="30" cy="100" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    
                    {/* Hidden layer nodes */}
                    <circle cx="100" cy="30" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="100" cy="50" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="100" cy="70" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="100" cy="90" r="6" fill="rgb(168, 85, 247)" className="group-hover:r-[8] transition-all duration-500" />
                    
                    {/* Output layer nodes */}
                    <circle cx="170" cy="40" r="6" fill="rgb(34, 211, 238)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="170" cy="60" r="6" fill="rgb(34, 211, 238)" className="group-hover:r-[8] transition-all duration-500" />
                    <circle cx="170" cy="80" r="6" fill="rgb(34, 211, 238)" className="group-hover:r-[8] transition-all duration-500" />
                    
                    {/* Connections */}
                    {[20, 40, 60, 80, 100].map((y1, i) => 
                      [30, 50, 70, 90].map((y2, j) => (
                        <line
                          key={`${i}-${j}`}
                          x1="36"
                          y1={y1}
                          x2="94"
                          y2={y2}
                          stroke="url(#network-gradient-2)"
                          strokeWidth="1"
                          className="group-hover:stroke-[2] group-hover:opacity-100 opacity-40 transition-all duration-500"
                        />
                      ))
                    )}
                    {[30, 50, 70, 90].map((y1, i) => 
                      [40, 60, 80].map((y2, j) => (
                        <line
                          key={`${i}-${j}`}
                          x1="106"
                          y1={y1}
                          x2="164"
                          y2={y2}
                          stroke="url(#network-gradient-2)"
                          strokeWidth="1"
                          className="group-hover:stroke-[2] group-hover:opacity-100 opacity-40 transition-all duration-500"
                        />
                      ))
                    )}
                    
                    {/* Backpropagation arrow */}
                    <path
                      d="M 170 60 L 100 60 L 30 60"
                      stroke="rgb(34, 211, 238)"
                      strokeWidth="3"
                      fill="none"
                      markerEnd="url(#arrowhead-2)"
                      className="group-hover:stroke-[4] group-hover:opacity-100 opacity-70 transition-all duration-500"
                    />
                  </svg>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Once the AI predicts something, Backpropagation kicks in to tell it how wrong it was. It sends error signals backward through the network, adjusting the internal weights. This continuous feedback loop – predict, compare, correct – is what gives neural networks their intelligence. It's like the human brain learning from feedback and refining its understanding over time.
                </p>
              </div>
            </div>

            {/* Segment 3: Transformers */}
            <div className="group relative">
              <div className="glass-card p-8 rounded-3xl border-accent/20 hover:border-accent/50 transition-all duration-500 hover:glow-accent h-full flex flex-col">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-all duration-500" />
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border border-accent/30 group-hover:scale-110 transition-transform duration-500">
                    <Layers className="h-10 w-10 text-accent" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-accent group-hover:text-accent transition-colors">
                  Transformers
                </h3>
                <p className="text-sm font-medium text-accent/70 mb-4">
                  The Architecture That Changed Everything
                </p>

                {/* Visual Representation */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 group-hover:border-accent/40 transition-all duration-500">
                  {/* Transformer Architecture Visualization */}
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="transformer-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(251, 191, 36)" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    
                    {/* Encoder stack (right) */}
                    <rect x="120" y="10" width="60" height="100" rx="4" fill="url(#transformer-gradient-3)" stroke="rgb(34, 211, 238)" strokeWidth="2" className="group-hover:stroke-[3] transition-all duration-500" />
                    <text x="150" y="25" textAnchor="middle" fill="rgb(34, 211, 238)" fontSize="8" fontWeight="bold" className="group-hover:fill-primary transition-colors">Encoder</text>
                    
                    {/* Encoder blocks */}
                    <rect x="125" y="30" width="50" height="12" rx="2" fill="rgb(34, 211, 238)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <rect x="125" y="45" width="50" height="12" rx="2" fill="rgb(34, 211, 238)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <rect x="125" y="60" width="50" height="12" rx="2" fill="rgb(34, 211, 238)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <text x="150" y="70" textAnchor="middle" fill="rgb(34, 211, 238)" fontSize="6" className="group-hover:fill-primary transition-colors">Nx</text>
                    
                    {/* Decoder stack (left) */}
                    <rect x="20" y="10" width="60" height="100" rx="4" fill="url(#transformer-gradient-3)" stroke="rgb(168, 85, 247)" strokeWidth="2" className="group-hover:stroke-[3] transition-all duration-500" />
                    <text x="50" y="25" textAnchor="middle" fill="rgb(168, 85, 247)" fontSize="8" fontWeight="bold" className="group-hover:fill-secondary transition-colors">Decoder</text>
                    
                    {/* Decoder blocks */}
                    <rect x="25" y="30" width="50" height="10" rx="2" fill="rgb(168, 85, 247)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <rect x="25" y="45" width="50" height="10" rx="2" fill="rgb(168, 85, 247)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <rect x="25" y="60" width="50" height="10" rx="2" fill="rgb(168, 85, 247)" opacity="0.3" className="group-hover:opacity-50 transition-opacity" />
                    <text x="50" y="70" textAnchor="middle" fill="rgb(168, 85, 247)" fontSize="6" className="group-hover:fill-secondary transition-colors">Nx</text>
                    
                    {/* Attention mechanism (connection) */}
                    <path
                      d="M 85 60 Q 100 50, 115 60"
                      stroke="rgb(251, 191, 36)"
                      strokeWidth="2"
                      fill="none"
                      className="group-hover:stroke-[3] group-hover:opacity-100 opacity-70 transition-all duration-500"
                    />
                    <circle cx="100" cy="50" r="3" fill="rgb(251, 191, 36)" className="group-hover:r-[5] transition-all duration-500">
                      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Input/Output labels */}
                    <text x="50" y="95" textAnchor="middle" fill="rgb(168, 85, 247)" fontSize="7" className="group-hover:fill-secondary transition-colors">Input</text>
                    <text x="150" y="95" textAnchor="middle" fill="rgb(34, 211, 238)" fontSize="7" className="group-hover:fill-primary transition-colors">Output</text>
                  </svg>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  Transformers are the foundational architecture behind modern AI models such as ChatGPT, Gemini, and Claude. A key innovation is their ability to process "the whole sentence at once," in contrast to older models that processed words one by one. This is achieved through "attention mechanisms" which allow the model to understand the relationships between words. This capability enables AI to "grasp meaning, context, and nuance." This single innovation triggered the modern AI revolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why These 3 Matter Together: The Human-AI Synergy */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">Human-AI Synergy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Why These 3 Matter Together
              </span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-muted-foreground">
              <p className="text-xl font-semibold text-foreground mb-4">
                AI isn't magic. It's math, optimization, and a touch of human genius.
              </p>
              <p>
                <span className="text-primary font-medium">Gradient Descent</span>, guided by human-designed objectives, teaches the model how to learn.
              </p>
              <p>
                <span className="text-secondary font-medium">Backpropagation</span>, refined by human insights, teaches it how to correct itself.
              </p>
              <p>
                <span className="text-accent font-medium">Transformers</span>, conceptualized by human ingenuity, teach it how to think contextually.
              </p>
              <p className="pt-4 text-foreground font-medium">
                Together, these human-driven innovations turned mathematical equations into intelligent systems that can write, code, translate, and even reason. Yet, these powerful tools are nothing without human intervention – they are designed, trained, and applied by us, forming the true foundation of today's AI boom and its future potential.
              </p>
            </div>
          </div>

          {/* Orbiting Animation */}
          <div className="relative w-full h-[500px] flex items-center justify-center mb-12">
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">
              {/* Central glowing core */}
              <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-xl animate-pulse-glow" />
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 border-2 border-primary/50 animate-pulse-glow" />
              
              {/* Orbiting Brain (Human Intelligence) */}
              <div className="absolute inset-0 flex items-center justify-center animate-orbit-brain">
                <div className="absolute w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center glow-turquoise backdrop-blur-sm group hover:scale-110 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
              </div>

              {/* Orbiting Heart (Human Emotion/Empathy) */}
              <div className="absolute inset-0 flex items-center justify-center animate-orbit-heart">
                <div className="absolute w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center glow-purple backdrop-blur-sm group hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-secondary fill-secondary/30" />
                </div>
              </div>

              {/* Orbiting CPU (AI Core) */}
              <div className="absolute inset-0 flex items-center justify-center animate-orbit-cpu">
                <div className="absolute w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center glow-accent backdrop-blur-sm group hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-10 h-10 text-accent" />
                </div>
              </div>

              {/* Connecting lines (subtle) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="url(#orbit-gradient)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <defs>
                  <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(251, 191, 36)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Additional Insight */}
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="glass-card p-8 rounded-3xl border-primary/20 hover:border-primary/40 transition-all duration-500">
              <p className="text-lg text-foreground leading-relaxed">
                <span className="text-primary font-bold">Remember:</span> Every algorithm, every model, every breakthrough in AI exists because of human creativity, human curiosity, and human determination. AI amplifies human potential, but it cannot replace the fundamental human qualities that make intelligence meaningful – empathy, ethics, and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cutting Edge AI Tools - Standalone Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Enhanced Background Effects for Separation */}
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[200px] translate-x-1/2" />
        
        {/* Separator Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Standalone Card with Special Effects */}
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 animate-pulse-glow" />
              
              <div className="relative glass-card p-12 rounded-3xl border-2 border-primary/40 hover:border-primary/60 transition-all duration-500 hover:glow-turquoise group">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/40 mb-8 glow-turquoise animate-pulse-glow">
                    <Sparkles className="h-5 w-5 text-primary mr-2 animate-pulse" />
                    <span className="text-sm font-bold text-foreground tracking-wide">CUTTING EDGE TOOLS</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
                      Cutting Edge AI Tools
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                    Explore the most advanced AI tools and professional editing software powering the future of creative production
                  </p>
                  
                  {/* Special Animated EXPLORE Button */}
                  <div className="relative inline-block">
                    {/* Pulsing Ring Indicator */}
                    <div className="absolute -inset-4">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-0 rounded-full border-2 border-secondary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                      <div className="absolute inset-0 rounded-full border-2 border-accent/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
                    </div>
                    
                    <Button
                      onClick={() => setShowToolsSection(!showToolsSection)}
                      className="relative bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground px-12 py-8 text-xl font-bold shadow-2xl glow-turquoise hover:scale-105 transition-all duration-300 group/btn overflow-hidden"
                      size="lg"
                    >
                      {/* Animated Background Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        {showToolsSection ? "HIDE TOOLS" : "EXPLORE"}
                        <ChevronDown className={`h-6 w-6 transition-all duration-300 ${showToolsSection ? "rotate-180" : "animate-bounce"}`} />
                      </span>
                      
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                    </Button>
                  </div>
                </div>

                {/* Expandable Content with Animation */}
                {showToolsSection && (
                  <div className="mt-12 space-y-16 animate-fade-in">
                    {/* AI Tools Section */}
                    <div>
                      <h3 className="text-3xl font-bold mb-8 text-primary flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/40">
                          <Zap className="h-7 w-7 text-primary" />
                        </div>
                        AI Tools
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[
                          { name: "Leonardo.ai", url: "https://leonardo.ai/", logo: "https://logo.clearbit.com/leonardo.ai" },
                          { name: "Midjourney", url: "https://www.midjourney.com/", logo: "https://logo.clearbit.com/midjourney.com" },
                          { name: "Runway", url: "https://runwayml.com/", logo: "https://logo.clearbit.com/runwayml.com" },
                          { name: "ChatGPT", url: "https://chat.openai.com/", logo: "https://logo.clearbit.com/openai.com" },
                          { name: "Sora", url: "https://openai.com/sora", logo: "https://logo.clearbit.com/openai.com" },
                          { name: "Veo", url: "https://deepmind.google/technologies/veo/", logo: "https://logo.clearbit.com/deepmind.com" },
                          { name: "Narakeet", url: "https://www.narakeet.com/", logo: "https://logo.clearbit.com/narakeet.com" },
                          { name: "Play.ai", url: "https://play.ai/", logo: "https://logo.clearbit.com/play.ai" },
                          { name: "VocalRemover", url: "https://vocalremover.org/", logo: "https://logo.clearbit.com/vocalremover.org" },
                          { name: "Lovable", url: "https://lovable.dev/", logo: "https://logo.clearbit.com/lovable.dev" },
                          { name: "Bolt", url: "https://www.bolt.com/", logo: "https://logo.clearbit.com/bolt.com" },
                          { name: "Builder.io", url: "https://www.builder.io/", logo: "https://logo.clearbit.com/builder.io" },
                          { name: "Cursor", url: "https://www.cursor.so/", logo: "https://logo.clearbit.com/cursor.so" },
                          { name: "OpenRouter", url: "https://openrouter.ai/", logo: "https://logo.clearbit.com/openrouter.ai" },
                          { name: "Synthesia", url: "https://www.synthesia.io/", logo: "https://logo.clearbit.com/synthesia.io" },
                          { name: "BrainyBear", url: "https://brainybear.io/", logo: "https://logo.clearbit.com/brainybear.io" },
                          { name: "n8n", url: "https://n8n.io/", logo: "https://logo.clearbit.com/n8n.io" },
                          { name: "Nano Banana", url: "https://nanobanana.com/", logo: "https://logo.clearbit.com/nanobanana.com" },
                        ].map((tool, index) => (
                          <a
                            key={index}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-5 rounded-xl border-primary/30 hover:border-primary/60 transition-all duration-300 hover:glow-turquoise hover:scale-105 group flex items-center gap-4"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <div className="w-14 h-14 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                              {logoErrors.has(tool.name) ? (
                                <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                                  <span className="text-primary text-sm font-bold">{tool.name.charAt(0)}</span>
                                </div>
                              ) : (
                                <img
                                  src={tool.logo}
                                  alt={`${tool.name} logo`}
                                  className="w-10 h-10 object-contain"
                                  onError={() => setLogoErrors(prev => new Set(prev).add(tool.name))}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                {tool.name}
                              </h4>
                            </div>
                            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Editing Software Section */}
                    <div>
                      <h3 className="text-3xl font-bold mb-8 text-secondary flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/20 border border-secondary/40">
                          <Settings className="h-7 w-7 text-secondary" />
                        </div>
                        Editing Software
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                          { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", logo: "https://logo.clearbit.com/blackmagicdesign.com" },
                          { name: "OBS Studio", url: "https://obsproject.com/", logo: "https://logo.clearbit.com/obsproject.com" },
                          { name: "Adobe Photoshop", url: "https://www.adobe.com/products/photoshop.html", logo: "https://logo.clearbit.com/adobe.com" },
                          { name: "Microsoft PowerPoint", url: "https://www.microsoft.com/en-us/microsoft-365/powerpoint", logo: "https://logo.clearbit.com/microsoft.com" },
                          { name: "Figma", url: "https://www.figma.com/", logo: "https://logo.clearbit.com/figma.com" },
                          { name: "Visual Studio Code", url: "https://code.visualstudio.com/", logo: "https://logo.clearbit.com/visualstudio.com" },
                        ].map((software, index) => (
                          <a
                            key={index}
                            href={software.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-5 rounded-xl border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:glow-purple hover:scale-105 group flex items-center gap-4"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <div className="w-14 h-14 rounded-lg bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                              {logoErrors.has(software.name) ? (
                                <div className="w-10 h-10 rounded bg-secondary/20 flex items-center justify-center">
                                  <span className="text-secondary text-sm font-bold">{software.name.charAt(0)}</span>
                                </div>
                              ) : (
                                <img
                                  src={software.logo}
                                  alt={`${software.name} logo`}
                                  className="w-10 h-10 object-contain"
                                  onError={() => setLogoErrors(prev => new Set(prev).add(software.name))}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-foreground group-hover:text-secondary transition-colors truncate">
                                {software.name}
                              </h4>
                            </div>
                            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-secondary group-hover:scale-110 transition-all flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Separator Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>

      <Footer />
    </div>
  );
};

export default PromptTesting;

