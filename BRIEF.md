# OpenGenie — Platform Brief

Open-source idea creation platform. People submit ideas, community votes, maintainers build top-voted idea in one week, then community contributes.

## Stack: Next.js 15 + TypeScript + Tailwind + shadcn/ui + tRPC + PostgreSQL + GitHub OAuth
## Tagline: "Ideas in. Code out. Every week."
## Alternate tagline: "Your wish is our commit."

## Cycle: Submit → Vote → Build (1 week) → Open Up for community

## Data Model
- users (github_id, username, avatar_url, role)
- ideas (title, description, problem, submitter_id, status, vote_count, tags[])
- votes (user_id, idea_id, cycle_id)
- projects (idea_id, repo_url, maintainer_ids[], tech_stack[], status)
- comments (user_id, idea_id, body)
- cycles (start_date, end_date, selected_idea_id, status)
