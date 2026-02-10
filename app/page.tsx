"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
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
  "API Whisperer",
  "Stack Stitcher",
  "Feature Forge",
  "Bug Slayer",
  "Pipeline Plumber",
  "Latency Tamer",
  "Schema Shaper",
  "Cache Captain",
  "DevOps Druid",
  "Release Wrangler",
  "CI Conductor",
  "Cloud Cartographer",
  "Terminal Tactician",
  "Patchsmith",
  "Refactor Ranger",
  "Test Harness Hero",
  "Binary Bender",
  "Data Streamer",
  "Script Sorcerer",
  "Merge Master",
  "PR Sherpa",
  "Feature Flagger",
  "Sprint Synthesizer",
  "Backlog Wrangler",
  "System Surgeon",
  "Compile Commander",
  "Dependency Detective",
  "Logline Listener",
  "Observability Oracle",
  "SRE Sage",
  "Uptime Guardian",
  "Error Budgeteer",
  "Runtime Tuner",
  "Algorithm Alchemist",
  "Codebase Cartographer",
  "Edge Case Explorer",
  "Chaos Engineer",
  "Rollback Rider",
  "Incident Wrangler",
  "Token Tinker",
  "API Gatekeeper",
  "Webhook Whisperer",
  "Queue Keeper",
  "Event Loop Evoker",
  "Microservice Maestro",
  "Monolith Mender",
  "Container Conjurer",
  "Kubernetes Knight",
  "Serverless Sage",
  "Infra Gardener",
  "Packet Pathfinder",
  "Network Nomad",
  "Memory Mechanic",
  "Thread Tamer",
  "Query Quencher",
  "SQL Sculptor",
  "NoSQL Navigator",
  "Index Inspector",
  "Latency Locksmith",
  "Bandwidth Baron",
  "Security Sentinel",
  "Auth Architect",
  "Encryption Enchanter",
  "Secrets Shepherd",
  "Keychain Keeper",
  "Build System Bard",
  "Versioning Virtuoso",
  "SemVer Sage",
  "MVP Magician",
  "Roadmap Ranger",
  "User Storysmith",
  "Spec Surgeon",
  "UX-to-Prod Translator",
  "Product Pilot",
  "Feature Shipwright",
  "Schema Sentinel",
  "API Alchemist",
  "Code Review Raven",
  "Lint Lord",
  "Debugger Diver",
  "Latency Wrangler",
  "Deploy Daydreamer",
  "Stack Storyteller",
  "Bug Bash Bard",
  "Schema Sherpa",
  "API Pathfinder",
  "Cache Conjurer",
  "Release Ritualist",
  "Debugging Druid",
  "Feature Flag Fox",
  "Devtools Detective",
  "Pipeline Pilot",
  "Endpoint Envoy",
  "UX-to-Code Alchemist",
  "Build Script Sage",
  "Commit Conductor",
  "Merge Maestro",
  "Sprint Sculptor",
  "Stakeholder Whisperer",
  "Data Flow Cartographer",
  "State Machine Smith",
  "Test Suite Tamer",
  "Refactor Renegade",
  "Pixel-to-Prod Diplomat",
  "Scope Creep Shepherd",
];

