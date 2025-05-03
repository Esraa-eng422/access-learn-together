
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Eye, Type, Volume2, Keyboard, MousePointer } from "lucide-react";

const AccessibilitySettings: React.FC = () => {
  const {
    fontSize,
    colorMode,
    motionReduced,
    textToSpeech,
    keyboardNavigation,
    setFontSize,
    setColorMode,
    setMotionReduced,
    setTextToSpeech,
    setKeyboardNavigation,
    speak,
  } = useAccessibility();

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span role="img" aria-hidden="true" className="text-a11y-purple">
            <Eye className="h-6 w-6" />
          </span>
          Accessibility Settings
        </CardTitle>
        <CardDescription>
          Customize the interface to fit your learning needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="display" className="flex items-center gap-2 focus-ring touch-target">
              <Eye className="h-4 w-4" />
              <span>Display</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2 focus-ring touch-target">
              <Type className="h-4 w-4" />
              <span>Text</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2 focus-ring touch-target">
              <Volume2 className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2 focus-ring touch-target">
              <Keyboard className="h-4 w-4" />
              <span>Navigation</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="display" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Color Mode</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setColorMode("default")}
                  variant={colorMode === "default" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    colorMode === "default" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  Default
                </Button>
                <Button
                  onClick={() => setColorMode("dark")}
                  variant={colorMode === "dark" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    colorMode === "dark" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  Dark Mode
                </Button>
                <Button
                  onClick={() => setColorMode("high-contrast")}
                  variant={colorMode === "high-contrast" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    colorMode === "high-contrast" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  High Contrast
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="motion-reduced" 
                checked={motionReduced}
                onCheckedChange={setMotionReduced}
                className="focus-ring touch-target"
              />
              <Label htmlFor="motion-reduced">Reduce motion and animations</Label>
            </div>
          </TabsContent>
          <TabsContent value="text" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Font Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setFontSize("normal")}
                  variant={fontSize === "normal" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    fontSize === "normal" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  Normal
                </Button>
                <Button
                  onClick={() => setFontSize("large")}
                  variant={fontSize === "large" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    fontSize === "large" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  Large
                </Button>
                <Button
                  onClick={() => setFontSize("x-large")}
                  variant={fontSize === "x-large" ? "default" : "outline"}
                  className={`w-full focus-ring touch-target ${
                    fontSize === "x-large" ? "bg-a11y-purple text-white" : ""
                  }`}
                >
                  Extra Large
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-4 p-4 border rounded-lg bg-secondary">
                <p className="text-size-base">
                  This is a preview of the current font size. You can adjust it to make text easier to read.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="audio" className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch 
                id="text-to-speech" 
                checked={textToSpeech}
                onCheckedChange={setTextToSpeech}
                className="focus-ring touch-target"
              />
              <Label htmlFor="text-to-speech">Enable text-to-speech</Label>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Test text-to-speech</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to test the text-to-speech functionality
              </p>
              <Button 
                onClick={() => speak("This is a test of the text to speech functionality. If you can hear this, it's working correctly.")}
                className="focus-ring touch-target"
                disabled={!textToSpeech}
              >
                Test Speech
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="navigation" className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch 
                id="keyboard-navigation" 
                checked={keyboardNavigation}
                onCheckedChange={setKeyboardNavigation}
                className="focus-ring touch-target"
              />
              <Label htmlFor="keyboard-navigation">Enhanced keyboard navigation</Label>
            </div>
            <div className="p-4 border rounded-lg bg-secondary">
              <h3 className="text-lg font-medium mb-2">Keyboard shortcuts</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Skip to content</span>
                  <kbd className="px-2 py-1 bg-background rounded border">Tab</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Navigate between elements</span>
                  <kbd className="px-2 py-1 bg-background rounded border">Tab</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Select/Activate element</span>
                  <kbd className="px-2 py-1 bg-background rounded border">Enter</kbd>
                </li>
                <li className="flex justify-between">
                  <span>Go back to previous page</span>
                  <div className="flex gap-1">
                    <kbd className="px-2 py-1 bg-background rounded border">Alt</kbd>
                    <kbd className="px-2 py-1 bg-background rounded border">←</kbd>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
