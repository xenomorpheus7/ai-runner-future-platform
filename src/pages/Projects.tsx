import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./Projects.module.css";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";

const projects = [
  {
    id: 1,
    title: `VR/ANA - AI Generated Trailer`,
    description: "A visual showcase of an AI-generated example from 2022 when Stable Diffusion was at its 1st peak.",
    type: "video",
    src: "https://www.youtube.com/embed/v-IgV3Pxg64?autoplay=0&mute=1&playsinline=1&rel=0",
  },
  {
    id: 2,
    title: `Human Intervention is Key`,
    description: "From Leonardo to Davinci, humans are still the best at creating art.",
    type: "image",
    src: gallery1,
  },
  {
    id: 3,
    title: `AI Mirror Project for AI Runners`,
    description: "Character Consistency with Editing.",
    type: "image",
    src: gallery2,
  },
  {
    id: 4,
    title: `Advanced AI Generation`,
    description: "A visual showcase of an AI-generated example or concept.",
    type: "image",
    src: gallery3,
  },
  {
    id: 5,
    title: `50% Faster Development`,
    description: "AI RUNNER 2033 Website was made with Microsoft Copilot in VS Code.",
    type: "image",
    src: gallery4,
  },
  {
    id: 6,
    title: `Future of AI Design`,
    description: "A visual showcase of AI-powered design capabilities.",
    type: "image",
    src: gallery5,
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const autoScrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      // Measure the actual width of the first set dynamically
      const gallery = container.querySelector(`.${styles.gallery}`) as HTMLElement;
      if (!gallery) return;

      // Get the position of the first item of the second set (which is where first set ends)
      const children = gallery.children;
      if (children.length < projects.length * 2) return;

      // Find the position where the second set starts - this is the width of the first set
      const firstSetEndElement = children[projects.length] as HTMLElement;
      if (!firstSetEndElement) return;

      // Calculate first set width dynamically from actual DOM measurements
      const getFirstSetWidth = (): number => {
        // Try to get the actual position where second set starts
        const secondSetStart = firstSetEndElement.offsetLeft;
        if (secondSetStart > 0) {
          return secondSetStart;
        }
        
        // Fallback: calculate from item dimensions
        const firstItem = children[0] as HTMLElement;
        if (firstItem) {
          const itemWidth = firstItem.offsetWidth;
          const computedStyle = window.getComputedStyle(gallery);
          const gapValue = computedStyle.gap;
          const gap = gapValue ? parseFloat(gapValue) : 32;
          return projects.length * (itemWidth + gap);
        }
        // Final fallback with default values
        return projects.length * (320 + 32);
      };

      // Use a ref to store the width so it can be recalculated if needed
      let firstSetWidth = getFirstSetWidth();
      
      // If measurement failed, wait a bit and recalculate
      if (firstSetWidth <= 0 || firstSetWidth === projects.length * (320 + 32)) {
        // DOM might not be fully laid out yet, wait and recalculate
        setTimeout(() => {
          firstSetWidth = getFirstSetWidth();
        }, 100);
        
        // Start with a fallback value anyway
        firstSetWidth = getFirstSetWidth();
      }
      
      autoScrollIntervalRef.current = window.setInterval(() => {
        if (!isPausedRef.current && container) {
          // Recalculate width dynamically to handle resize or layout changes
          const currentFirstSetWidth = getFirstSetWidth();
          
          if (currentFirstSetWidth <= 0) return; // Skip if width not calculated yet
          
          const scrollLeft = container.scrollLeft;
          
          // Check if we've reached or passed the end of the first set
          // We check if we're at or very close to the end (within 1px threshold)
          if (scrollLeft >= currentFirstSetWidth - 1) {
            // Temporarily remove smooth scrolling to make jump instant
            const originalScrollBehavior = container.style.scrollBehavior || '';
            container.style.scrollBehavior = 'auto';
            
            // Calculate the new scroll position (equivalent position in first set)
            const newScrollLeft = scrollLeft - currentFirstSetWidth;
            
            // Jump instantly without animation
            container.scrollLeft = newScrollLeft;
            
            // Immediately restore smooth scrolling after the jump completes
            // Use a microtask to ensure the jump happens first
            Promise.resolve().then(() => {
              if (container) {
                container.style.scrollBehavior = originalScrollBehavior;
              }
            });
          } else {
            // Normal scrolling - increment by 1px
            container.scrollLeft += 1;
          }
        }
      }, 50); // Update every 50ms for smooth scrolling
    };

    // Wait for DOM to be fully rendered before starting
    const timeoutId = setTimeout(() => {
      startAutoScroll();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section (match Courses styling) */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("projects.title")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("projects.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Video Side */}
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/30 shadow-lg hover:border-primary/50 transition-all duration-300 hover:glow-turquoise relative">
              <div className="aspect-video bg-muted relative">
                <iframe
                  className="w-full h-full pointer-events-none"
                  src="https://www.youtube.com/embed/sY01rd5B46o?autoplay=0&mute=1&playsinline=1&rel=0"
                  title="Featured AI Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Clickable overlay that redirects to register */}
                <button
                  onClick={() => navigate("/register")}
                  className="absolute inset-0 w-full h-full cursor-pointer z-10 bg-transparent hover:bg-primary/5 transition-colors"
                  aria-label="Register to watch video"
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("projects.experienceFuture")}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("projects.experienceDesc")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary">{t("projects.realtimeGeneration")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
                  <span className="text-secondary">{t("projects.highFidelity")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent">{t("projects.seamlessIntegration")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Interactive Horizontal Gallery */}
          <div className="relative w-full py-8 select-none">
            <div 
              className={styles.scrollContainer}
              ref={(el) => {
                if (!el) {
                  scrollContainerRef.current = null;
                  return;
                }
                scrollContainerRef.current = el;
                
                let isDown = false;
                let startX: number;
                let scrollLeft: number;
                let lastPageX: number;
                let velocity = 0;
                let momentumId: number;

                const handleMouseDown = (e: MouseEvent) => {
                  isDown = true;
                  isPausedRef.current = true; // Pause auto-scroll on drag
                  el.classList.add(styles.grabbing);
                  startX = e.pageX - el.offsetLeft;
                  scrollLeft = el.scrollLeft;
                  lastPageX = e.pageX;
                  
                  // Cancel any ongoing momentum
                  if (momentumId) {
                    cancelAnimationFrame(momentumId);
                  }
                };

                const handleMouseMove = (e: MouseEvent) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - el.offsetLeft;
                  const walk = (x - startX);
                  el.scrollLeft = scrollLeft - walk;
                  
                  // Calculate velocity for momentum
                  velocity = lastPageX - e.pageX;
                  lastPageX = e.pageX;
                };

                const handleMouseUp = () => {
                  isDown = false;
                  el.classList.remove(styles.grabbing);
                  
                  // Resume auto-scroll after a delay
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 2000);
                  
                  // Apply momentum
                  const momentum = () => {
                    if (Math.abs(velocity) < 0.5) return;
                    el.scrollLeft += velocity * 0.95;
                    velocity *= 0.95;
                    momentumId = requestAnimationFrame(momentum);
                  };
                  momentum();
                };

                const handleMouseLeave = () => {
                  isDown = false;
                  el.classList.remove(styles.grabbing);
                  // Resume auto-scroll when mouse leaves
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 1000);
                };

                const handleMouseEnter = () => {
                  isPausedRef.current = true; // Pause on hover
                };

                el.addEventListener('mousedown', handleMouseDown);
                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseup', handleMouseUp);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter);

                // Touch events
                el.addEventListener('touchstart', (e) => {
                  isDown = true;
                  isPausedRef.current = true; // Pause auto-scroll on touch
                  el.classList.add(styles.grabbing);
                  startX = e.touches[0].pageX - el.offsetLeft;
                  scrollLeft = el.scrollLeft;
                  lastPageX = e.touches[0].pageX;
                });

                el.addEventListener('touchmove', (e) => {
                  if (!isDown) return;
                  const x = e.touches[0].pageX - el.offsetLeft;
                  const walk = (x - startX);
                  el.scrollLeft = scrollLeft - walk;
                  
                  velocity = lastPageX - e.touches[0].pageX;
                  lastPageX = e.touches[0].pageX;
                });

                el.addEventListener('touchend', () => {
                  handleMouseUp();
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 2000);
                });
              }}
            >
              <div className={styles.gallery}>
                {/* Render items twice for seamless loop */}
                {[...projects, ...projects].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="relative flex-shrink-0 w-80 border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 group flex flex-col bg-card"
                  >
                    {item.type === "video" ? (
                      <div className="relative w-full aspect-video bg-muted flex-shrink-0">
                        <iframe
                          className="w-full h-full absolute inset-0 pointer-events-none"
                          src={item.src}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        {/* Clickable overlay that redirects to register */}
                        <button
                          onClick={() => navigate("/register")}
                          className="absolute inset-0 w-full h-full cursor-pointer z-10 bg-transparent hover:bg-primary/5 transition-colors"
                          aria-label="Register to watch video"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error(`Failed to load image: ${item.src}`);
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                          onLoad={() => {
                            console.log(`Successfully loaded image: ${item.title}`);
                          }}
                        />
                      </div>
                    )}
                    <div className="p-4 text-left flex-shrink-0">
                      <h2 className="text-lg font-semibold mb-2 text-neon-turquoise">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

