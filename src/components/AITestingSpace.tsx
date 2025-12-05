import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Lightbulb, CheckCircle2, XCircle, Loader2, ArrowRight, Settings, X, Download, Copy, Wand2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type GameState = "intro" | "playing" | "result" | "tips";
type PromptQuality = "good" | "bad" | null;

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

const AITestingSpace = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [gameState, setGameState] = useState<GameState>("intro");
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

  // Settings state
  const [settings, setSettings] = useState<GenerationSettings>({
    negativePrompt: "blurry, low quality, distorted, ugly, bad anatomy, watermark, signature",
    guidanceScale: 7.5,
    numInferenceSteps: 20,
    width: 1344,
    height: 768,
    aspectRatio: "16:9",
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
    setGameState("intro");
    setPromptQuality(null);
    setGeneratedImage(null);
    setEnhancedImage(null);
    setEnhancedPrompt(null);
    setFeedback("");
    setHint("");
    setError(null);
    setEnhancedError(null);
  };

  const startGame = () => {
    setGameState("playing");
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
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card p-8 md:p-10 rounded-3xl border-primary/40 glow-turquoise relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-40 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/40 mb-4">
                  <Wand2 className="h-4 w-4 text-primary mr-2" />
                  <span className="text-xs font-medium tracking-wider uppercase">New Lab Mode</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Reverse Engineer AI Content
                </h3>
                <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                  Drop in an image, video, article or website URL and let the lab reconstruct the hidden prompt, style blueprint and tech stack behind it.
                </p>
              </div>
              <div className="flex flex-col items-stretch gap-3 w-full md:w-auto md:min-w-[220px]">
                <Button
                  size="lg"
                  onClick={() => navigate("/reverse-ai")}
                  className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground glow-turquoise text-base font-semibold tracking-wide"
                >
                  REVERSE AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-muted-foreground text-center md:text-left">
                  Glowing placeholder – full reverse-engineering model coming online soon.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/30 blur-3xl animate-pulse" />
            <div className="absolute -top-10 -left-8 w-32 h-32 rounded-full bg-accent/30 blur-3xl animate-[ping_3s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {gameState === "intro" && (
            <div className="glass-card p-12 rounded-3xl border-primary/30 glow-turquoise text-center animate-fade-in">
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
                  navigate("/prompt-testing");
                  // Ensure scroll to top after navigation
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300"
              >
                Start Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

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
                      <h3 className="text-lg font-bold flex items-center gap-2">
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
                        <Label htmlFor="negative-prompt" className="text-sm font-medium mb-2 block">
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
                        <Label className="text-sm font-medium mb-2 block">Aspect Ratio</Label>
                        <Select
                          value={settings.aspectRatio}
                          onValueChange={(value) => setSettings({ ...settings, aspectRatio: value })}
                        >
                          <SelectTrigger className="bg-background/50 border-primary/30">
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
                        <Label className="text-sm font-medium mb-2 block">
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
                        <Label className="text-sm font-medium mb-2 block">
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
                          <Label className="text-sm font-medium mb-2 block">Width</Label>
                          <Input
                            type="number"
                            value={settings.width}
                            onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) || 1024 })}
                            className="bg-background/50 border-primary/30"
                            min={256}
                            max={2048}
                            step={64}
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-medium mb-2 block">Height</Label>
                          <Input
                            type="number"
                            value={settings.height}
                            onChange={(e) => setSettings({ ...settings, height: parseInt(e.target.value) || 1024 })}
                            className="bg-background/50 border-primary/30"
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
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
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

                {/* AI Enhanced Result */}
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
                        <p className="text-sm italic">
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
                  <h3 className="text-2xl font-bold">Prompt Writing Tips</h3>
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
                  onClick={startGame}
                  className="mt-8 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground"
                >
                  Try It Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AITestingSpace;
