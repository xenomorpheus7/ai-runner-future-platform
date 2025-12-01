import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, Zap, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-bg.jpg";
import robertAvatar from "@/assets/robert-avatar.jpg";
import s1Image from "@/assets/s1.jpg";
import s2Image from "@/assets/s2.jpg";
import s3Image from "@/assets/s3.jpg";
import rajkobizjakLogo from "@/assets/rajkobizjak_logo.png";
import isolaLogo from "@/assets/isola_logo.jpg";
import vistLogo from "@/assets/vist_logo.png";
import academiaLogo from "@/assets/academia_logo.png";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isWelcomeVideoPlaying, setIsWelcomeVideoPlaying] = useState(false);
  
  const features = [
    {
      icon: Cpu,
      title: t("home.feature1Title"),
      description: t("home.feature1Desc"),
    },
    {
      icon: Zap,
      title: t("home.feature2Title"),
      description: t("home.feature2Desc")
    },
    {
      icon: Sparkles,
      title: t("home.feature3Title"),
      description: t("home.feature3Desc"),
    },
    
  ];

  const testimonials = [
    {
      name: t("home.testimonial2Name"),
      role: t("home.testimonial2Role"),
      content: t("home.testimonial2Content"),
      logo: isolaLogo,
      url: "https://www.isola.si/",
    },
    {
      name: t("home.testimonial1Name"),
      role: t("home.testimonial1Role"),
      content: t("home.testimonial1Content"),
      logo: rajkobizjakLogo,
      url: "https://www.os-rajkobizjak.si/",
    },
    {
      name: t("home.testimonial3Name"),
      role: t("home.testimonial3Role"),
      content: t("home.testimonial3Content"),
      logo: vistLogo,
      url: "https://www.vist.si/",
    },
    {
      name: t("home.testimonial4Name"),
      role: t("home.testimonial4Role"),
      content: t("home.testimonial4Content"),
      logo: academiaLogo,
      url: "https://www.academia.si/",
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
                <span className="text-sm font-medium">{t("home.welcomeBadge")}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t("home.heroTitlePart1")}{" "}
                <span 
                  className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gen-ai-text"
                  style={{
                    filter: 'none',
                    WebkitFilter: 'none',
                    mixBlendMode: 'normal',
                    opacity: 1,
                  }}
                  data-darkreader-inline-color="false"
                >
                  {t("home.heroTitlePart2")}
                </span>
                <br />
                {t("home.heroTitlePart3")}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                {t("home.heroDescription")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/courses">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
                  >
                    {t("home.startLearning")}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/prompt-optimizer">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  >
                    Explore AI Labs
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
              {t("home.meetTutorPart1")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("home.meetTutorPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("home.tutorSubtitle")}
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
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{t("home.tutorName")}</h3>
                    <p className="text-xl text-primary font-medium mb-4">
                      {t("home.tutorRole")}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t("home.tutorDescription")}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">{t("home.tutorBullet1")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">{t("home.tutorBullet2")}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise" />
                      <p className="text-foreground">{t("home.tutorBullet3")}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to="/contact">
                      <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise"
                      >
                        {t("home.askRobert")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Welcome Video Placeholder / Player */}
              <div className="mt-12 pt-12 border-t border-primary/20">
                <h4 className="text-2xl font-bold mb-6 text-center">{t("home.welcomeVideo")}</h4>
                {!isWelcomeVideoPlaying ? (
                  <button
                    onClick={() => setIsWelcomeVideoPlaying(true)}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-primary/30 bg-muted w-full cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    {/* YouTube thumbnail background */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url(https://img.youtube.com/vi/zWUezJumP8k/maxresdefault.jpg)',
                      }}
                    />
                    <div className="absolute inset-0 cyber-grid opacity-20" />
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-turquoise hover:scale-110 transition-transform mx-auto">
                          <ArrowRight className="h-10 w-10 text-primary ml-1 rotate-0" />
                        </div>
                        <p className="text-foreground font-medium">{t("home.watchVideo")}</p>
                        <p className="text-sm text-muted-foreground mt-2">{t("home.videoDuration")}</p>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/30 bg-black">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/zWUezJumP8k?autoplay=1&rel=0"
                      title="AI RUNNER 2033 Intro Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
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
              {t("home.liveWorkshopsPart1")} {" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("home.liveWorkshopsPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("home.workshopsSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Hajdina Elementary School & iSchool",
                image: s1Image,
              },
              {
                title: "Faculty of Applied Sciences - VIST Ljubljana",
                image: s2Image,
              },
              {
                title: "ACADEMIA - Academy of Applied Sciences Maribor",
                image: s3Image,
              },
            ].map((workshop, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container with 4:3 Aspect Ratio */}
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${workshop.image})` }}
                  />
                  {/* Dark Gradient Overlay - Reduced opacity for better image visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background/50" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-secondary" />
                      <h3 className="text-xl font-bold">{workshop.title}</h3>
                    </div>
                    <Button 
                      className="w-full bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border border-secondary/50 hover:border-secondary"
                      variant="outline"
                    >
                      Explore Students Projects
                    </Button>
                  </div>
                </div>
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
              {t("home.whyLearnPart1")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("home.whyLearnPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("home.whyLearnSubtitle")}
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
              {t("home.testimonialsPart1")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("home.testimonialsPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("home.testimonialsSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="h-8 w-8 text-secondary mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-foreground mb-2">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{testimonial.role}</p>
                  {testimonial.logo && (
                    <div className="mt-3 pt-3 border-t border-primary/20">
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:opacity-100 transition-opacity group"
                      >
                        <img 
                          src={testimonial.logo} 
                          alt={`${testimonial.name} logo`}
                          className="h-12 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </div>
                  )}
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
              {t("home.ctaTitlePart1")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("home.ctaTitlePart2")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("home.ctaDescription")}
            </p>
            <Link to="/courses">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300 text-lg px-8"
              >
                {t("home.exploreCourses")}
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
