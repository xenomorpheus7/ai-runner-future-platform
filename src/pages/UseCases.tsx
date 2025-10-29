<<<<<<< HEAD
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
=======
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import usecase1 from "@/assets/usecase1.jpg";
import usecase2 from "@/assets/usecase2.jpg";
import usecase3 from "@/assets/usecase3.jpg";
import usecase4 from "@/assets/usecase4.jpg";
import usecase5 from "@/assets/usecase5.jpg";
import usecase6 from "@/assets/usecase6.jpg";

const UseCases = () => {
  const videos = [
    {
      id: 1,
      title: "AI in Healthcare",
      description: "See how AI is revolutionizing patient diagnosis and treatment planning",
    },
    {
      id: 2,
      title: "AI in Autonomous Vehicles",
      description: "Discover how AI powers the future of self-driving transportation",
    },
  ];

  const images = [
    {
      id: 1,
      src: usecase1,
      title: "Healthcare AI",
      description: "Advanced diagnostic systems powered by machine learning",
    },
    {
      id: 2,
      src: usecase2,
      title: "Autonomous Driving",
      description: "Self-driving vehicles using real-time AI decision making",
    },
    {
      id: 3,
      src: usecase3,
      title: "Financial Trading",
      description: "AI-powered market analysis and algorithmic trading",
    },
    {
      id: 4,
      src: usecase4,
      title: "Smart Cities",
      description: "Urban management optimized through AI analytics",
    },
    {
      id: 5,
      src: usecase5,
      title: "Manufacturing",
      description: "Intelligent robotics and quality control systems",
    },
    {
      id: 6,
      src: usecase6,
      title: "Customer Service",
      description: "AI chatbots delivering personalized support 24/7",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Real-World AI Use Cases
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore how AI is transforming industries and solving real-world problems across healthcare, transportation, finance, and beyond
            </p>
          </div>

          {/* Video Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured <span className="text-primary">Video Demonstrations</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <Card 
                  key={video.id} 
                  className="glass-card border-primary/30 overflow-hidden group hover:border-primary/60 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                      <button className="relative z-10 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 glow-turquoise">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-foreground/70">
                        {video.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Images Grid Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">
              AI in <span className="text-primary">Action</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="glass-card border-primary/30 overflow-hidden group hover:border-primary/60 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 text-center">
            <Card className="glass-card border-primary/30 p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Build Your Own AI Solutions?
              </h2>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Join Robert's courses and learn how to implement these cutting-edge AI applications yourself
              </p>
              <a 
                href="/courses" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity glow-turquoise"
              >
                Explore Courses
              </a>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UseCases;
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
