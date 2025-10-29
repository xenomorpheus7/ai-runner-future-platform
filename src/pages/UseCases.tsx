import React from "react";
import styles from "./UseCases.module.css";

const useCases = Array.from({ length: 38 }, (_, i) => {
  const id = i + 1;
  // Embed videos for the first two placeholders
  if (id === 1)
    return {
      id,
      title: `VR/ANA - AI Generated Trailer`,
      description: "A visual showcase of an AI-generated example from 2022 when Stable Diffusion was at its 1st peak.",
      videoId: "v-IgV3Pxg64",
    };
  if (id === 2)
    return {
      id,
      title: `NOORDUNG - Short AI Generated Movie`,
      description: "Exhibit-A from 2025 with SORA models pushing creative boundaries. How does 2033 look to you now?",
      videoId: "sY01rd5B46o",
    };

  return {
    id,
    title: ` #${id}`,
    description: "A visual showcase of an AI-generated example or concept.",
    image: `/assets/usecase${id}.png`, // Replace with your image paths
  };
});

export default function UseCases() {
  return (
    <div className="min-h-screen">
      {/* Hero Section (match Courses styling) */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Use Cases
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore how AI Runner 2033 transforms ideas into futuristic
              visuals.
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
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/30 shadow-lg hover:border-primary/50 transition-all duration-300 hover:glow-turquoise">
              <div className="aspect-video bg-muted">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/sY01rd5B46o?autoplay=0&mute=1&playsinline=1&rel=0"
                  title="Featured AI Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Experience the Future
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Witness groundbreaking AI-generated content that pushes the boundaries
                of digital creativity. From concept to execution, see how AI Runner 2033
                is revolutionizing visual storytelling.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary">Real-time Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
                  <span className="text-secondary">High-fidelity Output</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1 w-1 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent">Seamless Integration</span>
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
                if (!el) return;
                
                let isDown = false;
                let startX: number;
                let scrollLeft: number;
                let lastPageX: number;
                let velocity = 0;
                let momentumId: number;

                const handleMouseDown = (e: MouseEvent) => {
                  isDown = true;
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
                };

                el.addEventListener('mousedown', handleMouseDown);
                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseup', handleMouseUp);
                el.addEventListener('mouseleave', handleMouseLeave);

                // Touch events
                el.addEventListener('touchstart', (e) => {
                  isDown = true;
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

                el.addEventListener('touchend', handleMouseUp);
              }}
            >
              <div className={styles.gallery}>
                {useCases.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-80 h-64 border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 group"
                  >
                    {item.image && (
                      <div className="flex h-40 items-center justify-center p-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x600/000000/00ffff?text=AI+Visual";
                          }}
                        />
                      </div>
                    )}
                    <div className="p-4 text-left">
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