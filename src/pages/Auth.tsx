
import React from "react";
import { Navigate } from "react-router-dom";
import AccessibleHeader from "@/components/AccessibleHeader";
import { useAuth } from "@/contexts/AuthContext";
import AuthForms from "@/components/AuthForms";
import AccessibilitySettings from "@/components/AccessibilitySettings";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

const Auth: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };
  
  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AccessibleHeader onOpenSettings={handleOpenSettings} />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Join AccessLearn</h1>
          <AuthForms />
        </div>
      </main>
      
      <Dialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Accessibility Settings</DialogTitle>
          </DialogHeader>
          <AccessibilitySettings />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
