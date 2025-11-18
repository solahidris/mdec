import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import deRantauData from "@/lib/data-sample/de-rantau.json";

const DERantauApplicationPage = () => {
  return <ApplicationForm programName="DE Rantau" programData={deRantauData as any} />;
};

export default DERantauApplicationPage;

