'use client';
import { ChangeEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const currentPath = window.location.pathname.split('/').slice(2).join('/'); // Preserve path after locale
      router.replace(`/${nextLocale}/${currentPath}`);
    });
  };

  return (
    <label className="border-2 rounded">
      <p className="sr-only">change language</p>
      <select defaultValue={locale} 
              className="bg-transparent py-2" 
              onChange={onSelectChange}
              disabled={isPending}>
        <option value="en">En</option>
        <option value="pt">Pt</option>
      </select>
    </label>
  );
}