import "server-only";
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/admin/dashboard",
    signIn: "/admin/login",
    signUp: "/admin/login",
    afterSignIn: "/admin/dashboard",
    afterSignOut: "/",
  },
});
