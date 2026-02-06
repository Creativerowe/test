"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DESIGNER_NAMES = [
  "Pixel Whisperer",
  "Layout Alchemist",
  "Type Tactician",
  "Grid Navigator",
  "Contrast Crafter",
  "Flow Architect",
  "Figma Sorcerer",
  "Interface Sculptor",
  "Human-Centered Sage",
  "Design Systems Ranger",
  "Prototype Pilot",
  "Interaction Gardener",
  "Color Storyteller",
  "Journey Mapper",
  "Microcopy Bard",
  "Spacing Strategist",
  "Component Conductor",
  "Accessibility Ally",
  "Experience Cartographer",
  "Behavioral Designer",
  "Insight Weaver",
  "Motion Minimalist",
  "Product Storysmith",
  "Cognitive Shaper",
  "Usability Whisperer",
  "Pattern Librarian",
  "Usability Detective",
  "Problem Framer",
  "Vibe Curator",
  "Brand-UX Translator",
  "Interaction Poet",
  "Future-Facing Designer",
];

export default function Home() {
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = () => {
    let nextName = currentName ?? "";
    if (DESIGNER_NAMES.length > 1) {
      while (nextName === currentName) {
        nextName =
          DESIGNER_NAMES[Math.floor(Math.random() * DESIGNER_NAMES.length)];
      }
    }

    setCurrentName(nextName);
    setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!currentName) return;
    await navigator.clipboard.writeText(currentName);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1200);
  };

  useEffect(() => {
    if (!currentName) return;
    setIsAnimating(true);
    const timer = window.setTimeout(() => setIsAnimating(false), 200);
    return () => window.clearTimeout(timer);
  }, [currentName]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] px-6 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center">
        <Card className="w-full border-slate-200 bg-white shadow-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-semibold">
              What type of designer are you?
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Click Generate to get a new designer name.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-slate-900"
              onClick={handleGenerate}
            >
              Generate
            </Button>

            {currentName && (
              <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div
                  className={`text-3xl font-semibold transition-all duration-200 ease-out sm:text-4xl ${
                    isAnimating
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {currentName}
                </div>
                <div>
                  <Button variant="secondary" onClick={handleCopy}>
                    {isCopied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
