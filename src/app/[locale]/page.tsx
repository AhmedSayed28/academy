import { FeaturedCoursesSection } from "@/features/homepage/components/featured-courses-section";
import { FaqPreviewSection } from "@/features/homepage/components/faq-preview-section";
import { FinalCtaSection } from "@/features/homepage/components/final-cta-section";
import { HeroSection } from "@/features/homepage/components/hero-section";
import { LearningJourneySection } from "@/features/homepage/components/learning-journey-section";
import { LearningTracksSection } from "@/features/homepage/components/learning-tracks-section";
import { WhyAcademySection } from "@/features/homepage/components/why-academy-section";
import { resolveDictionary } from "@/i18n/server";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);
  return createPageMetadata({ ...dictionary.metadata.home, path: "/", locale });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dictionary } = await resolveDictionary(params);

  return (
    <>
      <HeroSection copy={dictionary.home.hero} />
      <LearningTracksSection locale={locale} copy={dictionary.home.tracks} />
      <FeaturedCoursesSection locale={locale} copy={dictionary.home.featured} />
      <WhyAcademySection copy={dictionary.home.why} />
      <LearningJourneySection copy={dictionary.home.journey} />
      <FaqPreviewSection locale={locale} copy={dictionary.home.faq} />
      <FinalCtaSection locale={locale} copy={dictionary.home.finalCta} />
    </>
  );
}
