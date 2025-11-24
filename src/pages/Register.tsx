import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2, Mail, Lock, User, Zap } from "lucide-react";
import { toast } from "sonner";

// Google Icon Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Register = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      if (!supabase) {
        throw new Error(t("register.googleSignInNotConfigured"));
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        // Check for specific error about provider not being enabled
        if (error.message?.includes("provider is not enabled") || error.message?.includes("Unsupported provider")) {
          const errorMsg = t("register.googleSignInNotEnabled");
          setError(errorMsg);
          toast.error(t("register.googleSignInNotConfigured"));
          throw new Error(errorMsg);
        }
        throw error;
      }
    } catch (error: any) {
      // Only show error if it's not a redirect (redirects are expected for OAuth)
      if (error?.message && !error.message.includes("redirect")) {
        const errorMsg = error.message.includes("not enabled") || error.message.includes("Unsupported provider")
          ? error.message
          : error.message || t("register.googleSignInFailed");
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError(t("register.emailRequired"));
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError(t("register.invalidEmail"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("register.passwordsDoNotMatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("register.passwordMinLength"));
      return;
    }

    setLoading(true);

    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error(t("register.registrationNotConfigured"));
      }

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check if user was automatically signed in (email confirmation disabled)
        if (data.session) {
          // User is automatically signed in
          toast.success(t("register.accountCreatedSuccess"));
          navigate("/");
        } else {
          // Email confirmation is required - sign them in automatically anyway
          // This allows immediate login after signup
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

          if (signInError) {
            // If sign-in fails (e.g., email not confirmed), still show success but with note
            toast.success(t("register.accountCreatedCheckEmail"));
            navigate("/login");
          } else if (signInData.user) {
            toast.success(t("register.accountCreatedSuccess"));
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      setError(error.message || t("register.registrationError"));
      toast.error(error.message || t("register.registrationFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("register.createAccount")}
                </span>
              </h1>
              <p className="text-muted-foreground">
                {t("register.subtitle")}
              </p>
            </div>

            {/* Registration Form */}
            <div className="glass-card rounded-2xl p-8 border border-primary/20 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    {t("register.emailAddress")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("register.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-card/40 border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    {t("register.password")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={t("register.passwordPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-card/40 border-primary/30 focus:border-primary"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    {t("register.confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t("register.confirmPasswordPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-card/40 border-primary/30 focus:border-primary"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-turquoise transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("register.creatingAccount")}
                    </>
                  ) : (
                    <span>{t("register.createAccountButton")}</span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t("register.orContinueWith")}</span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-card hover:bg-card/80 border border-primary/30 hover:border-primary/50 text-foreground transition-all duration-300"
                variant="outline"
              >
                <GoogleIcon />
                <span className="ml-2">{t("register.signInWithGoogle")}</span>
              </Button>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {t("register.signIn")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;

