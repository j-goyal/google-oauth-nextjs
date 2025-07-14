'use client';

import { Loader } from 'lucide-react';
import { useGlobalLoader } from '@/store/useGlobalLoader';

export default function GlobalLoader() {
  const { isVisible } = useGlobalLoader();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800/40 backdrop-blur-sm">
      <Loader className="w-12 h-12 text-white animate-spin" />
    </div>
  );
}
