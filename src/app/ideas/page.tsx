"use client";

import { IdeaCard } from "@/components/idea-card";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";

const filters = ["All", "Voting", "Building", "Shipped"] as const;

export default function IdeasPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const statusFilter =
    activeFilter === "All"
      ? undefined
      : (activeFilter.toLowerCase() as any);
  const { data, isLoading, error } = trpc.ideas.list.useQuery({
    status: statusFilter,
    search: search || undefined,
    limit: 50,
  });

  const ideas = data?.ideas ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
          <span className="text-muted-foreground">{`// `}</span>
          <span className="text-primary">ideas</span>
        </h1>
        <p className="mt-2 text-xs text-muted-foreground font-mono">
          Browse, vote, and submit ideas for the community to build.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full border border-border bg-[#0a0a0a] pl-9 pr-4 text-xs font-mono outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
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
          <p className="text-xs text-muted-foreground font-mono">
            Failed to load ideas. Please try refreshing the page.
          </p>
        </div>
      ) : isLoading ? (
        <div className="py-12 text-center text-xs text-muted-foreground font-mono">
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
                title={idea.title}
                description={idea.description}
                votes={idea.voteCount}
                status={idea.status as any}
                tags={(idea.tags as string[]) ?? []}
                author={idea.submitterUsername ?? "unknown"}
                commentCount={idea.commentCount}
              />
            </motion.div>
          ))}
          {ideas.length === 0 && (
            <div className="py-12 text-center text-xs text-muted-foreground font-mono">
              No ideas match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
