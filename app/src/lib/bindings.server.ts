// Server-side settings for this deployment. Email delivery is optional:
// set CONTACT_EMAIL_API_KEY (Resend) and, if you have a verified sender,
// CONTACT_EMAIL_FROM. Without the key, a contact submission is still accepted.
type AppEnv = {
  DB?: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => { run: () => Promise<unknown> };
    };
  };
  CONTACT_EMAIL_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
};

export function bindings(): AppEnv {
  return {
    CONTACT_EMAIL_API_KEY: process.env.CONTACT_EMAIL_API_KEY,
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
  };
}
