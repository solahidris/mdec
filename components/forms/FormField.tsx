import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps {
  id: string;
  label: string;
  info?: string;
  type: string;
  required: boolean;
  options?: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  info,
  type,
  required,
  options = [],
  value,
  onChange,
  error,
}) => {
  const renderField = () => {
    switch (type) {
      case "Select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "Upload":
        return (
          <div className="space-y-2">
            <Input
              type="file"
              id={id}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file.name);
                } else {
                  // If no file selected, clear the value
                  onChange("");
                }
              }}
              className="cursor-pointer"
            />
            {value && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {value}
              </p>
            )}
          </div>
        );

      case "Input field":
      default:
        return (
          <Input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full"
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </Label>
      
      {info && (
        <p className="text-sm text-gray-600 whitespace-pre-line">{info}</p>
      )}
      
      {renderField()}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

