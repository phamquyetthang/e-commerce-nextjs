import { db } from "@/utils/firesbase";
import { comparePassword } from "@/utils/password";
import { collection, getDocs, query, where } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ILoginReq {
  email: string;
  password: string;
  remember: boolean;
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, remember } = credentials as ILoginReq;

        if (!email) {
          throw Error("missing email");
        }

        const adminExisted = await getDocs(
          query(collection(db, "admins"), where("email", "==", email))
        );

        if (adminExisted.docs.length === 0) {
          throw Error("This account is not exist");
        }

        const adminExistedData = adminExisted.docs[0].data();

        const hashedPassword = adminExistedData.password;

        const isMatchPassword = await comparePassword(
          String(password),
          hashedPassword
        );

        if (!isMatchPassword) {
          throw Error("Wrong password");
        }

        return {
          email: adminExistedData.email,
          id: adminExisted.docs[0].id,
        };

        // return NextResponse.json({
        //   message: "success",
        //   token: jwt.sign(tokenObj, SECRET_JWT_KEY, {
        //     expiresIn: remember ? undefined : "2 days",
        //   }),
        // });
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.email) {
        params.token.email = params.user?.email;
        params.token.sub = params.user?.id;
      }

      return params;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.sub as string;
      }

      return session
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
