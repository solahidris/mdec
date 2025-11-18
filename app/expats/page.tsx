import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import expatData from "@/lib/data-sample/expats.json";

const ExpatsApplicationPage = () => {
  return <ApplicationForm programName="Expats" programData={expatData as any} />;
};

export default ExpatsApplicationPage;
