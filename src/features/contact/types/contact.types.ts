export interface ContactRepository {
  create(message: ContactRecord): Promise<void>;
}

export interface ContactRecord {
  submissionId: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
}

export type ContactApiSuccess = {
  success: true;
  data: { submitted: true };
};

export type ContactApiError = {
  success: false;
  error: {
    code: "VALIDATION_ERROR" | "PERSISTENCE_ERROR";
    message: string;
  };
};

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