const GIF_KEYWORDS: Record<string, string> = {
  "API Whisperer": "api",
  "Stack Stitcher": "stack",
  "Feature Forge": "forge",
  "Bug Slayer": "bug",
  "Pipeline Plumber": "pipeline",
  "Latency Tamer": "speed",
  "Schema Shaper": "schema",
  "Cache Captain": "cache",
  "DevOps Druid": "devops",
  "Release Wrangler": "release",
  "CI Conductor": "ci",
  "Cloud Cartographer": "cloud",
  "Terminal Tactician": "terminal",
  "Patchsmith": "patch",
  "Refactor Ranger": "refactor",
  "Test Harness Hero": "testing",
  "Binary Bender": "binary",
  "Data Streamer": "data stream",
  "Script Sorcerer": "code",
  "Merge Master": "merge",
  "PR Sherpa": "pull request",
  "Feature Flagger": "feature flag",
  "Sprint Synthesizer": "sprint",
  "Backlog Wrangler": "backlog",
  "System Surgeon": "system",
  "Compile Commander": "compile",
  "Dependency Detective": "dependency",
  "Logline Listener": "logs",
  "Observability Oracle": "observability",
  "SRE Sage": "sre",
  "Uptime Guardian": "uptime",
  "Error Budgeteer": "error budget",
  "Runtime Tuner": "performance",
  "Algorithm Alchemist": "algorithm",
  "Codebase Cartographer": "code map",
  "Edge Case Explorer": "edge case",
  "Chaos Engineer": "chaos",
  "Rollback Rider": "rollback",
  "Incident Wrangler": "incident",
  "Token Tinker": "token",
  "API Gatekeeper": "gateway",
  "Webhook Whisperer": "webhook",
  "Queue Keeper": "queue",
  "Event Loop Evoker": "event loop",
  "Microservice Maestro": "microservices",
  "Monolith Mender": "monolith",
  "Container Conjurer": "docker",
  "Kubernetes Knight": "kubernetes",
  "Serverless Sage": "serverless",
  "Infra Gardener": "infrastructure",
  "Packet Pathfinder": "packet",
  "Network Nomad": "network",
  "Memory Mechanic": "memory",
  "Thread Tamer": "threads",
  "Query Quencher": "query",
  "SQL Sculptor": "sql",
  "NoSQL Navigator": "nosql",
  "Index Inspector": "index",
  "Latency Locksmith": "latency",
  "Bandwidth Baron": "bandwidth",
  "Security Sentinel": "security",
  "Auth Architect": "authentication",
  "Encryption Enchanter": "encryption",
  "Secrets Shepherd": "secrets",
  "Keychain Keeper": "keys",
  "Build System Bard": "build",
  "Versioning Virtuoso": "version",
  "SemVer Sage": "semver",
  "MVP Magician": "prototype",
  "Roadmap Ranger": "roadmap",
  "User Storysmith": "user story",
  "Spec Surgeon": "spec",
  "UX-to-Prod Translator": "product",
  "Product Pilot": "pilot",
  "Feature Shipwright": "ship",
  "Schema Sentinel": "database",
  "API Alchemist": "api wizard",
  "Code Review Raven": "code review",
  "Lint Lord": "linter",
  "Debugger Diver": "debug",
  "Latency Wrangler": "latency",
  "Deploy Daydreamer": "deploy",
  "Stack Storyteller": "tech stack",
  "Bug Bash Bard": "bug bash",
  "Schema Sherpa": "database schema",
  "API Pathfinder": "api",
  "Cache Conjurer": "cache",
  "Release Ritualist": "release",
  "Debugging Druid": "debugging",
  "Feature Flag Fox": "feature flag",
  "Devtools Detective": "devtools",
  "Pipeline Pilot": "ci pipeline",
  "Endpoint Envoy": "endpoint",
  "UX-to-Code Alchemist": "ux to code",
  "Build Script Sage": "build script",
  "Commit Conductor": "git commit",
  "Merge Maestro": "merge",
  "Sprint Sculptor": "sprint",
  "Stakeholder Whisperer": "stakeholder",
  "Data Flow Cartographer": "data flow",
  "State Machine Smith": "state machine",
  "Test Suite Tamer": "unit test",
  "Refactor Renegade": "refactor",
  "Pixel-to-Prod Diplomat": "product design",
  "Scope Creep Shepherd": "scope creep",
};

