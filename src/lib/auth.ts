import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

type SessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  username?: string;
};

export const githubAuthEnabled = Boolean(
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ...(githubAuthEnabled
      ? [
          GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
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
        const sessionUser = session.user as SessionUser;
        sessionUser.id = token.userId as string;
        const dbUser = db
          .select()
          .from(users)
          .where(eq(users.id, token.userId as string))
          .get();
        if (dbUser) {
          sessionUser.role = dbUser.role;
          sessionUser.username = dbUser.username;
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
