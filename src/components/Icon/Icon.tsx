import Image from 'next/image';
import React from 'react';

const Icon = () => (
  <div className="icon">
    <Image
      width={300}
      height={300}
      src="/logo.svg"
      alt="Distrito Joven Icon"
      className="max-w-[9.375rem] invert dark:invert-0 border-teal-300"
    />
  </div>
);

export default Icon