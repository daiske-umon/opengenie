"use client";

import { CountdownTimer } from "@/components/countdown-timer";
import { IdeaCard } from "@/components/idea-card";
import { PageIllustration } from "@/components/page-illustration";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";
import { useSession, signIn } from "next-auth/react";

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
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitError, setSubmitError] = useState("");

  const statusFilter =
    activeFilter === "All"
      ? undefined
      : (activeFilter.toLowerCase() as IdeaFilter);
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.ideas.list.useQuery({
    status: statusFilter,
    search: search || undefined,
    limit: 50,
  });
  const { data: cycle } = trpc.cycles.getCurrent.useQuery();
  const createIdea = trpc.ideas.create.useMutation({
    onSuccess: async () => {
      setTitle("");
      setDescription("");
      setProblemStatement("");
      setTargetUsers("");
      setTagsInput("");
      setSubmitError("");
      await utils.ideas.list.invalidate();
    },
    onError: (mutationError) => {
      setSubmitError(mutationError.message || "Failed to submit idea.");
    },
  });

  const ideas = data?.ideas ?? [];

  async function handleSubmitIdea(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user) {
      await signIn(undefined, { callbackUrl: "/ideas" });
      return;
    }

    setSubmitError("");
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 5);

    createIdea.mutate({
      title: title.trim(),
      description: description.trim(),
      problemStatement: problemStatement.trim() || undefined,
      targetUsers: targetUsers.trim() || undefined,
      tags,
    });
  }

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <PageIllustration
        variant="ideas"
        className="-top-12 -right-16 h-[24rem] w-[24rem] md:-top-16 md:-right-20 md:h-[34rem] md:w-[34rem]"
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

      <section className="mb-10 border border-border bg-[#0a0a0a]/80 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-mono text-sm font-bold text-primary">
              {`> submit_idea`}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Share the problem, who it helps, and the rough shape of the
              project.
            </p>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground">
            {session?.user
              ? `signed in as @${session.user.name ?? "member"}`
              : "sign in to create an idea"}
          </p>
        </div>

        <form onSubmit={handleSubmitIdea} className="grid gap-3">
          <input
            type="text"
            placeholder="idea title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-border placeholder:text-muted-foreground focus:border-primary h-10 w-full border bg-[#0a0a0a] px-4 font-mono text-xs outline-none transition-colors"
            minLength={3}
            maxLength={200}
            required
          />
          <textarea
            placeholder="describe the product or workflow you want built..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-border placeholder:text-muted-foreground focus:border-primary min-h-28 w-full border bg-[#0a0a0a] px-4 py-3 font-mono text-xs outline-none transition-colors"
            minLength={10}
            maxLength={5000}
            required
          />
          <div className="grid gap-3 md:grid-cols-2">
            <textarea
              placeholder="problem statement..."
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="border-border placeholder:text-muted-foreground focus:border-primary min-h-24 w-full border bg-[#0a0a0a] px-4 py-3 font-mono text-xs outline-none transition-colors"
              maxLength={2000}
            />
            <textarea
              placeholder="target users..."
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              className="border-border placeholder:text-muted-foreground focus:border-primary min-h-24 w-full border bg-[#0a0a0a] px-4 py-3 font-mono text-xs outline-none transition-colors"
              maxLength={1000}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="tags, comma separated..."
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="border-border placeholder:text-muted-foreground focus:border-primary h-10 flex-1 border bg-[#0a0a0a] px-4 font-mono text-xs outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={createIdea.isPending}
              className="border-primary bg-primary px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-primary-foreground uppercase transition-colors hover:bg-transparent hover:text-primary disabled:opacity-50"
            >
              {createIdea.isPending
                ? "submitting..."
                : session?.user
                  ? "submit idea"
                  : "sign in to submit"}
            </button>
          </div>
          {submitError && (
            <p className="font-mono text-xs text-red-400">{submitError}</p>
          )}
        </form>
      </section>

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
