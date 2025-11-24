import { Target, Rocket, Users2, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
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
    { number: "95%", label: "positiveFeedback" },
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
                  {t("about.story1")}
                </p>
                <p>
                  {t("about.story2")}
                </p>
                <p>
                  {t("about.story3")}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
