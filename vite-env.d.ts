interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_ANON_KEY: string; // Example environment variable
  // Add other environment variables here
}
