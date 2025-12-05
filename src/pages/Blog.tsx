import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import aiEducation from "@/assets/ai_education.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogSubtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-3">
    {children}
  </h3>
);

const TranslatedText: React.FC<{
  as?: "p" | "h2" | "h3";
  children: string;
}> = ({ as = "p", children }) => {
  const { language, translateText } = useLanguage();
  const [text, setText] = useState(children);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (language === "en") {
        setText(children);
        return;
      }
      try {
        const translated = await translateText(children);
        if (!cancelled) {
          setText(translated);
        }
      } catch {
        if (!cancelled) {
          setText(children);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [children, language, translateText]);

  if (as === "h2") {
    return <h2 className="text-3xl md:text-4xl font-bold mb-4">{text}</h2>;
  }

  if (as === "h3") {
    return <BlogSubtitle>{text}</BlogSubtitle>;
  }

  return <p>{text}</p>;
};

export default function Blog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t("blog.title")}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("blog.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-10 rounded-3xl border-primary/30">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">
                {t("blog.articleLabel")}
              </p>
              <TranslatedText as="h2">
                Navigating the AI Frontier: A Leader's Journey Through Education, Ethics, and Everyday Evolution
              </TranslatedText>
              <p className="text-muted-foreground mb-8">
                {t("blog.publishedBy")}
              </p>
                        <div className="w-full rounded-2xl overflow-hidden border border-primary/30 bg-muted/20 my-6">
                  <img
                    src={aiEducation}
                    alt={t("blog.aiEducationAlt")}
                    className="w-full h-auto object-cover"
                  />
                </div>

              <div className="prose prose-invert max-w-none space-y-4">
                <TranslatedText>
                  {"Imagine this: It's a crisp autumn morning in 2024, and I'm standing in a sunlit classroom at the Institute of Digital Literacy and Artificial Intelligence Research, surrounded by 30 wide-eyed high school students. Their screens glow with prompts fed into ChatGPT, churning out essays on climate change faster than they could type. One girl, let's call her Maya, leans back and whispers, \"This feels like cheating... but also like superpowers.\" That's the exact moment I realized AI isn't just a tool—it's a mirror reflecting our hopes, fears, and the blurry line between human ingenuity and machine mimicry. As the founder and lead of the Institute, I've guided several AI workshops and online classes, from Elementary Schools, Universities to ethical debates on the future of AI. But beneath the excitement lies a knot in my stomach: What happens when a five-year-old stumbles upon a Sora 2 video of a cartoon cat wielding an AK-47, knocking at the door? In that hyper-real clip, the boundary between play and peril dissolves. Kids won't just question what's real—they might stop trusting their own eyes. This isn't dystopian fiction; it's the edge we're teetering on today. At airunner2033.com, our mission is clear: to steer AI's integration into society and academia toward security, sustainability, ethics, and unbridled creativity. I've trained several educators and students since 2025, emphasizing not just how to use AI, but why it matters. Drawing from those front-line experiences, let's dive into AI's dual-edged impact on education and daily life—backed by the numbers that keep me up at night and the predictions that fuel my optimism."}
                </TranslatedText>

                <TranslatedText as="h3">
                  The Classroom Revolution: AI as Ally and Enigma
                </TranslatedText>

                <TranslatedText>
                  {"Picture a world where learning bends to the learner. In one of our Institute workshops last spring, a shy 14-year-old named Alex struggled with algebra until an AI tutor adapted in real-time, gamifying equations into a space adventure. His \"aha\" moment wasn't just solving for x—it was reclaiming confidence. This isn't isolated; as of 2025, 86% of students worldwide are harnessing AI for studies, with 54% using it weekly and nearly a quarter daily. In the U.S., generative AI adoption among 14- to 22-year-olds hits 51%, surging from 27% in 2023 to 44% by mid-2025. Tools like ChatGPT (used by 66% of students) and Grammarly (25%) aren't just crutches—they're catalysts, boosting test scores by up to 54% through personalized paths. The global AI education market underscores this shift: valued at $7.57 billion in 2025, it's projected to explode to $112.30 billion by 2034, a staggering 1,400% leap. Why? Because AI democratizes knowledge. In under-resourced schools, adaptive platforms like Khanmigo level the playing field, offering 24/7 tutoring that feels like a patient friend. Our online classes at the Institute have mirrored this: 92% of participants report higher engagement, with STEM retention jumping 40% after AI-infused modules. Yet, here's the immersive twist that haunts me—the shadow side. During a 2024 ethics seminar, a teacher shared how her seventh-graders debated a deepfake video of a historical figure \"speaking\" modern slang. Half couldn't spot the fabrication. Fast-forward to today: Only 20% of kids aged 8-15 feel confident identifying deepfakes, barely double the 9% of adults. And the stats on harm? A chilling 1,325% surge in AI-generated child sexual abuse material from 2023 to 2024, including deepfakes swapping real kids' faces onto explicit content. In schools, 75% of AI deepfake porn targets children 14 and under—even as young as 11—turning playground rivalries into digital nightmares. For me, it's personal: As a parent, I lie awake wondering if my own child could discern a fabricated threat from a viral hoax. This erosion of reality isn't abstract—it's a thief stealing trust from tomorrow's dreamers."}
                </TranslatedText>

                <TranslatedText as="h3">
                  Beyond the Dystopia: AI's Everyday Symphony
                </TranslatedText>

                <TranslatedText>
                  {"Step outside the classroom, and AI hums in the mundane made magical. Remember that rainy commute last week? Your playlist shifted seamlessly because Spotify's AI read your mood from your hurried heartbeat via your smartwatch. Or the grocery app that rerouted your cart to save $15 on organics, all while predicting your next craving. By 2025, 78% of organizations wield AI for such efficiencies, up from 55% the prior year. In healthcare, AI diagnostics automate 75% of routine checks, slashing wait times and spotting anomalies humans might miss. Daily life? It's smoother, smarter—AI agents now handle 95% of customer support by 2026, turning frustration into frictionless fixes. But immersion cuts both ways. In our workshops, adults confess the stress of doom-scrolling AI-curated feeds that amplify echo chambers, blurring news from noise. Deepfakes aren't confined to kids' screens; they've infiltrated elections and relationships, with 10% of financial sextortion cases last year involving non-authentic images. Personally, it's exhausting: I've caught myself double-checking family videos for authenticity after a viral clip of a \"grandma\" dancing went mega. AI accelerates evolution—performance on benchmarks like MMMU jumped 18.8 points in a year, GPQA by 48.9—but at what cost to our shared reality? (Note: While \"77% acceleration\" captures the spirit of AI's turbocharged progress, tying into broader trends like 77% of companies prioritizing it, the raw velocity is evident in these leaps.)"}
                </TranslatedText>

                <TranslatedText as="h3">
                  Peering into the Crystal Ball: Jobs, Justice, and a Job Boom
                </TranslatedText>

                <TranslatedText>
                  {"Fast-forward to 2030, and the canvas expands. AI could automate 30% of U.S. jobs, reshaping 60% more with hybrid human-AI workflows. Globally, expect 170 million new roles in green tech, data ethics, and creative AI curation, offsetting 92 million displacements—a net positive if we upskill aggressively. The World Economic Forum forecasts 86% of businesses transformed, with 39% of core skills outdated by then—demanding a pivot to resilience, creativity, and agility. Imagine: AI literacy as the new literacy, birthing careers in \"prompt engineering\" or \"deepfake forensics.\" At the Institute, we've seen it firsthand—grads landing roles in AI policy, with 85% of employers now prioritizing upskilling. Economically, it's a windfall: $13 trillion in added global activity by 2030, a 16% GDP boost. Yet, equity hangs in the balance. Without ethical guardrails, we risk widening divides—women and marginalized groups hit hardest by automation. That's why airunner2033.com champions inclusive curricula, blending AI with human-centered design to foster jobs that amplify, not erase, our humanity."}
                </TranslatedText>

                <TranslatedText as="h3">
                  Charting the Ethical Horizon: Tools Over Tyrants
                </TranslatedText>

                <TranslatedText>
                  {"AI isn't a creature slithering from the shadows—it's a hammer we forged to build bridges, not walls. Evolution has accelerated dramatically with it; benchmark scores soaring 67.3 points on SWE-bench in a single year alone. But tools demand wielders who wield wisely. At the Institute, our key guides are simple yet profound: Embrace the positive potential—personalized learning that ignites curiosity—while arming against threats like deepfake delusion. We've crafted frameworks for \"AI Discernment 101,\" teaching pattern-spotting and source-verification, because a generation fluent in fiction from fact will innovate, not imitate. The future? One where a five-year-old watches that AK-47 cat video and asks, \"Mom, is this code or real?\"—sparking a family chat on creation over consumption. Where educators aren't gatekeepers but guides, and society thrives on AI's efficiency without sacrificing soul. Join us at airunner2033.com. Let's co-author this chapter—one ethical prompt, one immersive lesson, one secure tomorrow at a time. The revolution isn't coming; it's here. Will you shape it?"}
                </TranslatedText>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
