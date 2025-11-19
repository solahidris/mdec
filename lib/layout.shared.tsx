import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Image
          src="/images/mdec-logo.png"
          alt="MDEC Logo"
          width={100}
          height={40}
          style={{ width: 'auto', height: '20px' }}
        />
      ),
    },
  };
}
