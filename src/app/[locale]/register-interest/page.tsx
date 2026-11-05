import { redirect } from "next/navigation";
import { resolveLocale } from "@/i18n/server";
import { localizePath } from "@/i18n/config";

export default async function LegacyRegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(localizePath(await resolveLocale(params), "/course-registration"));
}
