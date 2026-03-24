"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { VoteButton } from "./vote-button";
import { IdeaStatusBadge } from "./idea-status-badge";

interface IdeaCardProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  votes: number;
  status: "draft" | "voting" | "selected" | "building" | "shipped" | "archived";
  tags: string[];
  author: string;
  commentCount: number;
}

export function IdeaCard({
  id,
  slug,
  title,
  description,
  votes,
  status,
  tags,
  author,
  commentCount,
}: IdeaCardProps) {
  return (
    <div className="group border-border hover:border-primary relative border bg-[#0a0a0a] p-5 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2">
            <IdeaStatusBadge status={status} />
            <span className="text-muted-foreground font-mono text-[10px]">
              @{author}
            </span>
          </div>
          <Link href={`/ideas/${slug}`} className="block">
            <h3 className="group-hover:text-primary font-mono text-sm leading-snug font-bold transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2 font-mono text-xs">
            {description}
          </p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
        <VoteButton ideaId={id} count={votes} />
      </div>
      <div className="text-muted-foreground mt-3 flex items-center gap-1.5 font-mono text-[10px]">
        <MessageSquare className="h-3 w-3" />
        {commentCount} comments
      </div>
    </div>
  );
}
