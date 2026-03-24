import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Stats } from "@/components/landing/stats";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
    </>
  );
}
