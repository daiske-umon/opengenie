"use client";

import { IdeaStatusBadge } from "@/components/idea-status-badge";
import { PageIllustration } from "@/components/page-illustration";
import { VoteButton } from "@/components/vote-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MessageSquare } from "lucide-react";

function formatDate(date: string | Date | null | undefined) {
  if (!date) return "unknown";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function initials(name: string) {
  return name
    .split(/[\s_]+/)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export default function IdeaDetailPage() {
  const params = useParams<{ slug: string }>();
  const {
    data: idea,
    isLoading,
    error,
  } = trpc.ideas.getBySlug.useQuery({
    slug: params.slug,
  });

  if (isLoading) {
    return (
      <div className="text-muted-foreground mx-auto max-w-5xl px-4 py-12 font-mono text-xs sm:px-6 lg:px-8">
        Loading idea...
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/ideas"
          className="border-border text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Ideas
        </Link>
        <div className="border-border mt-8 border bg-[#0a0a0a] p-6 font-mono">
          <div className="text-sm font-bold text-white">Idea not found</div>
          <p className="text-muted-foreground mt-2 text-xs">
            The requested idea could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const submitterName =
    idea.submitter?.name ?? idea.submitter?.username ?? "unknown";

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageIllustration
        variant="ideas"
        className="top-4 right-0 h-40 w-40 md:h-52 md:w-52"
      />

      <Link
        href="/ideas"
        className="border-border text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Ideas
      </Link>

      <div className="border-border mt-6 border bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <IdeaStatusBadge status={idea.status} />
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                submitted {formatDate(idea.createdAt)}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {idea.title}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed">
                {idea.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {((idea.tags as string[]) ?? []).map((tag) => (
                <span
                  key={tag}
                  className="border-border text-muted-foreground border px-1.5 py-0.5 text-[10px]"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          </div>

          <div className="border-border flex items-start gap-3 border p-3">
            <VoteButton ideaId={idea.id} count={idea.voteCount} />
            <div className="pt-1 text-right font-mono">
              <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
                votes
              </div>
              <div className="text-primary text-lg font-bold">
                {idea.voteCount}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border-border border p-4">
            <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
              problem statement
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white">
              {idea.problemStatement || "No problem statement provided."}
            </p>
          </div>
          <div className="border-border border p-4">
            <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
              target users
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white">
              {idea.targetUsers || "No target users specified."}
            </p>
          </div>
        </div>

        <div className="border-border mt-8 border p-4">
          <div className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">
            submitter
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="rounded-sm">
              <AvatarImage src={idea.submitter?.avatarUrl ?? undefined} />
              <AvatarFallback className="border-border text-primary rounded-sm border bg-[#111111] font-mono text-xs">
                {initials(submitterName)}
              </AvatarFallback>
            </Avatar>
            <div className="font-mono">
              <div className="text-sm font-bold text-white">
                {submitterName}
              </div>
              <div className="text-muted-foreground text-xs">
                @{idea.submitter?.username ?? "unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-border mt-8 border bg-[#0a0a0a] p-6 sm:p-8">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <MessageSquare className="text-primary h-4 w-4" />
          Comments
          <span className="text-muted-foreground text-xs font-normal">
            ({idea.comments.length})
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {idea.comments.length === 0 ? (
            <div className="border-border text-muted-foreground border border-dashed p-4 text-xs">
              No comments yet.
            </div>
          ) : (
            idea.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-border border bg-[#0a0a0a] p-4"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="rounded-sm">
                    <AvatarImage src={comment.avatarUrl ?? undefined} />
                    <AvatarFallback className="border-border text-primary rounded-sm border bg-[#111111] font-mono text-xs">
                      {initials(comment.username ?? "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-white">
                        @{comment.username ?? "unknown"}
                      </span>
                      <span className="text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
