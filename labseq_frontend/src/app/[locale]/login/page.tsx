'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function Login() {
    const t = useTranslations('Navigation');
  return (
    <div>{t('home')}</div>
  )
}
