export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type ContactSubmission = ContactValues & { requestId: string };
export type ContactResult = {
  ok: boolean;
  message: string;
  errors?: ContactErrors;
};
export type ContactMail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
};
