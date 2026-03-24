"use client";

import { CountdownTimer } from "@/components/countdown-timer";
import { IdeaCard } from "@/components/idea-card";
import { PageIllustration } from "@/components/page-illustration";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";

const filters = ["All", "Voting", "Building", "Shipped"] as const;
type IdeaStatus =
  | "draft"
  | "voting"
  | "selected"
  | "building"
  | "shipped"
  | "archived";
type IdeaFilter = Extract<IdeaStatus, "voting" | "building" | "shipped">;

export default function IdeasPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const statusFilter =
    activeFilter === "All"
      ? undefined
      : (activeFilter.toLowerCase() as IdeaFilter);
  const { data, isLoading, error } = trpc.ideas.list.useQuery({
    status: statusFilter,
    search: search || undefined,
    limit: 50,
  });
  const { data: cycle } = trpc.cycles.getCurrent.useQuery();

  const ideas = data?.ideas ?? [];

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageIllustration
        variant="ideas"
        className="top-2 right-0 h-44 w-44 md:h-56 md:w-56"
      />
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-muted-foreground">{`// `}</span>
          <span className="text-primary">ideas</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-xs">
          Browse, vote, and submit ideas for the community to build.
        </p>
      </div>

      <div className="mb-8">
        <CountdownTimer endDate={cycle?.endDate} className="inline-flex" />
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border placeholder:text-muted-foreground focus:border-primary h-9 w-full border bg-[#0a0a0a] pr-4 pl-9 font-mono text-xs transition-colors outline-none"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                activeFilter === filter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {filter.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground font-mono text-xs">
            Failed to load ideas. Please try refreshing the page.
          </p>
        </div>
      ) : isLoading ? (
        <div className="text-muted-foreground py-12 text-center font-mono text-xs">
          Loading ideas...
        </div>
      ) : (
        <div className="grid gap-3">
          {ideas.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <IdeaCard
                id={idea.id}
                slug={idea.slug}
                title={idea.title}
                description={idea.description}
                votes={idea.voteCount}
                status={idea.status as IdeaStatus}
                tags={(idea.tags as string[]) ?? []}
                author={idea.submitterUsername ?? "unknown"}
                commentCount={idea.commentCount}
              />
            </motion.div>
          ))}
          {ideas.length === 0 && (
            <div className="text-muted-foreground py-12 text-center font-mono text-xs">
              No ideas match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
