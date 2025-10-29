import { Link } from "react-router-dom";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import course1 from "@/assets/course1.jpg";
import course2 from "@/assets/course2.jpg";
import course3 from "@/assets/course3.jpg";

const Courses = () => {
  const courses = [
    {
      id: 1,
<<<<<<< HEAD
      title: "Gen-AI IRL",
      description: "Master the foundations of generative artificial intelligence and recognize it in our daily lives.",
      image: course1,
      duration: "1hr35mins",
=======
      title: "AI Fundamentals & Neural Networks",
      description: "Master the foundations of artificial intelligence and deep learning. Build your first neural network from scratch.",
      image: course1,
      duration: "8 weeks",
      students: "2,453",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
      level: "Beginner",
    },
    {
      id: 2,
<<<<<<< HEAD
      title: "Mastering Text-to-Image",
      description: "Be fluent in prompting, fine-tuning models, and creating stunning AI-generated art and images.",
      image: course2,
      duration: "4hr20mins",
=======
      title: "Machine Learning Mastery",
      description: "Advanced machine learning algorithms, data preprocessing, and model optimization techniques for real-world applications.",
      image: course2,
      duration: "10 weeks",
      students: "1,892",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
      level: "Intermediate",
    },
    {
      id: 3,
<<<<<<< HEAD
      title: "Storytelling with AI",
      description: "Explore how to craft compelling creative content using AI tools. From writing to video production.",
      image: course3,
      duration: "1-3 weeks",
=======
      title: "Deep Learning & Computer Vision",
      description: "Explore CNNs, image recognition, object detection, and cutting-edge computer vision techniques.",
      image: course3,
      duration: "12 weeks",
      students: "1,567",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
      level: "Advanced",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-accent border-accent/50";
      case "Intermediate":
        return "text-primary border-primary/50";
      case "Advanced":
        return "text-secondary border-secondary/50";
      default:
        return "text-foreground border-border";
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
<<<<<<< HEAD
              Explore{" "}
=======
              Explore Our{" "}
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Courses
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
<<<<<<< HEAD
              Practical lessons designed to transform you into an Gen-AI expert
=======
              Comprehensive courses designed to transform you into an AI expert
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
                    <span className="text-sm font-medium">{course.level}</span>
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
<<<<<<< HEAD
=======
                      {course.students} students
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/course/${course.id}`}>
                    <Button 
                      className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30 group/btn transition-all duration-300"
                      variant="outline"
                    >
                      View Course
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-primary/30 glow-turquoise">
            <h2 className="text-4xl font-bold mb-4">
<<<<<<< HEAD
              Tell Us Exactly What You Are Looking For
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact us to suggest new courses, share your own AI products or get personalized learning recommendations
=======
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact us to suggest new courses or get personalized learning recommendations
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground"
              >
                Contact Us
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
