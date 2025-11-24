import React from "react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { AuthProtectedPage } from "@/components/auth/AuthProtectedPage";
import mtepData from "@/lib/data-sample/mtep.json";

const MTEPApplicationPage = () => {
  return (
    <AuthProtectedPage>
      <ApplicationForm programName="Malaysia Tech Entrepreneur Programme" programData={mtepData as any} />
    </AuthProtectedPage>
  );
};

export default MTEPApplicationPage;