const CURATED_GIFS = [
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZGw2bnB0Z3Fxd3RoaTZjdzQxM2FqY3QxZzExMXZyYnJwa21zMnV2ayZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/n4l0sSeel6X7tHOFzg/giphy.gif",
    alt: "Builder reaction gif 1",
  },
  {
    url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRsbzNxYjh4MjB3c3d0bHB1cGM3N2tpeHlibDkxNHMwMXZieW52ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/66M6ZwJkTLYikvhrqZ/giphy.gif",
    alt: "Builder reaction gif 2",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZGw2bnB0Z3Fxd3RoaTZjdzQxM2FqY3QxZzExMXZyYnJwa21zMnV2ayZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/begSgSG5lCl8bxkBiv/giphy.gif",
    alt: "Builder reaction gif 3",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm5rZ29sNGowdTZpZm0xeWZ0aW8yeXhqeDdkcHprM2toNTc1bndtYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/gXr3j6YAClXFfZABn5/giphy.gif",
    alt: "Builder reaction gif 4",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm5rZ29sNGowdTZpZm0xeWZ0aW8yeXhqeDdkcHprM2toNTc1bndtYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/iV8OqgS5ZHM7IdT3FD/giphy.gif",
    alt: "Builder reaction gif 5",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm5rZ29sNGowdTZpZm0xeWZ0aW8yeXhqeDdkcHprM2toNTc1bndtYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/cNREyZCeJNOgJgxiWk/giphy.gif",
    alt: "Builder reaction gif 6",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm5rZ29sNGowdTZpZm0xeWZ0aW8yeXhqeDdkcHprM2toNTc1bndtYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/bPpbIixzpGKG0M4fBq/giphy.gif",
    alt: "Builder reaction gif 7",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm5rZ29sNGowdTZpZm0xeWZ0aW8yeXhqeDdkcHprM2toNTc1bndtYSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/kXjt5JYY71fthiZdIi/giphy.gif",
    alt: "Builder reaction gif 8",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2kwdWd3Mm1kM2hzd2p1NHo3MGllb2t5bHQzZXVqZzhjbW83aW5wcSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/pDfrOl4DqmM1WaY9pO/giphy.gif",
    alt: "Builder reaction gif 9",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d2ZrcmZ4Mmc1MWljMDh2eGp4bjd3aTg5Z3VpaTlrN2p5azNzaHhwMiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/hdWdPBRq2u2O7esqwy/giphy.gif",
    alt: "Builder reaction gif 10",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjNuaHhtdGY5Ym43MXk3bnMxZ241ZmxycGpyZnd1MHZsbnE1MXBiZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/cCjOn9DAznOLq0r8L4/giphy.gif",
    alt: "Builder reaction gif 11",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjNuaHhtdGY5Ym43MXk3bnMxZ241ZmxycGpyZnd1MHZsbnE1MXBiZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/4GOtFB6KrZIFLh6alI/giphy.gif",
    alt: "Builder reaction gif 12",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjNuaHhtdGY5Ym43MXk3bnMxZ241ZmxycGpyZnd1MHZsbnE1MXBiZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/sDxVzsDgLo3rLQzVlc/giphy.gif",
    alt: "Builder reaction gif 13",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2w1Z294YWxicmc0c29wZHdhczdibGY3Y2tydmQ1dHppZTBhZTByYyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/uVhWw4M2puM4bUJgM1/giphy.gif",
    alt: "Builder reaction gif 14",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bHZkOGJnZnhhZHlrNnd6ZTNkcTFzZnJ4bTA4OXp6eTQxNHVtN2cweiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/6U0u9pOkACOd2mBZQs/giphy.gif",
    alt: "Builder reaction gif 15",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bHZkOGJnZnhhZHlrNnd6ZTNkcTFzZnJ4bTA4OXp6eTQxNHVtN2cweiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/okFG5aJWqRGMYXoKTD/giphy.gif",
    alt: "Builder reaction gif 16",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cTllYXYzMGQxN3JkcXVsanFmNzJ6djlmdzRqcjRuYWl1emt3OXo1NiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/hM1ZLch9oSzzqRqrWE/giphy.gif",
    alt: "Builder reaction gif 17",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bG02ajJuNHl5MmRoOG5sbW54d21wbTNqZmZ4eXVvN2VmbmhqYTdtdCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/ttZI8X3eMM3iUuVPnq/giphy.gif",
    alt: "Builder reaction gif 18",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bG02ajJuNHl5MmRoOG5sbW54d21wbTNqZmZ4eXVvN2VmbmhqYTdtdCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/S9RnJWRWoiRZlHgaHa/giphy.gif",
    alt: "Builder reaction gif 19",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z3R4bnJtZGR1bW84aGtnN3JsNjJlcWxjenZrZm5sNXIyd2p2dmg5aiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/LCNuXThYZbcgOkvrPq/giphy.gif",
    alt: "Builder reaction gif 20",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3enNsNmVjcW00cjR3ZzkwYW9jcTZvcWpmeGVic2xycTVnZnZrcWZtcSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3aSUc2rHZwuaa19ENC/giphy.gif",
    alt: "Builder reaction gif 21",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3enNsNmVjcW00cjR3ZzkwYW9jcTZvcWpmeGVic2xycTVnZnZrcWZtcSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/0YQi3CTpcNTdz9RN3a/giphy.gif",
    alt: "Builder reaction gif 22",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a3BjYWE5bng4dGl4bjl3cW84dmNuaDlqeDFsZXlkZzh5OGJmcXo4NSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/WiDplerbPHYnjLUo5i/giphy.gif",
    alt: "Builder reaction gif 23",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHZxenNwbHRlbTdyM2kzZjRkdzdtdGQ2aTd5aTc4eW5xMmUzYnVhdSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/L9MmuRT3oJtAzTg1F0/giphy.gif",
    alt: "Builder reaction gif 24",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHZxenNwbHRlbTdyM2kzZjRkdzdtdGQ2aTd5aTc4eW5xMmUzYnVhdSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/FKqfAJTzBHaka6taMM/giphy.gif",
    alt: "Builder reaction gif 25",
  },
  {
    url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bHc2ZWJkOGs1N2Zncjl4MDJxc3k5aGttMmM1NGJueTZvYWtmdnhzeSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/LNB7EfaIk2gL1krwKt/giphy.gif",
    alt: "Builder reaction gif 26",
  },
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 2147483647;
  }
  return hash;
};

