import LeftSide from "@/components/layout/feed/LeftSide";
import RightSide from "@/components/layout/feed/RightSide";
import ScenarioCard from "@/components/layout/feed/ScenarioCard";
import SearchBar from "@/components/layout/feed/SearchBar";
import React from "react";

const Scenarios = () => {
  return (
    <div className="py-24 flex items-start gap-8">
      <LeftSide />
      <div className="w-full flex flex-col gap-8">
        <SearchBar />
        <ScenarioCard
          scenario={{
            title: "Ali",
            author: "Ali",
            category: "",
            id: 0,
            preview: `An alternative ending where Thanos successfully completes his plan. Tony Stark makes the ultimate sacrifice, but it's not enough to stop the Mad Titan. The universe faces a new dark age where the remaining Avengers must find a way to restore balance to reality itself.

The cosmic energies swirled around us as the final battle reached its climax. I could feel the weight of fourteen million futures pressing down on my consciousness. Each decision, each movement, each word spoken could tip the balance between salvation and annihilation.

Thanos stood before us, the completed Infinity Gauntlet gleaming with otherworldly power. But this time, something was different. This time, I had seen beyond the single path to victory that I had previously shown Tony. There was another way—a path that didn't require the ultimate sacrifice.

"You're too late, Strange," Thanos growled, raising his hand to snap his fingers once more.

"Am I?" I replied, and with a gesture that had taken me precisely 14,000,604 attempts to perfect, I opened a portal not to another place, but to another time—to the moment just before he had acquired the Time Stone.

The battlefield erupted in chaos as two realities began to merge. Past and present collided in a symphony of impossible physics. But this was the gambit I had been preparing for across millions of possible futures. This was the one chance where everyone—including Tony Stark—could go home.`,
            rating: 5,
            timeAgo: "",
            votes: 0,
            fanFavorite: true,
            hot: true,
            trending: true,
            verified: true,
          }}
        />
      </div>
      <RightSide />
    </div>
  );
};

export default Scenarios;
