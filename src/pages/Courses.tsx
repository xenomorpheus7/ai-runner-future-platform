import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight, Zap, Sparkles, Settings, ChevronDown, ExternalLink, TrendingDown, Network, Layers, Brain, Heart, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import course1 from "@/assets/course1.jpg";
import course2 from "@/assets/course2.jpg";
import course3 from "@/assets/course3.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";

const Courses = () => {
  const { t } = useLanguage();
  const [showToolsSection, setShowToolsSection] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());
  const courses = [
    {
      id: 1,
      title: "Gen-AI IRL",
      description: "Master the foundations of generative artificial intelligence and recognize it in our daily lives.",
      image: course1,
      duration: "1hr35mins",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Mastering Text-to-Image",
      description: "Be fluent in prompting, fine-tuning models, and creating stunning AI-generated art and images.",
      image: course2,
      duration: "4hr20mins",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Storytelling with AI",
      description: "Explore how to craft compelling creative content using AI tools. From writing to video production.",
      image: course3,
      duration: "1-3 weeks",
      level: "Advanced",
    },
    {
      id: 4,
      title: "AI Visualization Techniques",
      description: "Learn advanced techniques for creating stunning visualizations and designs using AI-powered tools and workflows.",
      image: gallery1,
      duration: "2hr45mins",
      level: "Intermediate",
    },
    {
      id: 5,
      title: "Advanced AI Workflows",
      description: "Master complex AI workflows and automation techniques to streamline your creative and professional processes.",
      image: gallery2,
      duration: "3hr20mins",
      level: "Advanced",
    },
    {
      id: 6,
      title: "AI Content Creation Mastery",
      description: "Discover the secrets of professional AI content creation, from ideation to final production and delivery.",
      image: gallery3,
      duration: "2hr15mins",
      level: "Intermediate",
    },
  ];

  const getLevelColor = (level: string) => {
    const levelKey = level.toLowerCase();
    switch (levelKey) {
      case "beginner":
      case "začetni level":
        return "text-accent border-accent/50";
      case "intermediate":
      case "srednji level":
        return "text-primary border-primary/50";
      case "advanced":
      case "napredni level":
        return "text-secondary border-secondary/50";
      default:
        return "text-foreground border-border";
    }
  };

  const getTranslatedLevel = (level: string) => {
    switch (level) {
      case "Beginner":
        return t("courses.beginner");
      case "Intermediate":
        return t("courses.intermediate");
      case "Advanced":
        return t("courses.advanced");
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("courses.titlePart1")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("courses.titlePart2")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("courses.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:glow-turquoise group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Course Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Level Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border backdrop-blur-md ${getLevelColor(course.level)}`}>
                    <span className="text-sm font-medium">{getTranslatedLevel(course.level)}</span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/course/${course.id}`}>
                    <Button 
                      className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30 group/btn transition-all duration-300"
                      variant="outline"
                    >
                      {t("courses.viewCourse")}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cutting Edge AI Tools Section */}
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
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 animate-pulse" />
              
              <div className="relative glass-card p-12 rounded-3xl border-2 border-primary/40 hover:border-primary/60 transition-all duration-500 hover:glow-turquoise group">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/40 mb-8 glow-turquoise animate-pulse">
                    <Sparkles className="h-5 w-5 text-primary mr-2 animate-pulse" />
                    <span className="text-sm font-bold text-foreground tracking-wide">AI Tools & Software</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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
              <div className="glass-card p-8 rounded-3xl border-accent/20 hover:border-accent/50 transition-all duration-500 hover:glow-turquoise h-full flex flex-col">
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

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-primary/30 glow-turquoise">
            <h2 className="text-4xl font-bold mb-4">
              {t("courses.ctaTitle")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("courses.ctaDescription")}
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground"
              >
                {t("courses.contactUs")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