const pickCuratedGif = (keyword: string, lastIndex: number | null) => {
  if (!CURATED_GIFS.length) return null;
  const normalized = keyword.trim().toLowerCase() || "builder";
  const seed = hashString(normalized);
  let index = seed % CURATED_GIFS.length;
  if (lastIndex !== null && CURATED_GIFS.length > 1 && index === lastIndex) {
    index =
      (index + 1 + (seed % (CURATED_GIFS.length - 1))) % CURATED_GIFS.length;
  }
  return { ...CURATED_GIFS[index], index };
};

const preloadGif = (
  url: string,
  cache: Map<string, HTMLImageElement>,
  ready: Set<string>
) => {
  if (!url || cache.has(url)) return;
  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.onload = () => {
    ready.add(url);
  };
  img.onerror = () => {
    ready.add(url);
  };
  img.src = url;
  cache.set(url, img);
};

export default function Home() {
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifAlt, setGifAlt] = useState("");
  const [isGifLoading, setIsGifLoading] = useState(false);
  const [gifError, setGifError] = useState<string | null>(null);
  const [gifLoadCount, setGifLoadCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const lastGifIndexRef = useRef<number | null>(null);
  const gifPreloadRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const gifReadyRef = useRef<Set<string>>(new Set());
  const generatePulseWrapperRef = useRef<HTMLDivElement>(null);
  const generatePulseRef = useRef<null | {
    kill: () => void;
    pause: () => void;
    resume: () => void;
  }>(null);
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

    const nameKeyword = GIF_KEYWORDS[nextName] ?? nextName;
    const picked = pickCuratedGif(nameKeyword, lastGifIndexRef.current);
    if (!picked) {
      setGifUrl(null);
      setGifAlt("");
      setIsGifLoading(false);
      setGifError("No curated gifs available");
    } else {
      preloadGif(picked.url, gifPreloadRef.current, gifReadyRef.current);
      lastGifIndexRef.current = picked.index;
      setGifUrl(picked.url);
      setGifAlt(picked.alt || nextName);
      setIsGifLoading(!gifReadyRef.current.has(picked.url));
      setGifError(null);
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
    setIsGifLoading(false);
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
    CURATED_GIFS.forEach((gif) =>
      preloadGif(gif.url, gifPreloadRef.current, gifReadyRef.current)
    );
  }, []);

  useEffect(() => {
    if (!generatePulseWrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startPulse = (gsap: typeof import("gsap")["gsap"]) => {
      generatePulseRef.current?.kill();
      generatePulseRef.current = gsap.to(generatePulseWrapperRef.current, {
        scale: 1.06,
        duration: 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    if (gsapRef.current) {
      startPulse(gsapRef.current);
      return () => {
        generatePulseRef.current?.kill();
        generatePulseRef.current = null;
        gsapRef.current?.set(generatePulseWrapperRef.current, { scale: 1 });
      };
    }

    let isActive = true;
    void import("gsap").then(({ gsap }) => {
      if (!isActive) return;
      gsapRef.current = gsap;
      startPulse(gsap);
    });

    return () => {
      isActive = false;
      generatePulseRef.current?.kill();
      generatePulseRef.current = null;
      gsapRef.current?.set(generatePulseWrapperRef.current, { scale: 1 });
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
    if (!currentName || !containerRef.current) return;
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

  useLayoutEffect(() => {
    if (!currentName || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setupPointerTilt = (gsap: typeof import("gsap")["gsap"]) => {
      if (!containerRef.current) return null;
      const container = containerRef.current;
      const outer = container.querySelector<HTMLElement>(".js-gif-card");
      if (!outer) return null;
      const zone =
        container.querySelector<HTMLElement>(".js-gif-tilt-zone") ?? outer;
      const inner = container.querySelector<HTMLElement>(".js-gif-media");

      gsap.set(outer, {
        transformPerspective: 700,
        transformOrigin: "center",
        transformStyle: "preserve-3d",
      });
      if (inner) {
        gsap.set(inner, { scale: 1.1, transformOrigin: "center" });
      }

      const outerRX = gsap.quickTo(outer, "rotationX", {
        ease: "power3.out",
        duration: 0.4,
      });
      const outerRY = gsap.quickTo(outer, "rotationY", {
        ease: "power3.out",
        duration: 0.4,
      });
      const outerX = gsap.quickTo(outer, "x", {
        ease: "power3.out",
        duration: 0.4,
      });
      const outerY = gsap.quickTo(outer, "y", {
        ease: "power3.out",
        duration: 0.4,
      });
      const innerX = inner
        ? gsap.quickTo(inner, "x", { ease: "power3.out", duration: 0.4 })
        : null;
      const innerY = inner
        ? gsap.quickTo(inner, "y", { ease: "power3.out", duration: 0.4 })
        : null;

      const handleMove = (event: PointerEvent) => {
        const bounds = zone.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        outerRX(gsap.utils.interpolate(20, -20, y));
        outerRY(gsap.utils.interpolate(-20, 20, x));
        outerX(gsap.utils.interpolate(-10, 10, x));
        outerY(gsap.utils.interpolate(-10, 10, y));
        innerX?.(gsap.utils.interpolate(-10, 10, x));
        innerY?.(gsap.utils.interpolate(-10, 10, y));
      };

      const handleLeave = () => {
        outerRX(0);
        outerRY(0);
        outerX(0);
        outerY(0);
        innerX?.(0);
        innerY?.(0);
      };

      zone.addEventListener("pointermove", handleMove);
      zone.addEventListener("pointerleave", handleLeave);

      return () => {
        zone.removeEventListener("pointermove", handleMove);
        zone.removeEventListener("pointerleave", handleLeave);
        handleLeave();
      };
    };

    let isActive = true;
    let cleanup: (() => void) | null = null;

    const start = () => {
      if (!isActive) return;
      if (gsapRef.current) {
        cleanup = setupPointerTilt(gsapRef.current);
        return;
      }
      void import("gsap").then(({ gsap }) => {
        if (!isActive) return;
        gsapRef.current = gsap;
        cleanup = setupPointerTilt(gsap);
      });
    };

    const rafId = window.requestAnimationFrame(start);

    return () => {
      isActive = false;
      window.cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [currentName, gifLoadCount]);

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const target = resultRef.current.querySelector<HTMLElement>(".js-name");
      if (target) target.textContent = currentName;
      return;
    }

    const runScramble = (
      gsap: typeof import("gsap")["gsap"],
      ScrambleTextPlugin: typeof import("gsap/ScrambleTextPlugin")["ScrambleTextPlugin"]
    ) => {
      if (!resultRef.current) return null;
      const target = resultRef.current.querySelector<HTMLElement>(".js-name");
      if (!target) return null;
      gsap.registerPlugin(ScrambleTextPlugin);

      return gsap.context(() => {
        gsap.to(target, {
          scrambleText: {
            text: currentName,
            chars: "upperAndLowerCase",
            revealDelay: 0.1,
            tweenLength: true,
          },
          ease: "power2.inOut",
          overwrite: "auto",
          duration: 0.8,
        });
      }, resultRef);
    };

    const handleFailure = () => {
      const target = resultRef.current?.querySelector<HTMLElement>(".js-name");
      if (target) target.textContent = currentName;
    };

    if (gsapRef.current) {
      let ctx: { revert: () => void } | null = null;
      let isActive = true;
      void import("gsap/ScrambleTextPlugin")
        .then(({ ScrambleTextPlugin }) => {
          if (!isActive || !gsapRef.current) return;
          ctx = runScramble(gsapRef.current, ScrambleTextPlugin);
        })
        .catch(handleFailure);
      return () => {
        isActive = false;
        ctx?.revert();
      };
    }

    let isActive = true;
    let ctx: { revert: () => void } | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrambleTextPlugin")])
      .then(([{ gsap }, { ScrambleTextPlugin }]) => {
        if (!isActive) return;
        gsapRef.current = gsap;
        ctx = runScramble(gsap, ScrambleTextPlugin);
      })
      .catch(handleFailure);

    return () => {
      isActive = false;
      ctx?.revert();
    };
  }, [currentName]);

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
      className="hero-shell relative h-svh w-screen overflow-x-hidden overflow-y-auto bg-background px-6 pt-8 pb-10 text-foreground sm:py-32 lg:py-36"
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
            <CardTitle className="hero-title js-animate text-balance font-sans text-[28px] font-medium text-foreground">
              What type of builder are you?
            </CardTitle>
          </CardHeader>
          <CardContent className="hero-card-content flex flex-col items-center gap-10 text-center sm:gap-12">
            {currentName && (
              <div
                ref={resultRef}
                className="js-animate flex w-full flex-col items-center gap-6"
              >
                <div className="js-gif-tilt-zone inline-flex">
                  <div className="js-gif-card flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-3 shadow-sm">
                    <div className="js-gif-glitch size-56 bg-muted sm:size-64">
                      {gifUrl ? (
                        <img
                          src={gifUrl}
                          alt={gifAlt || "Builder reaction gif"}
                          className="js-gif-media h-full w-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                          decoding="async"
                          onLoad={handleGifLoad}
                        />
                      ) : (
                        <div className="js-gif-media flex h-full w-full items-center justify-center text-xs uppercase text-muted-foreground">
                          {gifError
                            ? gifError
                            : isGifLoading
                              ? "Loading gif"
                              : "Gif unavailable"}
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
                </div>
                <div className="builder-name js-name text-4xl font-semibold text-balance leading-[1.05] pb-1 truncate min-[400px]:text-6xl lg:text-7xl">
                  {currentName}
                </div>
              </div>
            )}
            <div className="js-animate flex items-center gap-3">
              <div ref={generatePulseWrapperRef} className="inline-flex">
                <Button
                  variant="outline"
                  size="lg"
                  className="js-bounce-btn js-bounce-generate rounded-full border border-foreground/20 bg-foreground! px-8 py-5 text-sm font-medium text-background! shadow-sm transition-[background-color,border-color,box-shadow,color] duration-200 hover:border-foreground/40 hover:bg-foreground/80! hover:shadow-md active:border-foreground/60 active:bg-foreground/80! active:shadow-sm sm:text-base"
                  onClick={handleGenerate}
                  onMouseEnter={handleBounceEnter}
                  onMouseLeave={handleBounceLeave}
                >
                  Generate
                </Button>
              </div>
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
