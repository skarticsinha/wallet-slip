"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import supabase from '@/lib/supabaseClient';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Essential for email verification in Supabase
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Verification email sent! Please check your inbox.');
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Join Wallet Slip</CardTitle>
          <p className="text-sm text-muted-foreground">Create your free account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                    Login
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}