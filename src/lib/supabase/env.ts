function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }

  return value;
}

export const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
export const supabasePublishableKey = getRequiredEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
