import SubpageLayout from "@/components/common/SubpageLayout";
import AboutCanvas from "@/components/about/AboutCanvas";

export default function AboutPage() {
  return (
    <SubpageLayout
      badge="[ Section // About ]"
      title="About Me"
      contentClassName="max-w-5xl"
    >
      <AboutCanvas />
    </SubpageLayout>
  );
}
