import { useEffect, useState } from "react";
import { Target, Rocket, Users2, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import aboutUsImage from "@/assets/aboutus.jpg";

const About = () => {
  const { t } = useLanguage();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    try {
      const hasSeenBanner = localStorage.getItem("about_cookie_banner_seen");
      if (!hasSeenBanner) {
        setShowCookieBanner(true);
      }
    } catch (error) {
      // If localStorage is unavailable, fail silently and still show the banner once
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieChoice = (choice: "accept" | "decline") => {
    try {
      localStorage.setItem("about_cookie_banner_seen", choice);
    } catch (error) {
      // Ignore storage errors
    }
    setShowCookieBanner(false);
  };
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      titleKey: "value1Title",
      descriptionKey: "value1Desc",
    },
    {
      icon: Rocket,
      title: "Innovation First",
      titleKey: "value2Title",
      descriptionKey: "value2Desc",
    },
    {
      icon: Users2,
      title: "Community-Focused",
      titleKey: "value3Title",
      descriptionKey: "value3Desc",
    },
    {
      icon: Zap,
      title: "Fast-Paced Learning",
      titleKey: "value4Title",
      descriptionKey: "value4Desc",
    },
  ];

  const stats = [
    { number: "500+", label: "studentsTrained" },
    { number: "1k", label: "completedProjects" },
    { number: "10", label: "liveWorkshops" },
    { number: "97%", label: "positiveFeedback" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("about.titlePart1")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("about.titlePart2")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl text-center hover:border-primary/50 transition-all duration-300 hover:glow-turquoise animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{t(`about.${stat.label}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
              <div className="glass-card p-12 rounded-3xl border-primary/30 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                {t("about.ourStory")}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2025, AI Runner 2033 was born from a vision of AI media engineer, Robert Vogrinec, to transform how people learn about artificial intelligence. Robert's philosophy is not biased but rather taking a safe, practical and most importantly, useful approach.
                </p>
                <p>
                  The genesis of this approach was significantly influenced by Robert's academic work. His mentor and professor of video and photography, Rajko Bizjak, helped him successfully achieve his diploma titled: "Impact of AI on Visual Culture", from which students at his university are now taking notes. This foundational research deeply informs AI Runner 2033’s commitment to real-world impact and ethical AI application.
                </p>
                <p>
                  Our founders, a team of project leaders, teachers, and principals, came together to create an advanced online learning platform that doesn't just teach concepts—it brings them to life through a unique workflow which is suitable for all ages and skill levels. Today, AI Runner 2033 serves thousands of students, from complete beginners to advanced practitioners, helping them master AI skills through hands-on projects, real-world applications, and a supportive community.
                </p>
              </div>
              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <img
                  src={aboutUsImage}
                  alt="Robert, Founder of AI Runner with Rajko, Professor of Video and Photography at ACADEMIA Institute of Technology Maribor, Slovenia, 2023"
                  className="w-1/2 h-auto rounded-2xl object-cover shadow-xl"
                />
                <p className="text-sm md:text-base text-muted-foreground max-w-sm text-center md:text-left">
                  Robert, Founder of AI Runner with Rajko, Professor of Video and Photography at ACADEMIA Institute of Technology Maribor, Slovenia, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("about.coreValuesPart1")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("about.coreValuesPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("about.coreValuesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <value.icon className="h-12 w-12 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 blur-xl bg-secondary/30 group-hover:bg-secondary/50 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{t(`about.${value.titleKey}`)}</h3>
                <p className="text-muted-foreground">{t(`about.${value.descriptionKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.joinMissionPart1")}{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("about.joinMissionPart2")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("about.joinMissionDesc")}
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise shadow-[0_0_20px_rgba(56,189,248,0.6)]"
                >
                  Join Here
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showCookieBanner && (
        <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none">
          <div className="pointer-events-auto mb-6 w-full max-w-xl px-4">
            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/70 bg-slate-900/95 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.7)] animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-indigo-500/20 opacity-80" />
              <div className="relative p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-50 mb-2 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,1)]" />
                  We use cookies to level up your experience
                </h3>
                <p className="text-xs sm:text-sm text-cyan-100/80 mb-4 leading-relaxed">
                  We use cookies and similar technologies to understand how you use this page and to make
                  AI Runner 2033 smoother, faster and more personalized. You can accept or continue with
                  minimal cookies only.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="flex gap-2 order-2 sm:order-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-300/70 text-cyan-100 hover:bg-cyan-500/10 hover:text-cyan-50"
                      onClick={() => handleCookieChoice("decline")}
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-slate-950 font-semibold shadow-[0_0_25px_rgba(34,211,238,0.9)] hover:shadow-[0_0_35px_rgba(56,189,248,1)] hover:from-cyan-300 hover:via-sky-300 hover:to-indigo-300"
                      onClick={() => handleCookieChoice("accept")}
                    >
                      Accept & continue
                    </Button>
                  </div>
                  <span className="order-1 sm:order-2 text-[10px] sm:text-xs text-cyan-100/70">
                    You can change your cookie preferences at any time in your browser settings.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
