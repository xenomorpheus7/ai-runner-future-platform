import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Rocket, Zap, Crown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PathSelectionModalProps {
  onPathSelect?: (path: "beginner" | "intermediate" | "advanced") => void;
}

const PathSelectionModal = ({ onPathSelect }: PathSelectionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<"beginner" | "intermediate" | "advanced" | null>(null);

  useEffect(() => {
    // Check if user has already selected a path
    const hasSelectedPath = localStorage.getItem("userPathSelected");
    if (hasSelectedPath) {
      return; // Don't show modal if path already selected
    }

    // Show modal 15 seconds after page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handlePathSelect = (path: "beginner" | "intermediate" | "advanced") => {
    setSelectedPath(path);
    // Store selection in localStorage
    localStorage.setItem("userPathSelected", path);
    // Close modal after a brief delay to show selection
    setTimeout(() => {
      setIsOpen(false);
      onPathSelect?.(path);
    }, 300);
  };

  const paths = [
    {
      id: "beginner" as const,
      title: "Beginner",
      description: "Start your AI journey with foundational concepts and hands-on basics",
      icon: Rocket,
      color: "accent",
      glowClass: "glow-blue",
      borderClass: "border-accent/50",
      bgClass: "bg-accent/10",
      hoverClass: "hover:border-accent hover:glow-blue",
    },
    {
      id: "intermediate" as const,
      title: "Intermediate",
      description: "Level up your skills with advanced techniques and real-world projects",
      icon: Zap,
      color: "primary",
      glowClass: "glow-turquoise",
      borderClass: "border-primary/50",
      bgClass: "bg-primary/10",
      hoverClass: "hover:border-primary hover:glow-turquoise",
    },
    {
      id: "advanced" as const,
      title: "Advanced",
      description: "Master cutting-edge AI tools and become an expert in the field",
      icon: Crown,
      color: "secondary",
      glowClass: "glow-purple",
      borderClass: "border-secondary/50",
      bgClass: "bg-secondary/10",
      hoverClass: "hover:border-secondary hover:glow-purple",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Only allow closing if a path is selected
      if (!open && !selectedPath) {
        return;
      }
      setIsOpen(open);
    }}>
      <DialogContent 
        className="glass-card border-primary/30 p-0 max-w-4xl w-[95vw] sm:w-full overflow-hidden backdrop-blur-md [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-x-1/2" />

        <div className="relative z-10 p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
              <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Choose Your Path</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Define your future by choosing your path.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your experience level to get personalized content and recommendations
            </p>
          </div>

          {/* Path Cards */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {paths.map((path) => {
              const Icon = path.icon;
              const isSelected = selectedPath === path.id;

              return (
                <button
                  key={path.id}
                  onClick={() => handlePathSelect(path.id)}
                  className={cn(
                    "glass-card p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 text-left group relative overflow-hidden",
                    path.borderClass,
                    path.hoverClass,
                    "hover:scale-105 active:scale-100",
                    isSelected && `${path.glowClass} scale-105 border-opacity-100`
                  )}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      path.bgClass
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with Animation */}
                    <div className="relative mb-6">
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300",
                          path.bgClass
                        )}
                      />
                      <div
                        className={cn(
                          "relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 transition-all duration-300 group-hover:scale-110",
                          path.borderClass,
                          path.bgClass
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300",
                            path.color === "accent" && "text-accent",
                            path.color === "primary" && "text-primary",
                            path.color === "secondary" && "text-secondary",
                            "animate-pulse"
                          )}
                          style={{ animationDuration: "2s" }}
                        />
                        {/* Looping Animation Ring - Continuous subtle rotation */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-full border-2 opacity-20 animate-spin",
                            path.color === "accent" && "border-accent",
                            path.color === "primary" && "border-primary",
                            path.color === "secondary" && "border-secondary",
                            "group-hover:opacity-60"
                          )}
                          style={{ animationDuration: "4s" }}
                        />
                        {/* Secondary rotating ring for depth */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-full border opacity-10 animate-spin",
                            path.color === "accent" && "border-accent",
                            path.color === "primary" && "border-primary",
                            path.color === "secondary" && "border-secondary",
                            "group-hover:opacity-30"
                          )}
                          style={{ animationDuration: "6s", animationDirection: "reverse" }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300",
                        path.color === "accent" && "text-accent group-hover:text-accent",
                        path.color === "primary" && "text-primary group-hover:text-primary",
                        path.color === "secondary" && "text-secondary group-hover:text-secondary"
                      )}
                    >
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {path.description}
                    </p>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2
                          className={cn(
                            "h-6 w-6 animate-in fade-in zoom-in duration-200",
                            path.color === "accent" && "text-accent",
                            path.color === "primary" && "text-primary",
                            path.color === "secondary" && "text-secondary"
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl",
                      path.color === "accent" && "bg-accent/30",
                      path.color === "primary" && "bg-primary/30",
                      path.color === "secondary" && "bg-secondary/30"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PathSelectionModal;

