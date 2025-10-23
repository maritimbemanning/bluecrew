import SiteLayout from "./components/SiteLayout";
import ContactSection from "./components/home/ContactSection";
import CrewStories from "./components/home/CrewStories";
import Hero from "./components/home/Hero";
import JobsHighlight from "./components/home/JobsHighlight";
import JourneySection from "./components/home/JourneySection";
import ProcessSection from "./components/home/ProcessSection";
import ServiceCards from "./components/home/ServiceCards";
import StorySection from "./components/home/StorySection";

export default function Page() {
  return (
    <SiteLayout active="home">
      <Hero />
      <StorySection />
      <ProcessSection />
      <ServiceCards />
      <CrewStories />
      <JobsHighlight />
      <JourneySection />
      <ContactSection />
    </SiteLayout>
  );
}
