import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Lightbulb,
  Target,
  Zap,
  Globe,
  Lock,
  Eye,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendSchoolsEmail, sendWelcomeEmail } from "@/services/emailService";
import { toast } from "sonner";
import robertAvatar from "@/assets/robert-avatar.jpg";
import isolaLogo from "@/assets/isola_logo.jpg";
import vistLogo from "@/assets/vist_logo.png";
import academiaLogo from "@/assets/academia_logo.png";

const Schools = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    preferredDate: "",
    studentAge: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.schoolName.trim() || !formData.contactPerson.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error(t("schools.validationError") || "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendSchoolsEmail(formData);
      
      if (success) {
        void sendWelcomeEmail(formData.email.trim());
        toast.success(t("schools.successMessage") || "Booking request sent successfully! We'll contact you within 24 hours.");
        setFormData({
          schoolName: "",
          contactPerson: "",
          email: "",
          phone: "",
          preferredDate: "",
          studentAge: "",
          notes: "",
        });
      } else {
        toast.error(t("schools.errorMessage") || "Failed to send booking request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("schools.errorMessage") || "Failed to send booking request. Please try again.");
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
    <div className="min-h-screen schools-page">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 glow-turquoise">
              <GraduationCap className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">{t("schools.badge")}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t("schools.heroTitlePart1")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.heroTitlePart2")}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("schools.heroDescription")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300 group"
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("schools.bookWorkshop")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("schools.viewPackages")}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8 mb-8">
              {t("schools.trustedBy")}
            </p>

            {/* School Logos */}
            <div className="mt-12">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <div className="flex flex-nowrap items-center justify-center gap-6 md:gap-10">
                  {[
                    { 
                      name: "iŠola", 
                      logo: isolaLogo, 
                      url: "https://www.isola.si/" 
                    },
                    { 
                      name: "VIST", 
                      logo: vistLogo, 
                      url: "https://www.vist.si/" 
                    },
                    { 
                      name: "ACADEMIA Maribor", 
                      logo: academiaLogo, 
                      url: "https://www.academia.si/" 
                    },
                  ].map((school, index) => (
                    <a
                      key={index}
                      href={school.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group transition-all duration-300 hover:scale-110 p-4 rounded-lg flex-shrink-0"
                    >
                      <img
                        src={school.logo}
                        alt={`${school.name} logo`}
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Literacy Matters */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("schools.whyMattersTitle")}{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("schools.whyMattersTitlePart2")}
                </span>
              </h2>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-3xl border-primary/30 glow-turquoise animate-fade-in">
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  {t("schools.whyMattersDesc1")}
                </p>
                
                <p className="text-lg text-foreground leading-relaxed">
                  {t("schools.whyMattersDesc2")}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.euCompliance")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.euComplianceDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.futureSkills")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.futureSkillsDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.teacherSupport")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.teacherSupportDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 glow-turquoise flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.safeEthical")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.safeEthicalDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Schools Get */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.whatSchoolsGet")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("schools.whatSchoolsGetPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("schools.whatSchoolsGetSubtitle")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border-secondary/30 glow-purple animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.sevenHourSession")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.sevenHourSessionDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.imageVideoGeneration")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.imageVideoGenerationDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.ethicalSafeModule")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.ethicalSafeModuleDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.studentCertificates")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.studentCertificatesDesc")}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.teacherMaterials")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.teacherMaterialsDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.followUpSupport")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.followUpSupportDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.aiToolsAccess")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.aiToolsAccessDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("schools.curriculumIntegration")}</h3>
                      <p className="text-muted-foreground text-sm">{t("schools.curriculumIntegrationDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Packages */}
      <section id="packages" className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.workshopPackages")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.workshopPackagesPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("schools.chooseProgram")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Student Workshop Package */}
            <div className="glass-card p-8 rounded-2xl border-primary/30 hover:border-primary/50 transition-all duration-300 hover:glow-turquoise animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 glow-turquoise">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Student Workshop</h3>
                <p className="text-muted-foreground text-sm">Interactive AI workshop for students in schools</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">2-8 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">Max 50 students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">In-person only</span>
                </div>
                <div className="pt-4 border-t border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">What's Included:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Using AI tools to create a visual product</li>
                    <li>• Hands-on learning experience</li>
                    <li>• Practical AI skills development</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Teacher Training Package */}
            <div className="glass-card p-8 rounded-2xl border-secondary/30 hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4 glow-purple">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Teacher Training</h3>
                <p className="text-muted-foreground text-sm">Professional development for educators</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-foreground">1-3 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-foreground">Unlimited teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-secondary" />
                  <span className="text-sm text-foreground">In-person and online</span>
                </div>
                <div className="pt-4 border-t border-secondary/20">
                  <p className="text-sm font-semibold text-foreground mb-2">What's Included:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Educating teachers about AI ethics</li>
                    <li>• Useful tools appropriate for schools</li>
                    <li>• Productivity tools and strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.whoIsThisFor")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.whoIsThisForPart2")}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: GraduationCap, title: t("schools.primarySchools"), desc: t("schools.ages8to12") },
              { icon: BookOpen, title: t("schools.secondarySchools"), desc: t("schools.ages13to18") },
              { icon: Building2, title: t("schools.vocationalSchools"), desc: t("schools.careerFocused") },
              { icon: Users, title: t("schools.teachers"), desc: t("schools.professionalDevelopment") },
              { icon: Zap, title: t("schools.itDepartments"), desc: t("schools.technicalIntegration") },
              { icon: Globe, title: t("schools.libraries"), desc: t("schools.communityPrograms") },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:glow-turquoise group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <item.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.skillsStudentsGain")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("schools.skillsStudentsGainPart2")}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Creativity & Production */}
            <div className="glass-card p-8 rounded-2xl border-primary/30 hover:border-primary/50 transition-all duration-300 hover:glow-turquoise animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">{t("schools.creativityProduction")}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.imageGenMastery")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.videoCreationTechniques")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.promptEngineering")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.creativeWorkflowDesign")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.portfolioDevelopment")}</span>
                </li>
              </ul>
            </div>

            {/* Digital Competence */}
            <div className="glass-card p-8 rounded-2xl border-secondary/30 hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-8 w-8 text-secondary" />
                <h3 className="text-2xl font-bold">{t("schools.digitalCompetence")}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.aiToolNavigation")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.digitalLiteracyEnhancement")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.criticalThinkingSkills")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.informationEvaluation")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.technologyIntegration")}</span>
                </li>
              </ul>
            </div>

            {/* Future Skills */}
            <div className="glass-card p-8 rounded-2xl border-accent/30 hover:border-accent/50 transition-all duration-300 hover:glow-turquoise animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-bold">{t("schools.futureSkillsTitle")}</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.aiCollaboration")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.problemSolvingWithAI")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.adaptiveLearning")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.careerReadiness")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{t("schools.innovationMindset")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Ethics */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-6 glow-purple">
              <Shield className="h-4 w-4 text-secondary mr-2" />
              <span className="text-sm font-medium">{t("schools.safetyFirst")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.safetyEthics")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("schools.safetyEthicsPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("schools.responsibleAIFoundation")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border-secondary/30 glow-purple animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.safePromptingPractices")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.safePromptingDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.biasAwareness")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.biasAwarenessDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.copyrightRespect")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.copyrightRespectDesc")}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.deepfakeRecognition")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.deepfakeRecognitionDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.euAIActAlignment")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.euAIActAlignmentDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{t("schools.studentIdentityProtection")}</h3>
                      <p className="text-sm text-muted-foreground">{t("schools.studentIdentityProtectionDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About AI Runner 2033 */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("schools.aboutAIRunner")}{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("schools.aboutAIRunnerPart2")}
                </span>
              </h2>
            </div>

            <div className="glass-card p-8 md:p-12 rounded-3xl border-primary/30 glow-turquoise animate-fade-in">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                <div className="relative">
                  <div className="relative w-full aspect-square max-w-sm mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl" />
                    <img 
                      src={robertAvatar} 
                      alt="Robert Vogrinec" 
                      className="relative rounded-2xl border-2 border-primary/50 w-full h-full object-cover glow-turquoise"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">{t("schools.robertVogrinec")}</h3>
                  <p className="text-primary font-medium">{t("schools.aiEducationSpecialist")}</p>
                  <p className="text-muted-foreground">
                    {t("schools.robertDescription")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-primary/20">
                <div>
                  <h3 className="font-bold text-foreground mb-2">{t("schools.ourMission")}</h3>
                  <p className="text-muted-foreground">
                    {t("schools.ourMissionDesc")}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{t("schools.ourVision")}</h3>
                  <p className="text-muted-foreground">
                    {t("schools.ourVisionDesc")}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{t("schools.whySchoolsTrustUs")}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {t("schools.euCompliantCurriculum")}</li>
                    <li>• {t("schools.provenTrackRecord")}</li>
                    <li>• {t("schools.completeTeacherSupport")}</li>
                    <li>• {t("schools.safetyFirstApproach")}</li>
                    <li>• {t("schools.flexibleScheduling")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.schoolTestimonials")}{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t("schools.schoolTestimonialsPart2")}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: t("schools.testimonial1Name"),
                role: t("schools.testimonial1Role"),
                content: t("schools.testimonial1Content"),
                logo: isolaLogo,
                url: "https://www.isola.si/",
              },
              {
                name: t("schools.testimonial2Name"),
                role: t("schools.testimonial2Role"),
                content: t("schools.testimonial2Content"),
                logo: vistLogo,
                url: "https://www.vist.si/",
              },
              {
                name: t("schools.testimonial3Name"),
                role: t("schools.testimonial3Role"),
                content: t("schools.testimonial3Content"),
                logo: academiaLogo,
                url: "https://www.academia.si/",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300 hover:glow-purple animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-secondary glow-purple" />
                  <span className="text-sm text-secondary font-medium">{t("schools.verifiedSchool")}</span>
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-foreground mb-1">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mb-3">{testimonial.role}</p>
                  {testimonial.logo && (
                    <div className="pt-3 border-t border-primary/20">
                      <a
                        href={testimonial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:opacity-100 transition-opacity group"
                      >
                        <img 
                          src={testimonial.logo} 
                          alt={`${testimonial.name} logo`}
                          className="h-12 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.bookWorkshopTitle")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.bookWorkshopPart2")}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("schools.bookWorkshopSubtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border-primary/30 glow-turquoise animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="schoolName" className="mb-2">
                      {t("schools.schoolName")} *
                    </Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                      className="bg-input border-primary/20 focus:border-primary"
                      placeholder={t("schools.schoolNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson" className="mb-2">
                      {t("schools.contactPerson")} *
                    </Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="bg-input border-primary/20 focus:border-primary"
                      placeholder={t("schools.contactPersonPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="mb-2">
                      {t("contact.email")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-input border-primary/20 focus:border-primary"
                      placeholder={t("schools.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      {t("contact.phoneLabel")} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-input border-primary/20 focus:border-primary"
                      placeholder={t("schools.phonePlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate" className="mb-2">
                      {t("schools.preferredDate")}
                    </Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="bg-input border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentAge" className="mb-2">
                      {t("schools.ageOfStudents")}
                    </Label>
                    <Input
                      id="studentAge"
                      name="studentAge"
                      value={formData.studentAge}
                      onChange={handleChange}
                      className="bg-input border-primary/20 focus:border-primary"
                      placeholder={t("schools.ageOfStudentsPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2">
                    {t("schools.additionalNotes")}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="bg-input border-primary/20 focus:border-primary resize-none"
                    placeholder={t("schools.additionalNotesPlaceholder")}
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t("schools.sending") || "Sending..."}
                    </>
                  ) : (
                    <>
                      {t("schools.bookWorkshopButton")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("schools.frequentlyAsked")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.frequentlyAskedPart2")}
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="equipment" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqEquipment")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqEquipmentAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="beginners" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqBeginners")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqBeginnersAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="safety" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqSafety")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqSafetyAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="onsite" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqOnsite")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqOnsiteAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="invoicing" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqInvoicing")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqInvoicingAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="teachers" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqTeachers")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqTeachersAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="customization" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqCustomization")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqCustomizationAnswer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="followup" className="glass-card border-primary/30 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {t("schools.faqFollowup")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t("schools.faqFollowupAnswer")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-primary/30 glow-turquoise animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("schools.readyToTransform")}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("schools.readyToTransformPart2")}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("schools.readyToTransformDesc")}
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-foreground glow-turquoise transition-all duration-300 text-lg px-8"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("schools.bookYourWorkshopNow")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schools;

