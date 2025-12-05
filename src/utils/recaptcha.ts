// src/utils/recaptcha.ts

// ✅ Read the key from the Environment Variable (Revital's key)
const SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

export async function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    window.grecaptcha.ready(() => {
      // ✅ Use the variable, not a hardcoded string
      window.grecaptcha.execute(SITE_KEY, { action })
        .then((token: string) => {
          resolve(token);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  });
}
