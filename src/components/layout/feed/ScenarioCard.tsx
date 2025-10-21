import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share, Star } from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  author: string;
  rating: number;
  votes: number;
  preview: string;
  category: string;
  timeAgo: string;
  verified?: boolean;
  hot?: boolean;
  trending?: boolean;
  fanFavorite?: boolean;
}

const ScenarioCard = ({ scenario }: { scenario: Scenario }) => (
  <Card
    className="bg-[#161513] border-[#403C39] hover:border-[#D4A373] transition-all cursor-pointer group"
    // onClick={() => handleScenarioClick(scenario)}
  >
    <CardContent className="p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <Badge
            variant="outline"
            className="border-[#D4A373] text-[#D4A373] text-xs"
          >
            {scenario.category}
          </Badge>
          <div className="flex gap-1">
            {scenario.hot && (
              <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
            )}
            {scenario.trending && (
              <Badge className="bg-green-500 text-white text-xs">
                TRENDING
              </Badge>
            )}
            {scenario.fanFavorite && (
              <Badge className="bg-[#D4A373] text-[#1E1D1B] text-xs">
                Fan Favorite
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#403C39] hover:text-[#D4A373] p-1"
        >
          <Heart size={16} />
        </Button>
      </div>

      {/* Title and Author */}
      <h3 className="text-lg md:text-xl font-bold text-[#E7E0D6] group-hover:text-[#D4A373] transition-colors mb-2 line-clamp-2">
        {scenario.title}
      </h3>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[#D4A373] text-sm font-medium">
          by {scenario.author}
        </span>
        {scenario.verified && (
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
        <span className="text-[#403C39] text-sm">• {scenario.timeAgo}</span>
      </div>

      {/* Preview */}
      <div className="text-[#E7E0D6] text-sm opacity-80 mb-4 leading-relaxed">
        <p className="mb-4">{scenario.preview}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#403C39]">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(scenario.rating)
                    ? "fill-[#D4A373] text-[#D4A373]"
                    : "text-[#403C39]"
                }`}
              />
            ))}
          </div>
          <span className="text-[#E7E0D6] text-xs md:text-sm font-medium">
            {scenario.rating}
          </span>
          <span className="text-[#403C39] text-xs md:text-sm">
            • {(scenario.votes / 1000).toFixed(0)}k votes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#403C39] hover:text-red-500 p-1 transition-colors"
          >
            <MessageCircle size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#403C39] hover:text-blue-500 p-1 transition-colors"
          >
            <Share size={14} />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ScenarioCard;
