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
