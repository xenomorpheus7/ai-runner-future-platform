import { Target, Rocket, Users2, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering the next generation of AI innovators with cutting-edge education and immersive learning experiences.",
    },
    {
      icon: Rocket,
      title: "Innovation First",
      description: "Staying ahead of the curve with the latest AI technologies and teaching methodologies.",
    },
    {
      icon: Users2,
      title: "Community-Focused",
      description: "Building a global network of AI enthusiasts, learners, and professionals supporting each other.",
    },
    {
      icon: Zap,
      title: "Fast-Paced Learning",
      description: "Accelerated courses designed to get you from beginner to expert in record time.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "50+", label: "Expert Instructors" },
    { number: "100+", label: "Courses" },
    { number: "95%", label: "Success Rate" },
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
              About{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Runner 2033
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
<<<<<<< HEAD
              On a mission to democratize AI education and prepare learners for the future of technology. 
              Our online platform combines cutting-edge curriculum with an immersive learning experience.
=======
              We're on a mission to democratize AI education and prepare learners for the future of technology. 
              Our futuristic platform combines cutting-edge curriculum with an immersive cyberpunk experience.
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
                <div className="text-muted-foreground">{stat.label}</div>
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
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
<<<<<<< HEAD
                  Founded in 2025, AI Runner 2033 was born from a vision of AI media engineer, Robert Vogrinec to transform how people
                  learn about artificial intelligence. Robert's philosophy is not biased but rather taking a safe, practical and most importantly, useful approach.
                </p>
                <p>
                  Our founders, a team of project leaders, teachers, and principals, came together to create an advanced online 
                  learning platform that doesn't just teach concepts—it brings them to life through a unique workflow which is
                  suitable for all ages and skill levels.
                </p>
                <p>
                  Today, AI Runner 2033 serves thousands of students, from complete beginners to advanced 
                  practitioners, helping them master AI skills through hands-on projects, real-world applications, 
                  and a supportive community.
=======
                  Founded in 2033, AI Runner was born from a vision to transform how people learn artificial intelligence. 
                  We recognized that traditional education methods couldn't keep pace with the rapid evolution of AI technology.
                </p>
                <p>
                  Our founders, a team of AI researchers, educators, and designers, came together to create an immersive 
                  learning platform that doesn't just teach concepts—it brings them to life through a futuristic, 
                  cyberpunk-inspired interface that makes learning engaging and memorable.
                </p>
                <p>
                  Today, AI Runner 2033 serves thousands of students worldwide, from complete beginners to advanced 
                  practitioners, helping them master AI skills through hands-on projects, real-world applications, 
                  and a supportive global community.
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
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
              Our{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
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
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
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
              Join Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
<<<<<<< HEAD
              I'm always looking for passionate students, developers, and AI enthusiasts to join my team 
              and help shape the future of AI education. Please share your final products, ideas, or feedback with me.
=======
              We're always looking for passionate educators, developers, and AI enthusiasts to join our team 
              and help shape the future of AI education.
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
