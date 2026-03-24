"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";

interface VoteButtonProps {
  ideaId: number;
  count: number;
}

export function VoteButton({ ideaId, count }: VoteButtonProps) {
  const { data: session } = useSession();
  const [voted, setVoted] = useState(false);
  const [displayCount, setDisplayCount] = useState(count);

  const utils = trpc.useUtils();

  const castVote = trpc.votes.cast.useMutation({
    onMutate: () => {
      setVoted(true);
      setDisplayCount((c) => c + 1);
    },
    onError: () => {
      setVoted(false);
      setDisplayCount(count);
    },
    onSettled: () => {
      utils.ideas.list.invalidate();
    },
  });

  const removeVote = trpc.votes.remove.useMutation({
    onMutate: () => {
      setVoted(false);
      setDisplayCount((c) => c - 1);
    },
    onError: () => {
      setVoted(true);
      setDisplayCount(count);
    },
    onSettled: () => {
      utils.ideas.list.invalidate();
    },
  });

  function handleVote() {
    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    if (voted) {
      removeVote.mutate({ ideaId });
    } else {
      castVote.mutate({ ideaId });
    }
  }

  return (
    <button
      onClick={handleVote}
      className={`flex flex-col items-center gap-0.5 border px-3 py-2 text-xs font-mono font-bold transition-all ${
        voted
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      <motion.div
        animate={voted ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayCount}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="tabular-nums"
        >
          {displayCount}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
