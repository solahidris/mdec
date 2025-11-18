"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { FormSection } from "@/components/forms/FormSection";
import { ArrowLeft, ArrowRight, CheckCircle, Check } from "lucide-react";

interface Section {
  id: string;
  order: number;
  section_name: string;
  sub_sections: any[];
}

interface ApplicationFormProps {
  programName: string;
  programData: Section[];
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  programName,
  programData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const sections: Section[] = programData;
  const sortedSections = sections.sort((a, b) => a.order - b.order);
  const currentSection = sortedSections[currentStep];
  const sortedSubSections = currentSection.sub_sections.sort((a, b) => a.order - b.order);

  const handleFieldChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentSubSection = () => {
    const newErrors: Record<string, string> = {};
    const currentSubSection = sortedSubSections[currentSubTab];

    currentSubSection.questions.forEach((question: any) => {
      if (question.required && !formData[question.id]?.trim()) {
        newErrors[question.id] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentSection = () => {
    const newErrors: Record<string, string> = {};

    currentSection.sub_sections.forEach((subSection) => {
      subSection.questions.forEach((question: any) => {
        if (question.required && !formData[question.id]?.trim()) {
          newErrors[question.id] = "This field is required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextSubSection = () => {
    if (validateCurrentSubSection()) {
      if (currentSubTab < sortedSubSections.length - 1) {
        setCurrentSubTab((prev) => prev + 1);
        window.scrollTo({ top: 200, behavior: "smooth" });
      }
    }
  };

  const handlePreviousSubSection = () => {
    if (currentSubTab > 0) {
      setCurrentSubTab((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handleNextSection = () => {
    if (validateCurrentSubSection()) {
      if (currentStep < sortedSections.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setCurrentSubTab(0); // Reset to first tab
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePreviousSection = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCurrentSubTab(0); // Reset to first tab
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    if (validateCurrentSection()) {
      console.log(`${programName} Form submitted:`, formData);
      setSubmitted(true);
      // Here you would typically send the data to your backend
    }
  };

  if (submitted) {
    return (
      <Container>
        <Header />

        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-24 w-24 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-black">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for submitting your {programName} application. We will review
              your information and get back to you soon.
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer mt-8 bg-red-600 hover:bg-red-700 text-white"
            >
              Return to Home
            </Button>
          </div>
        </div>

        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header />

      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">
              {programName} Application Form
            </h1>
            <p className="text-gray-600">
              Please fill out all required fields to complete your application.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="mb-4">
            <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex items-start pt-1 relative min-w-max md:min-w-0 md:justify-between">
                {sortedSections.map((section, index) => (
                  <React.Fragment key={section.id}>
                    {/* Step Circle */}
                    <div className="flex flex-col items-center relative z-10 flex-shrink-0">
                      <button
                        onClick={() => {
                          setCurrentStep(index);
                          setCurrentSubTab(0);
                        }}
                        className={`cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                          index < currentStep
                            ? "bg-green-500 text-white shadow-lg hover:bg-green-600"
                            : index === currentStep
                            ? "bg-red-600 text-white shadow-lg ring-4 ring-red-200"
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        }`}
                      >
                        {index < currentStep ? (
                          <Check className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </button>
                      
                      {/* Step Label */}
                      <div className="mt-3 text-center w-[80px] md:w-[100px] lg:w-[140px]">
                        <p
                          className={`text-[9px] md:text-[10px] lg:text-xs font-medium leading-tight ${
                            index <= currentStep
                              ? "text-black"
                              : "text-gray-500"
                          }`}
                        >
                          {section.section_name}
                        </p>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {index < sortedSections.length - 1 && (
                      <div className="flex-shrink-0 w-12 md:flex-1 h-1 relative top-4 md:top-6">
                        <div
                          className={`h-full transition-all duration-300 ${
                            index < currentStep
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Subsection Tabs */}
          <Tabs 
            value={currentSubTab.toString()} 
            onValueChange={(value) => setCurrentSubTab(parseInt(value))}
            className="w-full"
          >
            <TabsList className="w-full justify-start mb-6 bg-white shadow-md p-1 overflow-x-auto h-auto">
              {sortedSubSections.map((subSection, index) => (
                <TabsTrigger
                  key={subSection.id}
                  value={index.toString()}
                  className="px-4 cursor-pointer data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm"
                >
                  {subSection.sub_section_name}
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedSubSections.map((subSection, index) => (
              <TabsContent key={subSection.id} value={index.toString()}>
                <FormSection
                  sectionName=""
                  subSections={[subSection]}
                  formData={formData}
                  onChange={handleFieldChange}
                  errors={errors}
                  currentSection={currentStep + 1}
                  totalSections={sortedSections.length}
                />
              </TabsContent>
            ))}
          </Tabs>

          {/* Sub-section Navigation (within current section) */}
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600 px-4">
            <span>
              Subsection {currentSubTab + 1} of {sortedSubSections.length}
            </span>
            <div className="flex gap-2">
              {currentSubTab > 0 && (
                <Button
                  onClick={handlePreviousSubSection}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer border-0 shadow-md"
                >
                  Previous Tab
                </Button>
              )}
              {currentSubTab < sortedSubSections.length - 1 && (
                <Button
                  onClick={handleNextSubSection}
                  size="sm"
                  className="cursor-pointer bg-red-600 hover:bg-red-700 shadow-md"
                >
                  Next Tab
                </Button>
              )}
            </div>
          </div>

          {/* Main Section Navigation Buttons */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              onClick={handlePreviousSection}
              disabled={currentStep === 0}
              variant="outline"
              className="cursor-pointer w-full sm:w-auto border-0 text-gray-700 hover:bg-gray-100 shadow-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>

            {currentStep < sortedSections.length - 1 ? (
              <Button
                onClick={handleNextSection}
                className="cursor-pointer w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white shadow-md"
              >
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="cursor-pointer w-full sm:w-auto bg-black hover:bg-gray-800 text-white shadow-md"
              >
                Submit Application
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

