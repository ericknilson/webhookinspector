"use client";

import { signIn, useSession } from "next-auth/react";
import Inspect from "./Inspect";

export default function Login() {
  const { data: session } = useSession();

  return session ? (
    <Inspect />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Webhook Inspector
        </h1>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-900 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition cursor-pointer"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path
              fill="#4285F4"
              d="M24 9.5c3.86 0 7.36 1.44 10.08 3.84l7.56-7.56C36.9 2.04 30.83 0 24 0 14.48 0 6.44 5.64 2.61 13.86l8.88 6.87C13.21 14.49 18.2 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.08 24.48c0-1.5-.12-2.94-.36-4.38H24v8.25h12.75c-.6 3.06-2.1 5.64-4.5 7.44l6.87 8.88c4.5-4.17 7.11-10.32 7.11-17.19z"
            />
            <path
              fill="#FBBC05"
              d="M11.49 28.11c-1.32-.99-2.49-2.28-3.42-3.72L2.61 31.5c2.46 4.92 7.38 8.7 13.14 10.02l3.72-8.88c-2.46-.72-4.65-2.04-6.09-3.78z"
            />
            <path
              fill="#EA4335"
              d="M24 46.5c5.52 0 10.32-1.8 14.04-4.86l-6.87-8.88c-2.04 1.38-4.62 2.22-7.17 2.22-5.82 0-10.71-3.9-12.48-9.18l-8.88 3.72C7.44 40.86 14.48 46.5 24 46.5z"
            />
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
}
