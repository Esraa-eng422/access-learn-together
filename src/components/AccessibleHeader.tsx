
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, Book, LogOut } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onOpenSettings: () => void;
}

const AccessibleHeader: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { user, logout } = useAuth();
  const { speak } = useAccessibility();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    speak("You have been logged out");
  };
  
  const handleSettingsClick = () => {
    onOpenSettings();
    speak("Accessibility settings opened");
  };
  
  const handleLogo = () => {
    navigate("/");
    speak("Navigated to home page");
  };

  return (
    <header className="w-full bg-background border-b py-4 px-6 md:px-8 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <a 
          href="/" 
          className="flex items-center gap-2 focus-ring rounded-md p-1"
          onClick={(e) => { 
            e.preventDefault();
            handleLogo();
          }}
        >
          <Book className="h-8 w-8 text-a11y-purple" aria-hidden="true" />
          <span className="text-xl font-bold">AccessLearn</span>
          <span className="sr-only">Home</span>
        </a>

        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        
        <nav>
          <ul className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={handleSettingsClick}
                    className="focus-ring touch-target flex items-center gap-2"
                    aria-label="Accessibility settings"
                  >
                    <Settings className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden md:inline">Settings</span>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="focus-ring touch-target flex items-center gap-2"
                    aria-label="Log out"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden md:inline">Log out</span>
                  </Button>
                </li>
                <li>
                  <div className="ml-4 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-a11y-purple flex items-center justify-center text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2 hidden md:inline font-medium">{user.name}</span>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/auth")}
                  className="focus-ring touch-target"
                >
                  Login / Register
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AccessibleHeader;
