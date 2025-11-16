// src/LuniaPage.tsx
import React from "react";
import { Header } from "../../layouts/AppHeader";
import { LuniaHeroAndSections } from "../../components/LuniaHeroAndSections";
import { HighlightSection } from "../../components/HighlightSection";
import { QuestionFormSection } from "../../components/QuestionFormSection";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import { JoinCircleSection } from "../../components/JoinCircleSection";
import { Footer } from "../../layouts/AppFooter";

export const LuniaPage: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <LuniaHeroAndSections />
      <HighlightSection />
      <QuestionFormSection />
      <TestimonialsSection />
      <JoinCircleSection />
      <Footer />
    </div>
  );
};
