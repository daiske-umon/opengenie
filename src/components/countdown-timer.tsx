"use client";

import { useEffect, useState } from "react";

function getRemainingParts(targetDate: string | Date, now: number) {
  const target = new Date(targetDate).getTime();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, expired: diff === 0 };
}

function pad(value: number, size = 2) {
  return value.toString().padStart(size, "0");
}

export function CountdownTimer({
  endDate,
  className = "",
}: {
  endDate?: string | Date | null;
  className?: string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!endDate) return;

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [endDate]);

  const remaining = endDate ? getRemainingParts(endDate, now) : null;

  if (!remaining) {
    return null;
  }

  return (
    <div
      className={`border-border text-muted-foreground border bg-[#0a0a0a] px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase ${className}`}
    >
      <span className="text-muted-foreground/80 mr-3 text-[10px]">
        {remaining.expired ? "Voting Closed:" : "Voting Ends In:"}
      </span>
      <span className="text-primary">
        {pad(remaining.days, 2)}d
        <span className="animate-blink text-primary/70 px-1">:</span>
        {pad(remaining.hours)}h
        <span className="animate-blink text-primary/70 px-1">:</span>
        {pad(remaining.minutes)}m
        <span className="animate-blink text-primary/70 px-1">:</span>
        {pad(remaining.seconds)}s
      </span>
    </div>
  );
}
