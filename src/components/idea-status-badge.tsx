const statusColors: Record<string, string> = {
  draft: "border-[#27272a] text-[#6b7280]",
  voting: "border-primary/30 text-primary",
  selected: "border-primary/30 text-primary",
  building: "border-primary/30 text-primary",
  shipped: "border-green-500/30 text-green-400",
  archived: "border-[#27272a] text-[#6b7280]",
};

export function IdeaStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
        statusColors[status] ?? statusColors.draft
      }`}
    >
      {status}
    </span>
  );
}
