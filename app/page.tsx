"use client";

import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

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
  "Experience Alchemist",
  "Interface Astronaut",
  "Flow Mechanic",
  "Prototype Wrangler",
  "Journey Storyboarder",
  "Clarity Crafter",
  "Signal Seeker",
  "Moment Architect",
  "Interaction Magician",
  "Feedback Whisperer",
  "Product Pathfinder",
  "Meaning Maker",
  "Frictions Finder",
  "Vision Tuner",
  "Concept Cartographer",
  "Trust Builder",
  "Handoff Hero",
  "Delight Engineer",
  "Intent Interpreter",
  "Pattern Poet",
  "Research Ranger",
  "Experience Pilot",
  "Value Sculptor",
  "Empathy Operator",
  "Prototype Nomad",
  "Chaos Tamer",
  "Pixel Gremlin",
  "Button Therapist",
  "Wireframe Wizard",
  "Moodboard DJ",
  "Margin Magician",
  "Friction Farmer",
  "Scroll Shaman",
  "Gradient Goblin",
  "Component Chef",
  "Persona Whisperer",
  "Prototype Prankster",
  "Layout Librarian",
  "Sticky Note Prophet",
  "Flowchart Comedian",
  "Sitemap Sorcerer",
  "UX Bard",
  "Skeuomorph Slinger",
  "Pixel Penguin",
  "Journey Juggler",
  "Tooltip Tamer",
  "Design Debunker",
  "Cognitive Clown",
  "Usability Unicorn",
  "Layout Llama",
];

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY ?? "";

const GIF_KEYWORDS: Record<string, string> = {
  "Pixel Whisperer": "pixel art",
  "Layout Alchemist": "alchemy",
  "Type Tactician": "typography",
  "Grid Navigator": "grid",
  "Contrast Crafter": "contrast",
  "Flow Architect": "architecture",
  "Figma Sorcerer": "wizard",
  "Interface Sculptor": "sculptor",
  "Human-Centered Sage": "zen",
  "Design Systems Ranger": "ranger",
  "Prototype Pilot": "pilot",
  "Interaction Gardener": "gardener",
  "Color Storyteller": "color",
  "Journey Mapper": "map",
  "Microcopy Bard": "bard",
  "Spacing Strategist": "space",
  "Component Conductor": "conductor",
  "Accessibility Ally": "accessibility",
  "Experience Cartographer": "cartographer",
  "Behavioral Designer": "behavior",
  "Insight Weaver": "weaver",
  "Motion Minimalist": "motion",
  "Product Storysmith": "storyteller",
  "Cognitive Shaper": "brain",
  "Usability Whisperer": "whisper",
  "Pattern Librarian": "librarian",
  "Usability Detective": "detective",
  "Problem Framer": "frame",
  "Vibe Curator": "vibes",
  "Brand-UX Translator": "translator",
  "Interaction Poet": "poetry",
  "Future-Facing Designer": "future",
  "Experience Alchemist": "alchemy",
  "Interface Astronaut": "astronaut",
  "Flow Mechanic": "mechanic",
  "Prototype Wrangler": "cowboy",
  "Journey Storyboarder": "storyboard",
  "Clarity Crafter": "clarity",
  "Signal Seeker": "radar",
  "Moment Architect": "architect",
  "Interaction Magician": "magic",
  "Feedback Whisperer": "feedback",
  "Product Pathfinder": "compass",
  "Meaning Maker": "meaning",
  "Frictions Finder": "detective",
  "Vision Tuner": "tuning",
  "Concept Cartographer": "map",
  "Trust Builder": "trust",
  "Handoff Hero": "hero",
  "Delight Engineer": "delight",
  "Intent Interpreter": "translator",
  "Pattern Poet": "poetry",
  "Research Ranger": "ranger",
  "Experience Pilot": "pilot",
  "Value Sculptor": "sculptor",
  "Empathy Operator": "empathy",
  "Prototype Nomad": "traveler",
  "Chaos Tamer": "lion tamer",
  "Pixel Gremlin": "gremlin",
  "Button Therapist": "therapy",
  "Wireframe Wizard": "wireframe",
  "Moodboard DJ": "dj",
  "Margin Magician": "magic",
  "Friction Farmer": "farmer",
  "Scroll Shaman": "shaman",
  "Gradient Goblin": "goblin",
  "Component Chef": "chef",
  "Persona Whisperer": "persona",
  "Prototype Prankster": "prank",
  "Layout Librarian": "librarian",
  "Sticky Note Prophet": "sticky note",
  "Flowchart Comedian": "comedy",
  "Sitemap Sorcerer": "map",
  "UX Bard": "bard",
  "Skeuomorph Slinger": "retro",
  "Pixel Penguin": "penguin",
  "Journey Juggler": "juggler",
  "Tooltip Tamer": "tamer",
  "Design Debunker": "detective",
  "Cognitive Clown": "clown",
  "Usability Unicorn": "unicorn",
  "Layout Llama": "llama",
};

