import { db } from "@/utils/firesbase";
import { comparePassword } from "@/utils/password";
import { collection, getDocs, query, where } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

interface ILoginReq {
  email: string;
  password: string;
  remember: boolean;
  role: "admin" | "user";
}

const adminLogin = async (email: string, password: string) => {
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
    role: "admin",
    email: adminExistedData.email,
    id: adminExisted.docs[0].id,
  };
};
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);
        const { email, password, role } = credentials as ILoginReq;

        if (role === "admin") {
          return adminLogin(email, password);
        } else {
          return {
            email: "",
            id: "",
          };
        }

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
    jwt({ token, user }) {
      if (user) {
        token.role = (user as AdapterUser & { role: string })?.role as string;
      }
      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
