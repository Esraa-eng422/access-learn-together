import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book, FileText, Settings, Users } from "lucide-react";
import AccessibleHeader from "@/components/AccessibleHeader";
import { useAuth } from "@/contexts/AuthContext";
import { AccessibilityProvider, useAccessibility } from "@/contexts/AccessibilityContext";
import AuthForms from "@/components/AuthForms";
import AccessibilitySettings from "@/components/AccessibilitySettings";
import LearningModule from "@/components/LearningModule";

// Sample learning module data
const sampleModules = [
  {
    id: "module1",
    title: "Introduction to Web Accessibility",
    description: "Learn the basics of web accessibility and why it matters",
    category: "Accessibility",
    level: "Beginner",
    duration: "30 min",
    progress: 0,
  },
  {
    id: "module2",
    title: "Accessible Navigation Design",
    description: "How to create navigation systems that work for everyone",
    category: "Design",
    level: "Intermediate",
    duration: "45 min",
    progress: 0,
  },
  {
    id: "module3",
    title: "Color Theory for Accessibility",
    description: "Learn how to choose colors that work for all users",
    category: "Design",
    level: "Beginner",
    duration: "25 min",
    progress: 0,
  },
];

const MainContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { speak } = useAccessibility();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };
  
  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    speak(`Selected module: ${sampleModules.find(m => m.id === moduleId)?.title}`);
  };
  
  const filteredModules = activeTab === "all" 
    ? sampleModules 
    : sampleModules.filter(module => module.category.toLowerCase() === activeTab);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AccessibleHeader onOpenSettings={handleOpenSettings} />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {!isAuthenticated ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-4">Learning Accessible for Everyone</h1>
                  <p className="text-xl text-muted-foreground max-w-md">
                    AccessLearn helps students with different learning needs access educational content through a customizable interface.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-a11y-purple/10">
                      <Settings className="h-5 w-5 text-a11y-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accessibility First</h3>
                      <p className="text-muted-foreground">Customize fonts, colors, and navigation to fit your needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-a11y-purple/10">
                      <Book className="h-5 w-5 text-a11y-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Adapted Learning Materials</h3>
                      <p className="text-muted-foreground">Access content in multiple formats including text, audio, and visual.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-a11y-purple/10">
                      <FileText className="h-5 w-5 text-a11y-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">Progress at Your Pace</h3>
                      <p className="text-muted-foreground">Take quizzes and track your learning journey.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <AuthForms />
              </div>
            </div>
          ) : (
            <div className="py-8">
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
              <p className="text-muted-foreground mb-8">Continue your learning journey</p>
              
              {selectedModule ? (
                <>
                  <Button 
                    variant="outline" 
                    className="mb-6 focus-ring touch-target"
                    onClick={() => {
                      setSelectedModule(null);
                      speak("Returned to module list");
                    }}
                  >
                    ← Back to Modules
                  </Button>
                  <LearningModule />
                </>
              ) : (
                <>
                  <Tabs 
                    defaultValue="all" 
                    value={activeTab}
                    onValueChange={(value) => {
                      setActiveTab(value);
                      speak(`Filtering by ${value} category`);
                    }}
                    className="mb-6"
                  >
                    <TabsList className="mb-4">
                      <TabsTrigger value="all" className="focus-ring touch-target">All Topics</TabsTrigger>
                      <TabsTrigger value="accessibility" className="focus-ring touch-target">Accessibility</TabsTrigger>
                      <TabsTrigger value="design" className="focus-ring touch-target">Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredModules.map(module => (
                          <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{module.category}</Badge>
                                <Badge>{module.level}</Badge>
                              </div>
                              <CardTitle className="line-clamp-2">{module.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center text-sm mb-4">
                                <span>Duration: {module.duration}</span>
                                <span>Progress: {module.progress}%</span>
                              </div>
                              <Button 
                                className="w-full focus-ring touch-target"
                                onClick={() => handleModuleSelect(module.id)}
                              >
                                Start Learning
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="accessibility" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredModules.map(module => (
                          <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{module.category}</Badge>
                                <Badge>{module.level}</Badge>
                              </div>
                              <CardTitle className="line-clamp-2">{module.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center text-sm mb-4">
                                <span>Duration: {module.duration}</span>
                                <span>Progress: {module.progress}%</span>
                              </div>
                              <Button 
                                className="w-full focus-ring touch-target"
                                onClick={() => handleModuleSelect(module.id)}
                              >
                                Start Learning
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="design" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredModules.map(module => (
                          <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{module.category}</Badge>
                                <Badge>{module.level}</Badge>
                              </div>
                              <CardTitle className="line-clamp-2">{module.title}</CardTitle>
                              <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center text-sm mb-4">
                                <span>Duration: {module.duration}</span>
                                <span>Progress: {module.progress}%</span>
                              </div>
                              <Button 
                                className="w-full focus-ring touch-target"
                                onClick={() => handleModuleSelect(module.id)}
                              >
                                Start Learning
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-muted py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2025 AccessLearn. Committed to accessible education for everyone.
            </p>
            <div className="flex items-center gap-4">
              <Button 
                variant="link" 
                size="sm" 
                className="focus-ring"
                onClick={() => speak("Privacy Policy page would open here")}
              >
                Privacy Policy
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="focus-ring"
                onClick={() => speak("Terms of Service page would open here")}
              >
                Terms of Service
              </Button>
              <Button 
                variant="link" 
                size="sm"
                className="focus-ring"
                onClick={handleOpenSettings}
              >
                Accessibility
              </Button>
            </div>
          </div>
        </div>
      </footer>
      
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

const Index: React.FC = () => {
  return (
    <MainContent />
  );
};

export default Index;
