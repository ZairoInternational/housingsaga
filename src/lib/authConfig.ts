import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";
import { generateAccessToken } from "@/lib/token";

connectDb();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        if (!email || !password) return null;

        const user = await HousingUsers.findOne({ email });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(params) {
      const user = (params as { user?: { email?: string | null; name?: string | null; image?: string | null } }).user;
      const email = user && user.email ? user.email : undefined;
      console.log("[NextAuth] signIn called for:", email);
      if (!email) return false;
      try {
        let dbUser = await HousingUsers.findOne({ email });
        console.log("[NextAuth] signIn found dbUser:", !!dbUser, "email:", email);
        if (!dbUser) {
          const randomPassword = Math.random().toString(36).slice(2, 12);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          dbUser = await HousingUsers.create({
            name: (user?.name ?? email.split("@")[0]) as string,
            email,
            phone: null,
            password: hashedPassword,
            profilePic: user?.image ?? undefined,
            isVerified: true,
            role: null,
            onboarded: false
          });
          await dbUser.save();
          console.log("[NextAuth] signIn created dbUser id:", dbUser._id.toString());
        }
        // attach id to user object for downstream callbacks
        (user as Record<string, unknown>).id = dbUser._id.toString();
        return true;
      } catch (err) {
        console.error("NextAuth signIn error:", err);
        return false;
      }
    },

    async jwt(params: { token: JWT; user?: { email?: string | null } }) {
      const { token, user } = params;

      const tokenRecord = token as Record<string, unknown>;

      const applyDbUser = (dbUser: { _id: { toString(): string }; role?: unknown; phone?: unknown; onboarded?: unknown }) => {
        tokenRecord.userId = dbUser._id.toString();
        tokenRecord.role = dbUser.role;
        tokenRecord.phone = dbUser.phone;
        tokenRecord.onboarded = dbUser.onboarded;

        if (dbUser.onboarded) {
          tokenRecord.accessToken = generateAccessToken(dbUser._id.toString());
          console.log("[NextAuth][jwt] onboarded user - accessToken generated");
        } else {
          delete tokenRecord.accessToken;
          console.log("[NextAuth][jwt] user not onboarded - NO accessToken");
        }
      };

      // On initial sign-in, we have user.email.
      if (user?.email) {
        const dbUser = await HousingUsers.findOne({ email: user.email });
        console.log("[NextAuth][jwt] dbUser found:", !!dbUser, "email:", user.email);
        if (dbUser) applyDbUser(dbUser);
        return token;
      }

      // On subsequent session refreshes (e.g. after onboarding), re-hydrate from token.userId.
      const userId = tokenRecord.userId;
      if (typeof userId === "string" && userId) {
        const dbUser = await HousingUsers.findById(userId);
        if (dbUser) applyDbUser(dbUser);
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
    }) {
      // console.log("[NextAuth][session] token:", token);
      session.user = session.user ?? {};
      (session.user as Record<string, unknown>).id = (token as Record<string, unknown>)
        .userId as string | undefined;

      // @ts-expect-error accessToken added in jwt callback
      session.accessToken = (token as Record<string, unknown>).accessToken as
        | string
        | undefined;

      // @ts-expect-error role added in jwt callback
      session.role = (token as Record<string, unknown>).role as
        | "owner"
        | "buyer"
        | "admin"
        | null;

      (session.user as Record<string, unknown>).phone = (token as Record<string, unknown>).phone as
        | string
        | null
        | undefined;

      (session.user as Record<string, unknown>).onboarded = (token as Record<string, unknown>).onboarded as
        | boolean
        | undefined;

      // console.log("[NextAuth][session] returning session:", session);
      return session;
    },

    async redirect({ url, baseUrl }) {
      // console.log("[NextAuth][redirect] called with url:", url, "baseUrl:", baseUrl);  
      // Allow absolute URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.TOKEN_SECRET,
};
