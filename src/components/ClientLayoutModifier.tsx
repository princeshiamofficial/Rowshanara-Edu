"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientLayoutModifier() {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdmin) {
      document.body.classList.add('client-page-layout');
    } else {
      document.body.classList.remove('client-page-layout');
    }
  }, [isAdmin]);

  return null;
}
