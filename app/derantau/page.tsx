import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { AuthProtectedPage } from "@/components/auth/AuthProtectedPage";
import deRantauData from "@/lib/data-sample/de-rantau.json";

const DERantauApplicationPage = () => {
  return (
    <AuthProtectedPage>
      <ApplicationForm programName="DE Rantau" programData={deRantauData as any} />
    </AuthProtectedPage>
  );
};

export default DERantauApplicationPage;