const RETRO_KEYWORDS = [
  "retro",
  "vaporwave",
  "8-bit",
  "pixel art",
  "arcade",
  "crt",
  "neon",
];

export default function Home() {
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifAlt, setGifAlt] = useState("");
  const [isGifLoading, setIsGifLoading] = useState(false);
  const [gifLoadCount, setGifLoadCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const lastGifIdRef = useRef<string | null>(null);
  const gsapRef = useRef<null | typeof import("gsap")["gsap"]>(null);

  const handleGenerate = () => {
    let nextName =
      DESIGNER_NAMES[Math.floor(Math.random() * DESIGNER_NAMES.length)];
    if (currentName && DESIGNER_NAMES.length > 1) {
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

  const handleGifLoad = () => {
    setGifLoadCount((prev) => prev + 1);
  };

  const handleBounceEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    gsap.killTweensOf(event.currentTarget);
    gsap.fromTo(
      event.currentTarget,
      { scale: 1 },
      { scale: 1.05, duration: 0.2, ease: "back.out(2.6)" }
    );
  };

  const handleBounceLeave: MouseEventHandler<HTMLButtonElement> = (event) => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    let isActive = true;
    void import("gsap").then(({ gsap }) => {
      if (!isActive) return;
      gsapRef.current = gsap;
    });

    return () => {
      isActive = false;
      gsapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [hasMounted, isDark]);

  useEffect(() => {
    if (!currentName) {
      setGifUrl(null);
      setGifAlt("");
      setIsGifLoading(false);
      return;
    }
    if (!GIPHY_API_KEY) return;

    const keyword = GIF_KEYWORDS[currentName] ?? currentName;
    const retroKeyword =
      RETRO_KEYWORDS[Math.floor(Math.random() * RETRO_KEYWORDS.length)];
    const retroQuery = `${retroKeyword} ${keyword} retro`;
    const controller = new AbortController();
    const offset = Math.floor(Math.random() * 100);

    const fetchGifs = async (query: string) => {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          query
        )}&limit=25&offset=${offset}&rating=pg&lang=en`,
        { signal: controller.signal }
      );
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    };

    const fetchRandomGif = async (query: string) => {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${encodeURIComponent(
          query
        )}&rating=pg`,
        { signal: controller.signal }
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data?.data ?? null;
    };

    setIsGifLoading(true);
    void (async () => {
      const queries = [
        retroQuery,
        `${retroKeyword} ${keyword}`,
        `${keyword} retro`,
      ];
      const textSignals = [
        "meme",
        "quote",
        "caption",
        "text",
        "says",
        "say",
        "saying",
        "words",
        "lyrics",
        "dialogue",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const hasTextSignal = (gif: {
        title?: string;
        slug?: string;
        username?: string;
        source?: string;
        tags?: string[];
      }) => {
        const haystack = [
          gif?.title,
          gif?.slug,
          gif?.username,
          gif?.source,
          ...(gif?.tags ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return textSignals.some((signal) => haystack.includes(signal));
      };

      let gifs: Array<{
        id: string;
        images?: {
          original?: { width?: string; height?: string };
          downsized?: { width?: string; height?: string; url?: string };
        };
        title?: string;
      }> = [];
      for (const query of queries) {
        gifs = await fetchGifs(query);
        if (gifs.length) break;
      }

      if (!gifs.length) {
        const fallback = await fetchRandomGif(retroQuery);
        if (!fallback) {
          setGifUrl(null);
          setGifAlt("");
          return;
        }
        lastGifIdRef.current = fallback?.id ?? null;
        setGifUrl(
          fallback?.images?.downsized?.url ??
            fallback?.images?.original?.url ??
            null
        );
        setGifAlt(fallback?.title || currentName);
        return;
      }

      const toRatio = (gif: (typeof gifs)[number]) => {
        const width = Number(
          gif?.images?.original?.width ?? gif?.images?.downsized?.width
        );
        const height = Number(
          gif?.images?.original?.height ?? gif?.images?.downsized?.height
        );
        if (!width || !height) return null;
        return width / height;
      };

      const scored = gifs
        .map((gif) => {
          const ratio = toRatio(gif);
          return { gif, ratio, score: ratio ? Math.abs(ratio - 1) : 999 };
        })
        .filter((item) => item.ratio !== null);

      const nearSquare = scored.filter(
        (item) => item.ratio !== null && item.ratio > 0.85 && item.ratio < 1.15
      );
      const withoutText = nearSquare.filter((item) => !hasTextSignal(item.gif));
      const pool =
        withoutText.length > 0 ? withoutText : nearSquare.length ? nearSquare : scored;
      pool.sort((a, b) => a.score - b.score);

      const top = pool.slice(0, Math.min(6, pool.length)).map((item) => item.gif);
      let gif = top.length
        ? top[Math.floor(Math.random() * top.length)]
        : gifs[Math.floor(Math.random() * gifs.length)];

      if (gifs.length > 1 && gif?.id === lastGifIdRef.current) {
        gif = top.find((item) => item.id !== gif?.id) ?? gif;
      }
      lastGifIdRef.current = gif?.id ?? null;
      setGifUrl(
        gif?.images?.downsized?.url ?? gif?.images?.original?.url ?? null
      );
      setGifAlt(gif?.title || currentName);
    })()
      .catch(() => {
        if (!controller.signal.aborted) {
          setGifUrl(null);
          setGifAlt("");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsGifLoading(false);
        }
      });

    return () => controller.abort();
  }, [currentName]);

  useEffect(() => {
    if (!gifUrl || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const runGlitch = (gsap: typeof import("gsap")["gsap"]) => {
      if (!containerRef.current) return null;
      return gsap.context(() => {
        const layers = Array.from(
          containerRef.current?.querySelectorAll<HTMLElement>(".js-gif-layer") ??
            []
        );
        if (!layers.length) return;

        const tl = gsap.timeline();
        tl.set(layers, { opacity: 0, x: 0, y: 0 })
          .to(layers, { opacity: 0.6, duration: 0.06, ease: "power1.out" })
          .to(layers, {
            x: (index) => (index % 2 === 0 ? -8 : 8),
            y: (index) => (index % 2 === 0 ? 4 : -4),
            duration: 0.08,
            ease: "power1.inOut",
          })
          .to(layers, { x: 0, y: 0, duration: 0.12, ease: "power2.out" })
          .to(
            layers,
            { opacity: 0, duration: 0.2, ease: "power2.out" },
            "-=0.08"
          );
      }, containerRef);
    };

    if (gsapRef.current) {
      const ctx = runGlitch(gsapRef.current);
      return () => ctx?.revert();
    }

    let isActive = true;
    let ctx: { revert: () => void } | null = null;

    void import("gsap").then(({ gsap }) => {
      if (!isActive) return;
      gsapRef.current = gsap;
      ctx = runGlitch(gsap);
    });

    return () => {
      isActive = false;
      ctx?.revert();
    };
  }, [gifLoadCount, gifUrl]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | null = null;
    let isActive = true;

    void import("gsap").then(({ gsap }) => {
      if (!isActive || !containerRef.current) return;
      ctx = gsap.context(() => {
        gsap.from(".js-animate", {
          opacity: 0,
          y: 16,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
        });
      }, containerRef);
    });

    return () => {
      isActive = false;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (!currentName || !resultRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isActive = true;
    void import("gsap").then(({ gsap }) => {
      if (!isActive || !resultRef.current) return;
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    });

    return () => {
      isActive = false;
    };
  }, [currentName]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-background px-6 py-24 text-foreground sm:py-32 lg:py-36"
    >
      <div className="hero-orb hero-orb--left" aria-hidden="true" />
      <div className="hero-orb hero-orb--right" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <Card className="w-full border-transparent bg-transparent shadow-none">
          <CardHeader className="space-y-2 text-center">
            <div className="js-animate flex w-full items-center justify-center gap-3">
              <Moon
                className={`size-4 ${isDark ? "text-foreground" : "text-muted-foreground"}`}
                aria-hidden="true"
              />
              <Switch
                checked={isDark}
                onCheckedChange={setIsDark}
                aria-label="Toggle color mode"
              />
              <Sun
                className={`size-4 ${isDark ? "text-muted-foreground" : "text-foreground"}`}
                aria-hidden="true"
              />
            </div>
            <CardTitle className="js-animate text-balance font-sans text-[28px] font-medium text-foreground">
              What type of designer are you?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-10 text-center sm:gap-12">
            {currentName && (
              <div
                ref={resultRef}
                className="js-animate flex w-full flex-col items-center gap-6"
              >
                <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-3 shadow-sm">
                  <div className="js-gif-glitch size-56 bg-muted sm:size-64">
                    {gifUrl ? (
                      <img
                        src={gifUrl}
                        alt={gifAlt || "Designer reaction gif"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onLoad={handleGifLoad}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase text-muted-foreground">
                        {isGifLoading ? "Loading gif" : "Gif unavailable"}
                      </div>
                    )}
                    <div
                      className="js-gif-layer js-gif-layer--red"
                      aria-hidden="true"
                    />
                    <div
                      className="js-gif-layer js-gif-layer--blue"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="text-5xl font-semibold text-balance leading-[1.05] pb-1 sm:text-6xl lg:text-7xl">
                  {currentName}
                </div>
              </div>
            )}
            <div className="js-animate flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="js-bounce-btn js-bounce-generate rounded-full border border-foreground/20 bg-foreground! px-8 py-5 text-sm font-medium text-background! shadow-sm transition-[background-color,border-color,box-shadow,color] duration-200 hover:border-foreground/40 hover:bg-foreground/90! hover:shadow-md active:border-foreground/60 active:bg-foreground/80! active:shadow-sm sm:text-base"
                onClick={handleGenerate}
                onMouseEnter={handleBounceEnter}
                onMouseLeave={handleBounceLeave}
              >
                Generate
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="js-bounce-btn js-bounce-copy rounded-full border border-border/70 px-6 text-sm font-medium text-muted-foreground shadow-xs transition-[background-color,border-color,box-shadow,color] duration-200 hover:border-border hover:bg-muted/60 hover:text-foreground hover:shadow-sm active:bg-muted/80 active:shadow-inner sm:text-base"
                onClick={handleCopy}
                onMouseEnter={handleBounceEnter}
                onMouseLeave={handleBounceLeave}
                disabled={!currentName}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
