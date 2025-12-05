"use client";  // so that we can use React hooks like useState 

import { useState, useEffect } from "react";
import { getAccount } from "@/lib/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";


export default function LoginPage() { 
    const router = useRouter()
    

    // form state
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // auto redirect if user is already logged in 
    useEffect(() => {
        getAccount().deleteSession("current").catch(() => {});
    }, []);


    async  function  handleLogin() {
        setLoading(true);
        setError("");

        try {
            await getAccount().createEmailPasswordSession(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    }
    return (
        <div className="max-w-md mx-auto mt-15 p-6  border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Label className="mt-3">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPasssword(e.target.value)} />

            <Button className="w-full mt-4" onClick={handleLogin} disabled={loading}>
                {/* when user click login button */}
                {loading ? "Logging  in... " : "Login"}
            </Button>
            <p className="text-sm text-gray-500">
             Don’t have an account?
             <a href="/signup" className="text-blue-600 underline ml-1">
             Create one
              </a>
             </p>

        </div>
    );
};