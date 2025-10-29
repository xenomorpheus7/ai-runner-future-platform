<<<<<<< HEAD
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
        <p>© 2025 AI Runner 2033. All rights reserved.</p>
      </div>
    </footer>
  );
}
=======
import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Courses", path: "/courses" },
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
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-all hover:glow-turquoise p-2 rounded-lg hover:bg-primary/10"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
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
>>>>>>> 9ab53d31ba419fb35572c32a79bd0d97eb527391
