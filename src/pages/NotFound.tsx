
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { speak } = useAccessibility();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    speak("Page not found. The page you are looking for doesn't exist or has been moved.");
  }, [location.pathname, speak]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-a11y-purple">404</h1>
        <h2 className="text-2xl font-medium mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          asChild
          size="lg"
          className="focus-ring touch-target"
        >
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
