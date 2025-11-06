import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Trophy, Star, Award, Target } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: Star,
      unlocked: true,
      progress: 100,
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete 3 courses",
      icon: Trophy,
      unlocked: false,
      progress: 33,
    },
    {
      id: 3,
      title: "AI Master",
      description: "Complete 10 courses",
      icon: Award,
      unlocked: false,
      progress: 10,
    },
    {
      id: 4,
      title: "Dedicated Learner",
      description: "Learn for 30 days in a row",
      icon: Target,
      unlocked: false,
      progress: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Achievements
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Track your learning milestones and accomplishments
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`glass-card rounded-2xl p-6 border transition-all duration-300 animate-fade-in ${
                      achievement.unlocked
                        ? "border-primary/50 glow-turquoise"
                        : "border-primary/20 opacity-60"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-4 rounded-xl ${
                          achievement.unlocked
                            ? "bg-primary/20 border border-primary/30"
                            : "bg-muted border border-border"
                        }`}
                      >
                        <Icon
                          className={`h-8 w-8 ${
                            achievement.unlocked ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-muted-foreground mb-4">{achievement.description}</p>
                        {!achievement.unlocked && (
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        )}
                        {achievement.unlocked && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                            Unlocked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Achievements;

