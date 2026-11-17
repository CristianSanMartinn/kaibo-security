import { courses } from "@/features/landing/data/courses";
import { handleContact } from "@/features/contact/server/contact.handler";
import { getMailConfig } from "@/features/contact/server/contact.config";
import { buildContactEmail } from "@/features/contact/server/contact.email";
import { sendWithResend } from "@/features/contact/server/resend.provider";

export async function POST(request: Request) {
  const config = getMailConfig();
  return handleContact(request, {
    courses: courses.map((course) => course.title),
    configured: config !== null,
    send: async (submission) => {
      if (!config) throw new Error("MAIL_NOT_CONFIGURED");
      await sendWithResend(
        buildContactEmail(submission),
        config,
        submission.requestId,
      );
    },
  });
}
