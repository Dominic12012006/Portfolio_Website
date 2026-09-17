import HomeCanvas from "@/components/home/HomeCanvas";
import InfiniteSpiral from "@/components/effects/InfiniteSpiral";
import { SPIRAL_IMAGES } from "@/data/spiralImages";
import { LAYOUT_CONFIG } from "@/data/layout";

export default function HomePage() {
  return (
    <main className="w-full h-full flex-1 overflow-hidden">
      <HomeCanvas>
        <InfiniteSpiral
          items={SPIRAL_IMAGES}
          speed={LAYOUT_CONFIG.spiral.speed}
          direction={LAYOUT_CONFIG.spiral.direction}
          radius={LAYOUT_CONFIG.spiral.radius}
          cardWidth={LAYOUT_CONFIG.spiral.cardWidth}
          cardHeight={LAYOUT_CONFIG.spiral.cardHeight}
          verticalSpacing={LAYOUT_CONFIG.spiral.verticalSpacing}
          perspective={LAYOUT_CONFIG.spiral.perspective}
          cardsPerTurn={LAYOUT_CONFIG.spiral.cardsPerTurn}
          centerScale={LAYOUT_CONFIG.spiral.centerScale}
          edgeFade={LAYOUT_CONFIG.spiral.edgeFade}
          edgeBlur={LAYOUT_CONFIG.spiral.edgeBlur}
          pauseOnHover={LAYOUT_CONFIG.spiral.pauseOnHover}
        />
      </HomeCanvas>
    </main>
  );
}
