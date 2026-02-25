  import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";
import { generateAccessToken } from "@/lib/token";

connectDb();

const authOptions: NextAuthOptions = {
  providers: [
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
            phone: 0,
            password: hashedPassword,
            profilePic: user?.image ?? undefined,
            isVerified: true,
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
      console.log("[NextAuth][jwt] called user:", user?.email);
      if (user?.email) {
        const dbUser = await HousingUsers.findOne({ email: user.email });
        console.log("[NextAuth][jwt] dbUser found:", !!dbUser, "email:", user.email);
        if (dbUser) {
          (token as Record<string, unknown>).userId = dbUser._id.toString();
          (token as Record<string, unknown>).accessToken = generateAccessToken(
            dbUser._id.toString()
          );
          console.log("[NextAuth][jwt] set userId and accessToken on token");
        }
      }
      console.log("[NextAuth][jwt] returning token:", token);
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
    }) {
      console.log("[NextAuth][session] token:", token);
      session.user = session.user ?? {};
      (session.user as Record<string, unknown>).id = (token as Record<string, unknown>)
        .userId as string | undefined;

      // @ts-expect-error accessToken added in jwt callback
      session.accessToken = (token as Record<string, unknown>).accessToken as
        | string
        | undefined;

      console.log("[NextAuth][session] returning session:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.TOKEN_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

