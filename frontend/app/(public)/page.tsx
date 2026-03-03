import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { CTA } from "@/components/landing/CTA";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <CTA />
    </main>
  );
}
