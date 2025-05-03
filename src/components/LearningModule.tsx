
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Volume2 } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ModuleContent {
  title: string;
  description: string;
  content: string;
  image?: string;
  quiz: QuizQuestion[];
}

// Sample module data
const sampleModule: ModuleContent = {
  title: "Introduction to Web Accessibility",
  description: "Learn the basics of web accessibility and why it matters",
  content: `
    <h2>What is Web Accessibility?</h2>
    <p>Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. More specifically, people can:</p>
    <ul>
      <li>perceive, understand, navigate, and interact with the Web</li>
      <li>contribute to the Web</li>
    </ul>
    
    <h2>Why is Accessibility Important?</h2>
    <p>The Web is fundamentally designed to work for all people, whatever their hardware, software, language, location, or ability. When the Web meets this goal, it is accessible to people with a diverse range of hearing, movement, sight, and cognitive ability.</p>
    
    <h2>Key Principles of Accessibility</h2>
    <p>The Web Content Accessibility Guidelines (WCAG) are organized around four principles:</p>
    <ol>
      <li><strong>Perceivable</strong> - Information and user interface components must be presentable to users in ways they can perceive.</li>
      <li><strong>Operable</strong> - User interface components and navigation must be operable.</li>
      <li><strong>Understandable</strong> - Information and the operation of user interface must be understandable.</li>
      <li><strong>Robust</strong> - Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.</li>
    </ol>
  `,
  quiz: [
    {
      id: 1,
      question: "What does web accessibility primarily focus on?",
      options: [
        "Making websites load faster",
        "Making websites work for people with disabilities",
        "Making websites more visually appealing",
        "Making websites compatible with all browsers"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which of the following is NOT one of the four main principles of WCAG?",
      options: [
        "Perceivable",
        "Operable",
        "Affordable",
        "Robust"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Why is providing text alternatives for images an important accessibility practice?",
      options: [
        "It helps search engines index the content",
        "It makes the website load faster",
        "It allows people using screen readers to understand the image content",
        "It reduces the file size of the website"
      ],
      correctAnswer: 2
    }
  ]
};

const LearningModule: React.FC = () => {
  const { speak, textToSpeech } = useAccessibility();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [progress, setProgress] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update progress
    if (value === "content" && progress < 50) {
      setProgress(50);
    } else if (value === "quiz" && progress < 50) {
      setProgress(50);
    }
    
    // Announce tab change for screen readers
    speak(value === "content" ? "Content tab selected" : "Quiz tab selected");
  };
  
  const handleSpeakContent = () => {
    speak(sampleModule.content.replace(/<[^>]*>?/gm, ''));
  };
  
  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };
  
  const handleQuizSubmit = () => {
    // Check if all questions are answered
    const allAnswered = sampleModule.quiz.every(q => quizAnswers[q.id] !== undefined);
    
    if (!allAnswered) {
      toast({
        title: "Quiz Incomplete",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      speak("Quiz Incomplete. Please answer all questions before submitting.");
      return;
    }
    
    // Calculate score
    const totalQuestions = sampleModule.quiz.length;
    let correctAnswers = 0;
    
    sampleModule.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizSubmitted(true);
    setProgress(100);
    
    toast({
      title: "Quiz Submitted",
      description: `Your score: ${score}%. You got ${correctAnswers} out of ${totalQuestions} questions correct.`,
    });
    
    speak(`Quiz Submitted. Your score is ${score} percent. You got ${correctAnswers} out of ${totalQuestions} questions correct.`);
  };
  
  const contentSections = sampleModule.content.split('<h2>');
  
  const handleNextSection = () => {
    if (currentSection < contentSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      
      // Extract section title for announcement
      const sectionTitle = contentSections[currentSection + 1].split('</h2>')[0];
      speak(`Section: ${sectionTitle}`);
      
      // Update progress
      const newProgress = Math.min(50, Math.round(((currentSection + 1) / (contentSections.length - 1)) * 50));
      setProgress(newProgress);
    }
  };
  
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      
      // Extract section title for announcement
      const sectionTitle = contentSections[currentSection - 1].split('</h2>')[0];
      speak(`Section: ${sectionTitle}`);
      
      // Update progress
      const newProgress = Math.min(50, Math.round(((currentSection - 1) / (contentSections.length - 1)) * 50));
      setProgress(newProgress);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{sampleModule.title}</CardTitle>
            <CardDescription>{sampleModule.description}</CardDescription>
          </div>
          {textToSpeech && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSpeakContent}
              className="focus-ring touch-target"
              aria-label="Read content aloud"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Progress value={progress} className="h-2" aria-label={`Module progress: ${progress}%`} />
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="content" className="focus-ring touch-target">Content</TabsTrigger>
            <TabsTrigger value="quiz" className="focus-ring touch-target">Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="focus:outline-none">
            <div className="prose max-w-none readable-text">
              {currentSection === 0 ? (
                <div dangerouslySetInnerHTML={{ __html: `<h2>${sampleModule.title}</h2>` + contentSections[0] }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: `<h2>${contentSections[currentSection].split('</h2>')[0]}</h2>${contentSections[currentSection].split('</h2>')[1]}` }} />
              )}
            </div>
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevSection} 
                disabled={currentSection === 0}
                className="focus-ring touch-target"
              >
                Previous Section
              </Button>
              <Button 
                onClick={handleNextSection} 
                disabled={currentSection === contentSections.length - 1}
                className="focus-ring touch-target"
              >
                Next Section
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="quiz" className="focus:outline-none">
            <div className="space-y-8">
              {sampleModule.quiz.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-medium">Question {index + 1}: {question.question}</h3>
                  <RadioGroup 
                    value={quizAnswers[question.id]?.toString()} 
                    onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                    className="space-y-2"
                    disabled={quizSubmitted}
                  >
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <Radio
                          id={`q${question.id}-option${optIndex}`}
                          value={optIndex.toString()}
                          className="focus-ring"
                          disabled={quizSubmitted}
                        />
                        <Label 
                          htmlFor={`q${question.id}-option${optIndex}`}
                          className={quizSubmitted ? 
                            (optIndex === question.correctAnswer ? 
                              'text-green-600 font-medium' : 
                              quizAnswers[question.id] === optIndex ? 
                                'text-red-600' : '') : ''}
                        >
                          {option}
                          {quizSubmitted && optIndex === question.correctAnswer && ' ✓'}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {quizSubmitted && quizAnswers[question.id] !== question.correctAnswer && (
                    <p className="text-sm text-red-600">
                      The correct answer is: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
              
              {!quizSubmitted && (
                <Button 
                  onClick={handleQuizSubmit} 
                  className="w-full mt-6 focus-ring touch-target"
                >
                  Submit Quiz
                </Button>
              )}
              
              {quizSubmitted && (
                <div className="p-4 mt-4 bg-muted rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Quiz Results</h3>
                  <p>
                    You've completed this module! Check your answers above.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Module 1 of 5</p>
          {progress === 100 && (
            <Button className="focus-ring touch-target">Next Module</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LearningModule;
