export interface LeadRepository {
  create(lead: LeadRecord): Promise<void>;
}

export interface LeadRecord {
  submissionId: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string | null;
}

export type LeadApiSuccess = {
  success: true;
  data: { submitted: true };
};

export type LeadApiError = {
  success: false;
  error: {
    code: "VALIDATION_ERROR" | "PERSISTENCE_ERROR";
    message: string;
  };
};

export type LeadApiResponse = LeadApiSuccess | LeadApiError;
