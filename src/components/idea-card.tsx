"use client";

import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { VoteButton } from "./vote-button";

type Status = "submitted" | "voting" | "building" | "shipped";

const statusColors: Record<Status, string> = {
  submitted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  voting: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  building: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  shipped: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

interface IdeaCardProps {
  title: string;
  description: string;
  votes: number;
  status: Status;
  tags: string[];
  author: string;
  commentCount: number;
}

export function IdeaCard({
  title,
  description,
  votes,
  status,
  tags,
  author,
  commentCount,
}: IdeaCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={statusColors[status]}
            >
              {status}
            </Badge>
            <span className="text-xs text-muted-foreground">by @{author}</span>
          </div>
          <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <VoteButton count={votes} />
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MessageSquare className="h-3.5 w-3.5" />
        {commentCount} comments
      </div>
    </div>
  );
}
