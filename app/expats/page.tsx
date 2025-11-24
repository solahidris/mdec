import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { AuthProtectedPage } from "@/components/auth/AuthProtectedPage";
import expatData from "@/lib/data-sample/expats.json";

const ExpatsApplicationPage = () => {
  return (
    <AuthProtectedPage>
      <ApplicationForm programName="Expats" programData={expatData as any} />
    </AuthProtectedPage>
  );
};

export default ExpatsApplicationPage;
