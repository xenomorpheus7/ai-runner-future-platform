import { Link } from "react-router-dom";
import { Zap, Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/AI-Runner-2033/61583327235104/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/airunner2033/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ai-runner-2033", label: "LinkedIn" },
  ];

  // TikTok icon as SVG component
  const TikTokIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Courses", path: "/courses" },
        { name: "Projects", path: "/projects" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "#" },
        { name: "Terms of Service", path: "#" },
        { name: "Cookie Policy", path: "#" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-primary/20 bg-card/40 backdrop-blur-xl mt-20">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI RUNNER 2033
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-4">
              Master AI skills for the future with immersive, cutting-edge courses designed for the next generation of innovators.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-all hover:glow-turquoise p-2 rounded-lg hover:bg-primary/10"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              <a
                href="https://www.tiktok.com/@robertvogrinec7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground hover:text-primary transition-all hover:glow-turquoise p-2 rounded-lg hover:bg-primary/10"
              >
                <TikTokIcon />
              </a>
              <a
                href="mailto:robert@airunner2033.com"
                className="text-muted-foreground hover:text-primary transition-all hover:glow-turquoise p-2 rounded-lg hover:bg-primary/10 flex items-center gap-2 ml-2"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">robert@airunner2033.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-primary/10 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} AI Runner 2033. All rights reserved. Built for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
