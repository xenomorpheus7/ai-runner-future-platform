import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import styles from "./Projects.module.css";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";
import gallery7 from "@/assets/gallery7.jpg";
import s1Image from "@/assets/s1.jpg";
import s2Image from "@/assets/s2.jpg";
import s3Image from "@/assets/s3.jpg";

// Workshop data
const workshops: Record<string, { title: string; description: string; image: string }> = {
  hajdina: {
    title: "Hajdina Elementary School & iSchool",
    description: "An inspiring AI workshop where students from Hajdina Elementary School and iSchool explored the fascinating world of artificial intelligence. Through hands-on activities and creative projects, students learned how to communicate with AI and use it to bring their ideas to life. This workshop showcased the power of AI in education and how it can inspire the next generation of innovators.",
    image: s1Image,
  },
  vist: {
    title: "Faculty of Applied Sciences - VIST Ljubljana",
    description: "A comprehensive AI workshop at VIST Ljubljana that brought together students and faculty to explore cutting-edge AI technologies. Participants engaged in practical exercises, learned about generative AI, and created innovative projects that demonstrate the real-world applications of artificial intelligence in various fields.",
    image: s2Image,
  },
  academia: {
    title: "ACADEMIA - Academy of Applied Sciences Maribor",
    description: "An advanced AI workshop at ACADEMIA Maribor that challenged students to push the boundaries of what's possible with AI. Through intensive sessions and collaborative projects, participants developed a deep understanding of AI tools and techniques, creating impressive projects that showcase their creativity and technical skills.",
    image: s3Image,
  },
};

// Gallery images (8 images for the automated roll)
const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery1, // Repeat one to make 8 images
];

const WorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const autoScrollIntervalRef = useRef<number | null>(null);

  const workshop = id ? workshops[id] : null;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      const gallery = container.querySelector(`.${styles.gallery}`) as HTMLElement;
      if (!gallery) return;

      const children = gallery.children;
      if (children.length < galleryImages.length * 2) return;

      const firstSetEndElement = children[galleryImages.length] as HTMLElement;
      if (!firstSetEndElement) return;

      const getFirstSetWidth = (): number => {
        const secondSetStart = firstSetEndElement.offsetLeft;
        if (secondSetStart > 0) {
          return secondSetStart;
        }
        
        const firstItem = children[0] as HTMLElement;
        if (firstItem) {
          const itemWidth = firstItem.offsetWidth;
          const computedStyle = window.getComputedStyle(gallery);
          const gapValue = computedStyle.gap;
          const gap = gapValue ? parseFloat(gapValue) : 32;
          return galleryImages.length * (itemWidth + gap);
        }
        return galleryImages.length * (320 + 32);
      };

      let firstSetWidth = getFirstSetWidth();
      
      if (firstSetWidth <= 0 || firstSetWidth === galleryImages.length * (320 + 32)) {
        setTimeout(() => {
          firstSetWidth = getFirstSetWidth();
        }, 100);
        firstSetWidth = getFirstSetWidth();
      }
      
      autoScrollIntervalRef.current = window.setInterval(() => {
        if (!isPausedRef.current && container) {
          const currentFirstSetWidth = getFirstSetWidth();
          
          if (currentFirstSetWidth <= 0) return;
          
          const scrollLeft = container.scrollLeft;
          
          if (scrollLeft >= currentFirstSetWidth - 1) {
            const originalScrollBehavior = container.style.scrollBehavior || '';
            container.style.scrollBehavior = 'auto';
            const newScrollLeft = scrollLeft - currentFirstSetWidth;
            container.scrollLeft = newScrollLeft;
            Promise.resolve().then(() => {
              if (container) {
                container.style.scrollBehavior = originalScrollBehavior;
              }
            });
          } else {
            container.scrollLeft += 1;
          }
        }
      }, 50);
    };

    const timeoutId = setTimeout(() => {
      startAutoScroll();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  if (!workshop) {
    return (
      <div className="min-h-screen">
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-foreground">Workshop Not Found</h1>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="container mx-auto px-4 relative">
          <Link to="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {workshop.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-center leading-relaxed">
              {workshop.description}
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Workshop Highlights
              </span>
            </h2>
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/30 shadow-lg hover:border-primary/50 transition-all duration-300 hover:glow-turquoise relative">
              <div className="aspect-video bg-muted relative">
                <iframe
                  className="w-full h-full pointer-events-none"
                  src="https://www.youtube.com/embed/sY01rd5B46o?autoplay=0&mute=1&playsinline=1&rel=0"
                  title={`${workshop.title} - Workshop Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Clickable overlay that redirects to register */}
                <button
                  onClick={() => navigate("/register")}
                  className="absolute inset-0 w-full h-full cursor-pointer z-10 bg-transparent hover:bg-primary/5 transition-colors"
                  aria-label="Register to watch video"
                />
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Video from{" "}
              <a
                href="https://www.youtube.com/@RobertVogrinec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Robert Vogrinec Channel
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Student Projects Gallery
            </span>
          </h2>
          <div className="relative w-full py-8 select-none">
            <div
              className={styles.scrollContainer}
              ref={(el) => {
                if (!el) {
                  scrollContainerRef.current = null;
                  return;
                }
                scrollContainerRef.current = el;
                
                let isDown = false;
                let startX: number;
                let scrollLeft: number;
                let lastPageX: number;
                let velocity = 0;
                let momentumId: number;

                const handleMouseDown = (e: MouseEvent) => {
                  isDown = true;
                  isPausedRef.current = true;
                  el.classList.add(styles.grabbing);
                  startX = e.pageX - el.offsetLeft;
                  scrollLeft = el.scrollLeft;
                  lastPageX = e.pageX;
                  
                  if (momentumId) {
                    cancelAnimationFrame(momentumId);
                  }
                };

                const handleMouseMove = (e: MouseEvent) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - el.offsetLeft;
                  const walk = (x - startX);
                  el.scrollLeft = scrollLeft - walk;
                  velocity = lastPageX - e.pageX;
                  lastPageX = e.pageX;
                };

                const handleMouseUp = () => {
                  isDown = false;
                  el.classList.remove(styles.grabbing);
                  
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 2000);
                  
                  const momentum = () => {
                    if (Math.abs(velocity) < 0.5) return;
                    el.scrollLeft += velocity * 0.95;
                    velocity *= 0.95;
                    momentumId = requestAnimationFrame(momentum);
                  };
                  momentum();
                };

                const handleMouseLeave = () => {
                  isDown = false;
                  el.classList.remove(styles.grabbing);
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 1000);
                };

                const handleMouseEnter = () => {
                  isPausedRef.current = true;
                };

                el.addEventListener('mousedown', handleMouseDown);
                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseup', handleMouseUp);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter);

                el.addEventListener('touchstart', (e) => {
                  isDown = true;
                  isPausedRef.current = true;
                  el.classList.add(styles.grabbing);
                  startX = e.touches[0].pageX - el.offsetLeft;
                  scrollLeft = el.scrollLeft;
                  lastPageX = e.touches[0].pageX;
                });

                el.addEventListener('touchmove', (e) => {
                  if (!isDown) return;
                  const x = e.touches[0].pageX - el.offsetLeft;
                  const walk = (x - startX);
                  el.scrollLeft = scrollLeft - walk;
                  velocity = lastPageX - e.touches[0].pageX;
                  lastPageX = e.touches[0].pageX;
                });

                el.addEventListener('touchend', () => {
                  handleMouseUp();
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 2000);
                });
              }}
            >
              <div className={styles.gallery}>
                {/* Render items twice for seamless loop */}
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={`gallery-${index}`}
                    className="relative flex-shrink-0 w-80 border border-border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 group bg-card"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image}
                        alt={`Student Project ${(index % galleryImages.length) + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        Student Project {(index % galleryImages.length) + 1}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Creative work from the workshop
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkshopDetail;

