import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const Progression = () => {
  const courses = [
    {
      id: 1,
      title: "Gen-AI IRL",
      progress: 100,
      completed: true,
      timeSpent: "1h 35m",
    },
    {
      id: 2,
      title: "Mastering Text-to-Image",
      progress: 45,
      completed: false,
      timeSpent: "2h 10m",
    },
    {
      id: 3,
      title: "Storytelling with AI",
      progress: 0,
      completed: false,
      timeSpent: "0m",
    },
  ];

  const stats = [
    {
      label: "Courses Completed",
      value: "1",
      icon: CheckCircle2,
      color: "text-primary",
    },
    {
      label: "Total Time",
      value: "3h 45m",
      icon: Clock,
      color: "text-secondary",
    },
    {
      label: "Progress",
      value: "48%",
      icon: TrendingUp,
      color: "text-accent",
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
                  Your Progression
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Track your learning journey and course completion
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl p-6 border border-primary/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Course Progress */}
            <div className="glass-card rounded-2xl p-8 border border-primary/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Course Progress
              </h2>

              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="p-6 rounded-xl bg-card/40 border border-primary/20 transition-all duration-300 hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      {course.completed && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          course.completed ? "bg-primary" : "bg-primary/60"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      Time spent: {course.timeSpent}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Progression;

