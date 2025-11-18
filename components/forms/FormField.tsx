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
                }
              }}
              className="cursor-pointer"
            />
            {value && (
              <p className="text-sm text-green-600">Uploaded: {value}</p>
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

