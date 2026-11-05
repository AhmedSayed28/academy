import { redirect } from "next/navigation";
import { localizePath } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";

export default async function InstructorsPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(localizePath(await resolveLocale(params), "/courses"));
}
