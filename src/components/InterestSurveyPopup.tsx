import { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendPopupEmail, sendWelcomeEmail } from "@/services/emailService";
import { toast } from "sonner";
import { X, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const InterestSurveyPopup = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "text-to-image": false,
    "image-to-image": false,
    "text-to-video": false,
    "image-to-video": false,
    "text-to-speech": false,
    "locally-driven-models": false,
    "ai-research": false,
    "ai-structuring": false,
    "ai-writing": false,
    "web-builders": false,
    "app-prototypes": false,
    "locally-driven-prototypes": false,
  });

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasShown = sessionStorage.getItem("interestSurveyShown");
    if (hasShown) return;

    const showPopup = () => {
      const alreadyShown = sessionStorage.getItem("interestSurveyShown");
      if (alreadyShown) return;
      setOpen(true);
      sessionStorage.setItem("interestSurveyShown", "true");
    };

    // Show popup after 30 seconds as a fallback
    const timer = setTimeout(showPopup, 30000);

    // Also allow manual triggering via a custom event (e.g. after intro video)
    const handleCustomEvent = () => {
      showPopup();
      clearTimeout(timer);
    };

    window.addEventListener("showInterestSurvey", handleCustomEvent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("showInterestSurvey", handleCustomEvent);
    };
  }, []);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!email.trim()) {
      toast.error(t("popup.emailRequired") || "Please enter your email address");
      return;
    }

    // Get selected interests with their translated labels
    const selectedInterests = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => {
        try {
          return t(`popup.${key}`);
        } catch {
          return key;
        }
      });

    if (selectedInterests.length === 0) {
      toast.error(t("popup.selectInterests") || "Please select at least one interest");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendPopupEmail(
        email.trim(),
        selectedInterests.join(", ")
      );

      if (success) {
        void sendWelcomeEmail(email.trim());
        setOpen(false);
        setEmail("");
        setCheckedItems({
          "text-to-image": false,
          "image-to-image": false,
          "text-to-video": false,
          "image-to-video": false,
          "text-to-speech": false,
          "locally-driven-models": false,
          "ai-research": false,
          "ai-structuring": false,
          "ai-writing": false,
          "web-builders": false,
          "app-prototypes": false,
          "locally-driven-prototypes": false,
        });
      } else {
        toast.error(t("popup.errorMessage") || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error(t("popup.errorMessage") || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-md" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl max-h-[90vh] translate-x-[-50%] translate-y-[-50%] gap-4 border glass-card border-primary/50 glow-turquoise overflow-y-auto bg-card/95 backdrop-blur-xl p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg"
          )}
        >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t("popup.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="popup-email" className="text-sm font-semibold">
              {t("popup.emailLabel")}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="popup-email"
                type="email"
                placeholder={t("popup.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-card/40 border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {/* VISUAL GENERATIVE AI */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary border-b border-primary/30 pb-2">
              {t("popup.visualGenerativeAI")}
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="text-to-image"
                  checked={checkedItems["text-to-image"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("text-to-image", checked as boolean)
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{t("popup.text-to-image")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="image-to-image"
                  checked={checkedItems["image-to-image"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("image-to-image", checked as boolean)
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{t("popup.image-to-image")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="text-to-video"
                  checked={checkedItems["text-to-video"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("text-to-video", checked as boolean)
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{t("popup.text-to-video")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="image-to-video"
                  checked={checkedItems["image-to-video"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("image-to-video", checked as boolean)
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{t("popup.image-to-video")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="text-to-speech"
                  checked={checkedItems["text-to-speech"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("text-to-speech", checked as boolean)
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">{t("popup.text-to-speech")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  id="locally-driven-models"
                  checked={checkedItems["locally-driven-models"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "locally-driven-models",
                      checked as boolean
                    )
                  }
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm">
                  {t("popup.locally-driven-models")}
                </span>
              </label>
            </div>
          </div>

          {/* ANALYTICAL AI */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-secondary border-b border-secondary/30 pb-2">
              {t("popup.analyticalAI")}
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center space-x-3 cursor-pointer hover:text-secondary transition-colors">
                <Checkbox
                  id="ai-research"
                  checked={checkedItems["ai-research"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("ai-research", checked as boolean)
                  }
                  className="border-secondary/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <span className="text-sm">{t("popup.ai-research")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-secondary transition-colors">
                <Checkbox
                  id="ai-structuring"
                  checked={checkedItems["ai-structuring"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "ai-structuring",
                      checked as boolean
                    )
                  }
                  className="border-secondary/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <span className="text-sm">{t("popup.ai-structuring")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-secondary transition-colors">
                <Checkbox
                  id="ai-writing"
                  checked={checkedItems["ai-writing"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("ai-writing", checked as boolean)
                  }
                  className="border-secondary/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <span className="text-sm">{t("popup.ai-writing")}</span>
              </label>
            </div>
          </div>

          {/* WEB & APP DESIGN WITH AI */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-cyan-400 border-b border-cyan-400/30 pb-2">
              {t("popup.webAppDesignAI")}
            </h3>
            <div className="space-y-2 pl-4">
              <label className="flex items-center space-x-3 cursor-pointer hover:text-cyan-400 transition-colors">
                <Checkbox
                  id="web-builders"
                  checked={checkedItems["web-builders"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "web-builders",
                      checked as boolean
                    )
                  }
                  className="border-cyan-400/50 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                />
                <span className="text-sm">
                  {t("popup.web-builders")}
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-cyan-400 transition-colors">
                <Checkbox
                  id="app-prototypes"
                  checked={checkedItems["app-prototypes"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("app-prototypes", checked as boolean)
                  }
                  className="border-cyan-400/50 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                />
                <span className="text-sm">{t("popup.app-prototypes")}</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer hover:text-cyan-400 transition-colors">
                <Checkbox
                  id="locally-driven-prototypes"
                  checked={checkedItems["locally-driven-prototypes"]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "locally-driven-prototypes",
                      checked as boolean
                    )
                  }
                  className="border-cyan-400/50 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                />
                <span className="text-sm">
                  {t("popup.locally-driven-prototypes")}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-primary/20">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-primary/50 hover:bg-primary/10"
          >
            {t("popup.close")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("popup.sending") || "Submitting..."}
              </>
            ) : (
              t("popup.submit")
            )}
          </Button>
        </div>
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default InterestSurveyPopup;

