import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageCircle, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import robertAvatar from "@/assets/robert-avatar.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendContactEmail } from "@/services/emailService";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "robert@airunner2033.com",
      link: "mailto:robert@airunner2033.com",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(t("contact.validationError") || "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendContactEmail(formData);
      
      if (success) {
        toast.success(t("contact.successMessage") || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(t("contact.errorMessage") || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contact.errorMessage") || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              {t("contact.titlePart1")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("contact.titlePart2")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
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
                <h2 className="text-3xl font-bold">{t("contact.message")}</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.namePlaceholder")}
                    className="bg-input border-primary/20 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.emailPlaceholder")}
                    className="bg-input border-primary/20 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t("contact.subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("contact.subjectPlaceholder")}
                    className="bg-input border-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.messagePlaceholder")}
                    rows={6}
                    className="bg-input border-primary/20 focus:border-primary resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.sending") || "Sending..."}
                    </>
                  ) : (
                    <>
                      {t("contact.sendMessage")}
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-6">{t("contact.info")}</h2>
                <p className="text-muted-foreground mb-8">
                  {t("contact.infoDescription")}
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
                        <h3 className="font-semibold mb-1">{t(`contact.${info.title.toLowerCase()}Label`)}</h3>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </a>
                  ))}
                  
                  {/* FOR SCHOOLS Button */}
                  <Link
                    to="/schools"
                    className="flex items-center justify-center gap-3 p-5 rounded-xl bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 hover:from-secondary/30 hover:via-accent/30 hover:to-primary/30 transition-all border-2 border-secondary/50 hover:border-secondary/80 glow-purple group animate-pulse-glow"
                  >
                    <div className="relative">
                      <Zap className="h-6 w-6 text-secondary group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 blur-xl bg-secondary/50 group-hover:bg-secondary/70 transition-all" />
                    </div>
                    <span className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors">
                      {t("contact.forSchools")}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl border-secondary/30">
                <h3 className="text-2xl font-bold mb-4">{t("contact.tutorAvailability")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("contact.tutorAvailabilityDesc")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">{t("contact.courseQuestions")}</p>
                      <p className="text-sm text-muted-foreground">{t("contact.within24Hours")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">{t("contact.technicalSupport")}</p>
                      <p className="text-sm text-muted-foreground">{t("contact.within48Hours")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                    <div className="w-2 h-2 rounded-full bg-primary glow-turquoise" />
                    <div>
                      <p className="font-semibold text-foreground">{t("contact.careerAdvice")}</p>
                      <p className="text-sm text-muted-foreground">{t("contact.within3to5Days")}</p>
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
              {t("contact.joinCommunityPart1")}{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("contact.joinCommunityPart2")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("contact.joinCommunityDesc")}
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              asChild
            >
              <a 
                href="https://discord.com/channels/1437215295964971060/1437215297256951944" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t("contact.joinDiscord")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
