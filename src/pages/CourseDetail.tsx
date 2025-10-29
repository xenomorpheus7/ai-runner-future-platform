import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Play, CheckCircle2, Lock, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import course1 from "@/assets/course1.jpg";
import course2 from "@/assets/course2.jpg";
import course3 from "@/assets/course3.jpg";
import robertAvatar from "@/assets/robert-avatar.jpg";

const CourseDetail = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(0);

  const courseData: Record<string, any> = {
    "1": {
<<<<<<< HEAD
      title: "Gen-AI IRL",
      image: course1,
      description: "Understand the foundations of artificial intelligence and deep learning. Recognize key concepts, algorithms, and real-world AI case-studies.",
      duration: "1 day",
=======
      title: "AI Fundamentals & Neural Networks",
      image: course1,
      description: "Master the foundations of artificial intelligence and deep learning. This comprehensive course will take you from zero to building your first neural network.",
      duration: "8 weeks",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
      level: "Beginner",
      modules: [
        {
          title: "Introduction to AI",
          lessons: [
            { title: "What is Artificial Intelligence?", duration: "15:30", completed: true },
            { title: "History and Evolution of AI", duration: "20:15", completed: true },
            { title: "AI Applications in Real World", duration: "18:45", completed: false },
          ],
        },
        {
<<<<<<< HEAD
          title: "Leonardo.ai Vs Midjourney",
          lessons: [
            { title: "Understanding Neural Networks", duration: "25:00", completed: false },
            { title: "Activation Functions", duration: "22:30", completed: false },
            { title: "Building Your First Model", duration: "35:20", completed: false },
          ],
        },
        {
          title: "Content Creation with AI",
=======
          title: "Neural Networks Basics",
          lessons: [
            { title: "Understanding Neural Networks", duration: "25:00", completed: false },
            { title: "Activation Functions", duration: "22:30", completed: false },
            { title: "Building Your First Network", duration: "35:20", completed: false },
          ],
        },
        {
          title: "Deep Learning Fundamentals",
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
          lessons: [
            { title: "Introduction to Deep Learning", duration: "28:15", completed: false },
            { title: "Backpropagation Explained", duration: "30:45", completed: false },
            { title: "Training Neural Networks", duration: "32:00", completed: false },
          ],
        },
      ],
    },
    "2": {
<<<<<<< HEAD
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
=======
      title: "Machine Learning Mastery",
      image: course2,
      description: "Advanced machine learning algorithms, data preprocessing, and model optimization techniques for real-world applications.",
      duration: "10 weeks",
      level: "Intermediate",
      modules: [
        {
          title: "ML Foundations",
          lessons: [
            { title: "Supervised vs Unsupervised Learning", duration: "20:00", completed: true },
            { title: "Data Preprocessing Techniques", duration: "25:30", completed: false },
            { title: "Feature Engineering", duration: "28:15", completed: false },
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
<<<<<<< HEAD
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
=======
      title: "Deep Learning & Computer Vision",
      image: course3,
      description: "Explore CNNs, image recognition, object detection, and cutting-edge computer vision techniques.",
      duration: "12 weeks",
      level: "Advanced",
      modules: [
        {
          title: "Computer Vision Basics",
          lessons: [
            { title: "Image Processing Fundamentals", duration: "26:30", completed: true },
            { title: "Convolutional Neural Networks", duration: "32:15", completed: false },
            { title: "Advanced CNN Architectures", duration: "35:45", completed: false },
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
<<<<<<< HEAD
                    alt="Robert Vogrinec" 
=======
                    alt="Robert Chen" 
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
                    className="w-16 h-16 rounded-full border-2 border-primary/50 object-cover"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Taught by</p>
<<<<<<< HEAD
                    <p className="text-lg font-bold text-foreground">Robert Vogrinec</p>
=======
                    <p className="text-lg font-bold text-foreground">Robert Chen</p>
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-turquoise cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                    <p className="text-foreground font-medium">Video Player Placeholder</p>
                    <p className="text-sm text-muted-foreground mt-2">Click to play lesson</p>
                  </div>
                </div>
                
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
<<<<<<< HEAD
                      alt="Robert Vogrinec" 
=======
                      alt="Robert Chen" 
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
                      className="w-12 h-12 rounded-full border-2 border-primary/50 object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
<<<<<<< HEAD
                      <p className="font-bold text-foreground">Robert Vogrinec</p>
=======
                      <p className="font-bold text-foreground">Robert Chen</p>
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
