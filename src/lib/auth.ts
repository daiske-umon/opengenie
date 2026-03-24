import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Demo login for local dev (no GitHub OAuth credentials needed)
    Credentials({
      id: "demo",
      name: "Demo Login",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        if (!username) return null;

        const existing = db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .get();

        if (existing) {
          return {
            id: existing.id,
            name: existing.name,
            email: `${existing.username}@demo.local`,
            image: existing.avatarUrl,
          };
        }

        // Create new demo user
        const newUser = db
          .insert(users)
          .values({
            username,
            name: username,
            role: "member",
          })
          .returning()
          .get();

        return {
          id: newUser.id,
          name: newUser.name,
          email: `${newUser.username}@demo.local`,
          image: newUser.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        const githubId = String(profile.id);
        const existing = db
          .select()
          .from(users)
          .where(eq(users.githubId, githubId))
          .get();

        if (!existing) {
          const newUser = db
            .insert(users)
            .values({
              githubId,
              username: (profile.login as string) || profile.name || "user",
              name: profile.name || null,
              avatarUrl: (profile.avatar_url as string) || null,
            })
            .returning()
            .get();
          user.id = newUser.id;
        } else {
          // Update avatar/name
          db.update(users)
            .set({
              name: profile.name || existing.name,
              avatarUrl: (profile.avatar_url as string) || existing.avatarUrl,
            })
            .where(eq(users.id, existing.id))
            .run();
          user.id = existing.id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
        const dbUser = db
          .select()
          .from(users)
          .where(eq(users.id, token.userId as string))
          .get();
        if (dbUser) {
          (session.user as any).role = dbUser.role;
          (session.user as any).username = dbUser.username;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
