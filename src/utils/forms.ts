import { getRecaptchaToken } from './recaptcha';

// Read the Revital Endpoint from .env
const LAMBDA_ENDPOINT = import.meta.env.PUBLIC_LAMBDA_ENDPOINT;

if (!LAMBDA_ENDPOINT) {
  throw new Error("FATAL: PUBLIC_LAMBDA_ENDPOINT environment variable is not set.");
}

interface FormData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dob?: string; 
  email: string;
  phone: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  reasonForVisit?: string;
  smsConsent: boolean;
  formType: 'appointment' | 'contact' | 'booking';
}

export async function submitForm(data: FormData) {
  try {
    // Get the token using the Revital Site Key
    const token = await getRecaptchaToken(`submit_${data.formType}`);

    // Construct payload
    const payload = {
      // Combine names if separate fields aren't used by backend
      fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      reasonForVisit: data.reasonForVisit,
      message: data.message,
      smsConsent: data.smsConsent,
      
      // ✅ FAIL-SAFE: Send token as BOTH names so either Lambda version works
      recaptchaToken: token, // current backend field name
      captchaToken: token,   // legacy backend field name (kept for compatibility)
    };

    console.log("Submitting to Revital Backend:", LAMBDA_ENDPOINT);

    const response = await fetch(LAMBDA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = 'Form submission failed.';
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        errorMessage = `Server error: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();

  } catch (error) {
    console.error('Error in submitForm utility:', error);
    throw error;
  }
}
