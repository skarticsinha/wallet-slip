import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

// Note: The `createPagesBrowserClient` is used for client-side operations.
// It correctly reads the environment variables we set up.
// We are using the "Pages" version here as it works seamlessly on the client-side
// within the App Router structure for this simple setup.

const supabase = createPagesBrowserClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export default supabase;

