"use client";

import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role;

  if (status === "loading") {
    return <div className="mx-auto max-w-7xl px-4 py-12 text-muted-foreground">Loading...</div>;
  }

  if (!session?.user || !["maintainer", "core"].includes(role)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">You need maintainer or core role to access this page.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Manage cycles, ideas, and users.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <CycleManagement />
        <IdeaModeration />
      </div>
      <div className="mt-8">
        <UserManagement />
      </div>
    </div>
  );
}

function CycleManagement() {
  const { data: currentCycle, refetch: refetchCycle } = trpc.cycles.getCurrent.useQuery();
  const { data: allCycles } = trpc.cycles.list.useQuery();
  const createCycle = trpc.cycles.create.useMutation({ onSuccess: () => refetchCycle() });
  const selectIdea = trpc.cycles.selectIdea.useMutation({ onSuccess: () => refetchCycle() });
  const completeCycle = trpc.cycles.complete.useMutation({ onSuccess: () => refetchCycle() });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">Cycle Management</h2>

      {currentCycle ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
              {currentCycle.status}
            </Badge>
            <span className="text-sm text-muted-foreground">Cycle #{currentCycle.id}</span>
          </div>
          {currentCycle.selectedIdea && (
            <p className="text-sm">Selected: <strong>{currentCycle.selectedIdea.title}</strong></p>
          )}
          {currentCycle.status === "building" && (
            <button
              onClick={() => completeCycle.mutate({ cycleId: currentCycle.id })}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Mark Complete
            </button>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No active cycle.</p>
      )}

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="text-sm font-medium">Create New Cycle</h3>
        <div className="mt-2 flex gap-2">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9 rounded-lg border border-border bg-secondary/50 px-3 text-sm" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9 rounded-lg border border-border bg-secondary/50 px-3 text-sm" />
          <button
            onClick={() => {
              if (startDate && endDate) {
                createCycle.mutate({ startDate, endDate });
                setStartDate("");
                setEndDate("");
              }
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function IdeaModeration() {
  const { data, refetch } = trpc.ideas.list.useQuery({ limit: 50 });
  const updateIdea = trpc.ideas.update.useMutation({ onSuccess: () => refetch() });
  const deleteIdea = trpc.ideas.delete.useMutation({ onSuccess: () => refetch() });

  const statusOptions = ["draft", "voting", "selected", "building", "shipped", "archived"] as const;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">Idea Moderation</h2>
      <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
        {(data?.ideas ?? []).map((idea) => (
          <div key={idea.id} className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{idea.title}</p>
              <p className="text-xs text-muted-foreground">{idea.voteCount} votes</p>
            </div>
            <select
              value={idea.status}
              onChange={(e) => updateIdea.mutate({ id: idea.id, status: e.target.value as any })}
              className="h-8 rounded-md border border-border bg-secondary/50 px-2 text-xs"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => { if (confirm("Delete this idea?")) deleteIdea.mutate({ id: idea.id }); }}
              className="rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserManagement() {
  const { data: userList, refetch } = trpc.users.list.useQuery();
  const updateRole = trpc.users.updateRole.useMutation({ onSuccess: () => refetch() });

  const roleOptions = ["member", "contributor", "maintainer", "core"] as const;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">User Management</h2>
      <div className="mt-4 space-y-2">
        {(userList ?? []).map((user) => (
          <div key={user.id} className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">{user.name ?? user.username}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
            <select
              value={user.role}
              onChange={(e) => updateRole.mutate({ id: user.id, role: e.target.value as any })}
              className="h-8 rounded-md border border-border bg-secondary/50 px-2 text-xs"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
