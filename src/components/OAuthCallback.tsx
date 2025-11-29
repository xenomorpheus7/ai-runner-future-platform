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
        // Get Supabase session from the redirect URL hash
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("OAuth callback error:", error);
          toast.error(t("login.googleSignInFailed") || "Google sign-in failed");
          navigate("/login");
          return;
        }

        if (session && session.user) {
          // Only send welcome email once per sign-in
          if (!welcomeEmailSent.current) {
            welcomeEmailSent.current = true;
            void sendWelcomeEmail(session.user.email || "");
          }

          toast.success(t("login.loginSuccess") || "Successfully signed in!");
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (err: any) {
        console.error("OAuth callback exception:", err);
        toast.error(err.message || t("login.googleSignInFailed") || "Google sign-in failed");
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate, t]);

  // If user is already logged in (for example, autologin)
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
