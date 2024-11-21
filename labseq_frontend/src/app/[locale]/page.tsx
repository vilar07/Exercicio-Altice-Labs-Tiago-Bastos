import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('Index');
  const locale = useLocale(); // Get the current locale

  return (
    <div className="flex flex-col">
      <div>{t('title')}</div>
      <Link href={`/${locale}/login`}>
        carrega
      </Link>
    </div>
  );
}
