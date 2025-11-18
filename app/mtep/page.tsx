import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import mtepData from "@/lib/data-sample/mtep.json";

const MTEPApplicationPage = () => {
  return <ApplicationForm programName="Malaysia Tech Entrepreneur Programme" programData={mtepData as any} />;
};

export default MTEPApplicationPage;

