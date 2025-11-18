import React from "react";
import { Card } from "@/components/ui/card";
import { FormField } from "./FormField";

interface Question {
  id: string;
  order: number;
  question: string;
  question_info: string;
  type: string;
  required: boolean;
  options?: { label: string; value: string }[];
}

interface SubSection {
  id: string;
  order: number;
  sub_section_name: string;
  sub_section_info: string;
  questions: Question[];
}

interface FormSectionProps {
  sectionName: string;
  subSections: SubSection[];
  formData: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
  errors: Record<string, string>;
  currentSection?: number;
  totalSections?: number;
}

export const FormSection: React.FC<FormSectionProps> = ({
  sectionName,
  subSections,
  formData,
  onChange,
  errors,
  currentSection,
  totalSections,
}) => {
  return (
    <div className="relative">
      {/* Section Counter */}
      

      <div className="text-center">
        <h2 className="text-3xl font-bold text-black">{sectionName}</h2>
      </div>

      {currentSection !== undefined && totalSections !== undefined && (
        <div className="lg:hidden absolute flex-col gap-1 top-4 right-4 flex items-end justify-end mb-4 ">
            <span className="bg-red-600 rounded-full tracking-tight px-2 py-[2px] text-xs font-bold text-white w-fit">
              Step {currentSection}/{totalSections}
            </span>
        </div>
      )}

      {subSections
        .sort((a, b) => a.order - b.order)
        .map((subSection) => (
          <Card key={subSection.id} className="p-6 md:p-8 bg-white shadow-md">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {subSection.sub_section_name}
                </h3>
                {subSection.sub_section_info && (
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {subSection.sub_section_info}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {subSection.questions
                  .sort((a, b) => a.order - b.order)
                  .map((question) => (
                    <FormField
                      key={question.id}
                      id={question.id}
                      label={question.question}
                      info={question.question_info}
                      type={question.type}
                      required={question.required}
                      options={question.options}
                      value={formData[question.id] || ""}
                      onChange={(value) => onChange(question.id, value)}
                      error={errors[question.id]}
                    />
                  ))}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

