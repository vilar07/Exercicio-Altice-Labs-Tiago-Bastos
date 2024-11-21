import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import LocalSwitcher from './local-switcher';

export default function Navbar() {
    const t = useTranslations('Navigation');
  return (
    <header className='p-4'>
        <nav className='flex items-center justify-between'>
            <Link href="/">
                {t('home')}
            </Link>
            <LocalSwitcher />
        </nav>
    </header>
  )
}
