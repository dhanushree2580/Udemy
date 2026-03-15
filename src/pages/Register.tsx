import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    // TODO: Supabase auth
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black text-udemy-heading">udemy</Link>
        </div>
        <div className="border p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <h1 className="text-xl font-bold mb-6">Sign up and start learning</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 border border-destructive/20">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="name" className="text-sm font-bold">Full name</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-bold">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-bold">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </div>

            <Button type="submit" variant="udemy" className="w-full h-12 text-base" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="udemy-outline" className="w-full h-12 mb-3">
            Continue with Google
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing up, you agree to our{" "}
            <Link to="#" className="underline">Terms of Use</Link> and{" "}
            <Link to="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
