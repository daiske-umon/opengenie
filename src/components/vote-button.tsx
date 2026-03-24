"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoteButtonProps {
  count: number;
}

export function VoteButton({ count }: VoteButtonProps) {
  const [voted, setVoted] = useState(false);
  const [displayCount, setDisplayCount] = useState(count);

  function handleVote() {
    if (voted) {
      setVoted(false);
      setDisplayCount(count);
    } else {
      setVoted(true);
      setDisplayCount(count + 1);
    }
  }

  return (
    <button
      onClick={handleVote}
      className={`flex flex-col items-center gap-0.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
        voted
          ? "border-primary bg-primary/10 text-primary glow-primary"
          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      <motion.div
        animate={voted ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="h-4 w-4" />
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
