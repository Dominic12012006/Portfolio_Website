import SubpageLayout from "@/components/common/SubpageLayout";
import AboutCanvas from "@/components/about/AboutCanvas";

export default function AboutPage() {
  return (
    <SubpageLayout
      hideHeader
      hideFooter
      containerClassName="h-[calc(100svh-var(--navbar-height))] max-h-[calc(100svh-var(--navbar-height))] overflow-hidden p-0"
      contentClassName="w-full h-full max-w-none p-0 space-y-0"
    >
      <AboutCanvas />
    </SubpageLayout>
  );
}
