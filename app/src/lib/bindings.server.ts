// Server-side settings for this deployment. Cloudflare bindings are the source
// of truth in production; process.env remains the fallback for local Node runs.
type AppEnv = {
  DB?: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => { run: () => Promise<unknown> };
    };
  };
  CONTACT_EMAIL_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  HF_ENV?: string;
};

export async function bindings(): Promise<AppEnv> {
  // `cloudflare:workers` exists in workerd, but not in the local Node server.
  // Keep the import dynamic so local development can use process.env.
  let workerEnv: Partial<AppEnv> = {};
  try {
    const cloudflare = await import("cloudflare:workers");
    workerEnv = (cloudflare.env ?? {}) as Partial<AppEnv>;
  } catch {
    // Running outside Cloudflare Workers.
  }

  return {
    DB: workerEnv.DB,
    CONTACT_EMAIL_API_KEY:
      workerEnv.CONTACT_EMAIL_API_KEY ?? process.env.CONTACT_EMAIL_API_KEY,
    CONTACT_EMAIL_FROM: workerEnv.CONTACT_EMAIL_FROM ?? process.env.CONTACT_EMAIL_FROM,
    HF_ENV: workerEnv.HF_ENV ?? process.env.HF_ENV,
  };
}
