import type { Metadata } from "next";

import { FeaturedCoursesSection } from "@/features/homepage/components/featured-courses-section";
import { FaqPreviewSection } from "@/features/homepage/components/faq-preview-section";
import { FinalCtaSection } from "@/features/homepage/components/final-cta-section";
import { HeroSection } from "@/features/homepage/components/hero-section";
import { LearningJourneySection } from "@/features/homepage/components/learning-journey-section";
import { LearningTracksSection } from "@/features/homepage/components/learning-tracks-section";
import { WhyAcademySection } from "@/features/homepage/components/why-academy-section";

export const metadata: Metadata = {
  title: "Practical Technology Education",
  description:
    "Explore structured technology learning tracks built around practical skills, real-world application, and career-oriented development.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <LearningTracksSection />
      <FeaturedCoursesSection />
      <WhyAcademySection />
      <LearningJourneySection />
      <FaqPreviewSection />
      <FinalCtaSection />
    </>
  );
}
