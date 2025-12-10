"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import API, { setAuthToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const googleButtonRef = useRef(null);

  // ------------------- GOOGLE BUTTON INIT -------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    // @ts-ignore
    if (!window.google) return;

    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleResponse,
    });
// @ts-ignore
    google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }, []);

  // ------------------- GOOGLE RESPONSE -------------------
  const handleGoogleResponse = async (response: any) => {
    try {
      const { credential } = response;

      const res = await API.post(
        "/auth/google",
        { credential },
        { withCredentials: true }
      );

      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);

      alert("Google Login Successful!");
      router.push("/");
    } catch (error) {
      alert("Google Login Failed");
      console.log(error);
    }
  };

  // ------------------- NORMAL LOGIN/SIGNUP -------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setAuthToken(res.data.token);

        alert("Login successful!");
        router.push("/");
      } else {
        const res = await API.post("/auth/register", {
          name,
          email,
          password,
          role: "user",
        });

        alert(res.data.message || "Signup Successful");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 w-full transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* GOOGLE BUTTON */}
        <div ref={googleButtonRef}>
          
        </div>

        {/* Switch link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
