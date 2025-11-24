import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AITestingSpace from "@/components/AITestingSpace";
import { useLanguage } from "@/contexts/LanguageContext";
import course1 from "@/assets/course1.jpg";
import course2 from "@/assets/course2.jpg";
import course3 from "@/assets/course3.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";

const Courses = () => {
  const { t } = useLanguage();
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

      {/* AI Testing Space Section */}
      <AITestingSpace />

      {/* AI Tools Segment */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6 glow-purple">
              <Zap className="h-4 w-4 text-secondary mr-2" />
              <span className="text-sm font-medium">AI Tools & Software</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                {t("courses.toolsTitle")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("courses.toolsDescription")}
            </p>
            <Link to="/prompt-testing">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-foreground glow-purple transition-all duration-300 group"
              >
                {t("courses.viewAllTools")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
