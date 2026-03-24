"use client";

import { MessageSquare } from "lucide-react";
import { VoteButton } from "./vote-button";

type Status =
  | "draft"
  | "voting"
  | "selected"
  | "building"
  | "shipped"
  | "archived";

const statusColors: Record<string, string> = {
  draft: "border-[#27272a] text-[#6b7280]",
  voting: "border-primary/30 text-primary",
  selected: "border-primary/30 text-primary",
  building: "border-primary/30 text-primary",
  shipped: "border-green-500/30 text-green-400",
  archived: "border-[#27272a] text-[#6b7280]",
};

interface IdeaCardProps {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: Status;
  tags: string[];
  author: string;
  commentCount: number;
}

export function IdeaCard({
  id,
  title,
  description,
  votes,
  status,
  tags,
  author,
  commentCount,
}: IdeaCardProps) {
  return (
    <div className="group relative border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-primary">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                statusColors[status] ?? statusColors.draft
              }`}
            >
              {status}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              @{author}
            </span>
          </div>
          <h3 className="text-sm font-bold font-mono leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 font-mono">
            {description}
          </p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
        <VoteButton ideaId={id} count={votes} />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
        <MessageSquare className="h-3 w-3" />
        {commentCount} comments
      </div>
    </div>
  );
}
