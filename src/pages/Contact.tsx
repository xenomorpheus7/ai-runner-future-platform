import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import robertAvatar from "@/assets/robert-avatar.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "robert.vogrinec7.com",
      link: "mailto:hello@airunner2033.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(+386) 31481673",
      link: "tel:+15552033",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Ptuj, Slovenia",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl" />
                <img 
                  src={robertAvatar} 
                  alt="Robert Vogrinec" 
                  className="relative w-24 h-24 rounded-full border-2 border-primary/50 object-cover glow-turquoise"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ask{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Robert
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about AI or the courses? Robert personally reads and responds to every message. 
              Get expert guidance on your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Message</h2>
              </div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="bg-input border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-input border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is this about?"
                    className="bg-input border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    rows={6}
                    className="bg-input border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6">Info</h2>
                <p className="text-muted-foreground mb-8">
                  Connect with Robert through any of these channels for personalized assistance.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card/40 hover:bg-card/60 transition-all hover:border-primary/30 border border-transparent group"
                    >
                      <div className="relative">
                        <info.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl border-secondary/30">
                <h3 className="text-2xl font-bold mb-4">Tutor Availability</h3>
                <p className="text-muted-foreground mb-6">
                  Robert typically responds to messages within:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">Course Questions</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">Technical Support</p>
                      <p className="text-sm text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">Career Advice</p>
                      <p className="text-sm text-muted-foreground">Within 3-5 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Placeholder */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-primary/30 glow-turquoise">
            <h2 className="text-4xl font-bold mb-4">
              Join Robert's{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Community
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get instant answers from Robert and fellow students in our exclusive Discord community. 
              Share projects, ask questions, and grow together.
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              Join Discord Community
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
