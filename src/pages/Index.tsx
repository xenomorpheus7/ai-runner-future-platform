import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, Zap, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";
import robertAvatar from "@/assets/robert-avatar.jpg";

const Index = () => {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Learning",
      description: "Cutting-edge curriculum designed by industry experts",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Accelerated learning paths to get you job-ready",
    },
    {
      icon: Sparkles,
      title: "Immersive Experience",
      description: "Interactive projects and real-world applications",
    },
  ];

  const testimonials = [
    {
      name: "Mitja Vidovič",
      role: "iSchool Founder and Principal of Hajdina Elementary school",
      content: "...",
    },
    {
      name: "Igor Prosić",
      role: "Project Leader at VIST Ljubljana",
      content: "...",
    },
    {
      name: "Žan Dapčevič",
      role: "Principal at ACADEMIA, Academy of Applied Sciences",
      content: "...",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">Welcome to the Future of Education</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Master{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Gen-AI
                </span>
                <br />
                for 2033
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Immerse yourself in cutting-edge AI courses with in-depth experience which will open your eyes for the future. 
                Learn from industry experts and build real-world projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/courses">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  >
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden border border-primary/30 glow-turquoise">
                <img 
                  src={heroImage} 
                  alt="AI Neural Network Visualization" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Tutor Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Tutor
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Your personal guide through the world of Gen-AI
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border-primary/30 glow-turquoise">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative animate-fade-in">
                  <div className="relative w-full aspect-square max-w-sm mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
                    <img 
                      src={robertAvatar} 
                      alt="Robert - AI Tutor" 
                      className="relative rounded-2xl border-2 border-primary/50 w-full h-full object-cover glow-turquoise"
                    />
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">Robert Vogrinec</h3>
                    <p className="text-xl text-primary font-medium mb-4">
                      Your Guide Through the World of AI
                    </p>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    With rich experience in generative artificial intelligence, 
                    I've dedicated my career to making complex AI concepts accessible and engaging. 
                    From writing a perfect prompt to creating new worlds, AI RUNNER 2033 provides you with the tools and knowledge to thrive in the AI-driven future.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">AI Instructor</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">Actively educating students across schools</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">Developing my own AI Project</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to="/contact">
                      <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise"
                      >
                        Ask Robert a Question
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Welcome Video Placeholder */}
              <div className="mt-12 pt-12 border-t border-primary/20">
                <h4 className="text-2xl font-bold mb-6 text-center">Welcome Message from Robert</h4>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/30 bg-muted">
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-turquoise cursor-pointer hover:scale-110 transition-transform mx-auto">
                        <ArrowRight className="h-10 w-10 text-primary ml-1 rotate-0" />
                      </div>
                      <p className="text-foreground font-medium">Watch Robert's Welcome Message</p>
                      <p className="text-sm text-muted-foreground mt-2">2:33 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                AI Workshops
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join Robert for exclusive live sessions and hands-on workshops
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Anatomy of Digital Life",
                date: "Monday",
                time: "10:00 AM CET",
                description: "Interactive session on building neural networks from scratch with Robert",
              },
              {
                title: "Gen-AI Q&A",
                date: "Wednesday",
                time: "7:00 PM CET",
                description: "Ask Robert anything about breaking into the AI industry",
              },
              {
                title: "Project Workshop",
                date: "Friday",
                time: "5:00 PM CET",
                description: "Work on real-world AI projects with live guidance from Robert",
              },
            ].map((workshop, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-secondary" />
                  <h3 className="text-xl font-bold">{workshop.title}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-primary font-medium">{workshop.date}</p>
                  <p className="text-muted-foreground">{workshop.time}</p>
                </div>
                <p className="text-foreground mb-6">{workshop.description}</p>
                <Button 
                  className="w-full bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border border-secondary/50 hover:border-secondary"
                  variant="outline"
                >
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Learn with{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Robert
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience personalized, expert-led AI education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:glow-turquoise group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <feature.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Special{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join many of students transforming their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="h-8 w-8 text-secondary mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-primary/30 glow-turquoise">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Journey?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join AI Runner 2033 today and unlock your potential in generative AI
            </p>
            <Link to="/courses">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300 text-lg px-8"
              >
                Explore Courses
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

export default Index;
