import Image from 'next/image';
import React from 'react';

import './index.scss'

const Logo = () => (
  <div className="logo">
    <Image
      width={300}
      height={300}
      src="/logo.svg"
      alt="Distrito Joven Logo"
      className="max-w-[9.375rem] invert dark:invert-0"
    />
  </div>
);

export default Logo