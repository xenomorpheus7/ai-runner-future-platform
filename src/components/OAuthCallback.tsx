import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendWelcomeEmail } from "@/services/emailService";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const welcomeEmailSent = useRef(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!supabase) {
        toast.error(t("login.authNotConfigured") || "Authentication not configured");
        navigate("/login");
        return;
      }

      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("OAuth callback error:", error);
          toast.error(t("login.googleSignInFailed") || "Google sign-in failed");
          navigate("/login");
          return;
        }

        if (session) {
          // Successfully authenticated
          // Send welcome email for new users (only once per session)
          if (session.user && !welcomeEmailSent.current) {
            welcomeEmailSent.current = true;
            // Fire-and-forget welcome email (do not block login UX)
            void sendWelcomeEmail(session.user.email || "");
          }
          toast.success(t("login.loginSuccess") || "Successfully signed in!");
          navigate("/");
        } else {
          // No session found, redirect to login
          navigate("/login");
        }
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        toast.error(error.message || t("login.googleSignInFailed") || "Google sign-in failed");
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate, t]);

  // If user is already set, redirect immediately
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">
          {t("login.completingSignIn") || "Completing sign in..."}
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;

