"use client";  // so that we can use React hooks like useState 

import { useState } from "react";
import { getAccount } from "@/lib/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default  function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSignup() {
      setLoading(true);
      setError("");

      try {
        await getAccount().create("unique()", email, password, name);
        alert("Acccount created! Please login.");
        router.push("/login");
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    }
    return (
        <div className="max-w-md mx-auto mt-15 p-6 border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Create Account</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <Label>Name</Label>
            <Input  value={name} onChange={(e) => setName(e.target.value)}/>

            <Label className="mt-4">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Label className="mt-4">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button className="w-full mt-4" onClick={handleSignup} disabled={loading}>
                {loading ? "Creating..." : "Sign up"}
            </Button>
            <p className="text-sm text-gray-500">
              Already have an account? 
            <a href="/login" className="text-blue-600 underline ml-1">
              Login
              </a>
              </p>

        </div>
    );

};