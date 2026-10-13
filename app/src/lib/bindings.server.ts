// Server-side settings for the Node deployment. Email delivery is optional:
// set CONTACT_EMAIL_API_KEY (Resend) and, if configured, CONTACT_EMAIL_FROM.
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

export function bindings(): AppEnv {
  return {
    CONTACT_EMAIL_API_KEY: process.env.CONTACT_EMAIL_API_KEY,
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
    HF_ENV: process.env.HF_ENV,
  };
}
