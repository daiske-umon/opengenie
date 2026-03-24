"use client";

import { IdeaCard } from "@/components/idea-card";
import { ideas } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const filters = ["All", "Submitted", "Voting", "Building", "Shipped"] as const;

export default function IdeasPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      idea.status === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ideas
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse, vote, and submit ideas for the community to build.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <IdeaCard
              title={idea.title}
              description={idea.description}
              votes={idea.votes}
              status={idea.status}
              tags={idea.tags}
              author={idea.author}
              commentCount={idea.commentCount}
            />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No ideas match your search.
          </div>
        )}
      </div>
    </div>
  );
}
