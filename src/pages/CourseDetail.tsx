import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Play, CheckCircle2, Lock, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import course1 from "@/assets/course1.jpg";
import course2 from "@/assets/course2.jpg";
import course3 from "@/assets/course3.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import robertAvatar from "@/assets/robert-avatar.jpg";

const CourseDetail = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const courseData: Record<string, any> = {
    "1": {
      title: "Recognizing AI in our daily lives",
      image: course1,
      description: "Understand the foundations of artificial intelligence and deep learning. Recognize key concepts, algorithms, and real-world AI case-studies.",
      duration: "1 day",
      level: "Beginner",
      modules: [
        {
          title: "Introduction to Creative Pathways",
          lessons: [
            { title: "What is Artificial Intelligence?", duration: "15:30", completed: true },
            { title: "History and Evolution of AI", duration: "20:15", completed: true },
            { title: "AI Applications in Real World", duration: "18:45", completed: false },
          ],
        },
        {
          title: "Leonardo.ai Vs Midjourney",
          lessons: [
            { title: "Understanding Neural Networks", duration: "25:00", completed: false },
            { title: "Activation Functions", duration: "22:30", completed: false },
            { title: "Building Your First Model", duration: "35:20", completed: false },
          ],
        },
        {
          title: "Content Creation with AI",
          lessons: [
            { title: "Introduction to Deep Learning", duration: "28:15", completed: false },
            { title: "Backpropagation Explained", duration: "30:45", completed: false },
            { title: "Training Neural Networks", duration: "32:00", completed: false },
          ],
        },
      ],
    },
    "2": {
      title: "Mastering Text-to-Visuals",
      image: course2,
      description: "Learn to communicate with AI through text-to-image and text-to-video generation. Learn to use tools like Leonardo, Midjourney, Runway and much more",
      duration: "3 days",
      level: "Intermediate",
      modules: [
        {
          title: "Storytelling with AI",
          lessons: [
            { title: "Supervised vs Unsupervised Learning", duration: "20:00", completed: true },
            { title: "Data Preprocessing Techniques", duration: "25:30", completed: false },
            { title: "Character Feature Engineering", duration: "28:15", completed: false },
          ],
        },
        {
          title: "Classification & Regression",
          lessons: [
            { title: "Linear Regression", duration: "22:45", completed: false },
            { title: "Logistic Regression", duration: "24:20", completed: false },
            { title: "Decision Trees & Random Forests", duration: "30:00", completed: false },
          ],
        },
      ],
    },
    "3": {
      title: "Become an AI Movie Director",
      image: course3,
      description: "Master Gen-AI techniques for image and video generation using cutting-edge models like Stable Diffusion and GPT-4. Ps. Students can choose their own editing software like Premiere Pro, DaVinci Resolve, CapCut etc.",
      duration: "1-3 weeks",
      level: "Advanced",
      modules: [
        {
          title: "Stable Diffusion",
          lessons: [
            { title: "Image Processing Fundamentals", duration: "26:30", completed: true },
            { title: "Anatomy of Prompting", duration: "32:15", completed: false },
            { title: "Using Github for Inspiration", duration: "35:45", completed: false },
          ],
        },
        {
          title: "Object Detection",
          lessons: [
            { title: "YOLO Algorithm", duration: "28:00", completed: false },
            { title: "R-CNN Family", duration: "30:20", completed: false },
            { title: "Real-time Object Detection", duration: "33:50", completed: false },
          ],
        },
      ],
    },
    "4": {
      title: "AI Visualization Techniques",
      image: gallery1,
      description: "Learn advanced techniques for creating stunning visualizations and designs using AI-powered tools and workflows.",
      duration: "2 days",
      level: "Intermediate",
      modules: [
        {
          title: "Visualization Fundamentals",
          lessons: [
            { title: "Introduction to AI Visualization", duration: "25:00", completed: false },
            { title: "Design Principles with AI", duration: "30:15", completed: false },
            { title: "Color Theory and Palettes", duration: "28:45", completed: false },
          ],
        },
        {
          title: "Advanced Techniques",
          lessons: [
            { title: "3D Visualization with AI", duration: "32:20", completed: false },
            { title: "Data Visualization Tools", duration: "29:30", completed: false },
            { title: "Creating Interactive Visuals", duration: "35:10", completed: false },
          ],
        },
      ],
    },
    "5": {
      title: "Advanced AI Workflows",
      image: gallery2,
      description: "Master complex AI workflows and automation techniques to streamline your creative and professional processes.",
      duration: "3 days",
      level: "Advanced",
      modules: [
        {
          title: "Workflow Optimization",
          lessons: [
            { title: "Understanding AI Workflows", duration: "28:00", completed: false },
            { title: "Automation Strategies", duration: "32:45", completed: false },
            { title: "Integration Techniques", duration: "30:20", completed: false },
          ],
        },
        {
          title: "Advanced Automation",
          lessons: [
            { title: "Complex Workflow Design", duration: "35:15", completed: false },
            { title: "API Integration", duration: "33:30", completed: false },
            { title: "Performance Optimization", duration: "31:45", completed: false },
          ],
        },
      ],
    },
    "6": {
      title: "AI Content Creation Mastery",
      image: gallery3,
      description: "Discover the secrets of professional AI content creation, from ideation to final production and delivery.",
      duration: "2 days",
      level: "Intermediate",
      modules: [
        {
          title: "Content Creation Basics",
          lessons: [
            { title: "Content Ideation with AI", duration: "24:30", completed: false },
            { title: "Writing and Editing", duration: "27:15", completed: false },
            { title: "Visual Content Generation", duration: "29:45", completed: false },
          ],
        },
        {
          title: "Production and Delivery",
          lessons: [
            { title: "Content Production Workflows", duration: "31:20", completed: false },
            { title: "Quality Assurance", duration: "28:50", completed: false },
            { title: "Publishing and Distribution", duration: "26:30", completed: false },
          ],
        },
      ],
    },
  };

  const course = courseData[id || "1"];
  const currentLesson = course.modules[0].lessons[selectedLesson];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/courses" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>

          {/* Course Header */}
          <div className="glass-card p-8 rounded-2xl mb-8 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
                
                {/* Instructor Section */}
                <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-card/40 border border-primary/20">
                  <img 
                    src={robertAvatar} 
                    alt="Robert Vogrinec" 
                    className="w-16 h-16 rounded-full border-2 border-primary/50 object-cover"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Taught by</p>
                    <p className="text-lg font-bold text-foreground">Robert Vogrinec</p>
                    <p className="text-sm text-primary">AI Expert & Lead Instructor</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-primary mr-2" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-primary/30">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Video Player & Lessons */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="relative aspect-video bg-muted flex items-center justify-center group">
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  <button
                    onClick={() => setShowComingSoon(true)}
                    className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-turquoise hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                    <p className="text-foreground font-medium">Video Player Placeholder</p>
                    <p className="text-sm text-muted-foreground mt-2">Click to play lesson</p>
                  </button>
                </div>
                {showComingSoon && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center border border-primary/40">
                      <h2 className="text-2xl font-bold mb-4">IN PRODUCTION</h2>
                      <p className="text-muted-foreground mb-6">Courses Coming Soon</p>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                        onClick={() => setShowComingSoon(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                      <p className="text-muted-foreground">Duration: {currentLesson.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-card/40 border border-primary/20">
                    <img 
                      src={robertAvatar} 
                      alt="Robert Vogrinec" 
                      className="w-12 h-12 rounded-full border-2 border-primary/50 object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-bold text-foreground">Robert Vogrinec</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Mark as Complete
                    </Button>
                    <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                      Take Notes
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-bold mb-6">Course Content</h3>
                
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {course.modules.map((module: any, moduleIndex: number) => (
                    <div key={moduleIndex}>
                      <h4 className="font-semibold text-foreground mb-3">{module.title}</h4>
                      <div className="space-y-2">
                        {module.lessons.map((lesson: any, lessonIndex: number) => (
                          <button
                            key={lessonIndex}
                            onClick={() => setSelectedLesson(lessonIndex)}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              selectedLesson === lessonIndex
                                ? "bg-primary/20 border border-primary/50"
                                : "bg-card/40 hover:bg-card/60"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              ) : (
                                <Lock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
