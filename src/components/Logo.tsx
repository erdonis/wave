'use client';

import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function Logo() {
  const { theme } = useContext(ThemeContext);
  const [themeLogo, setThemeLogo] = useState('/logo_dark.png');

  useEffect(() => {
    const darkLog = 'logo_dark.png';
    const lightLogo = 'logo.png';
    if (theme === 'dark' || (theme === 'system' && document.documentElement.classList.contains('dark'))) {
      setThemeLogo(lightLogo);
    } else {
      setThemeLogo(darkLog);
    }
  }, [theme]);

  return <img src={themeLogo} className="h-16 w-16" alt="Logo" width={274} height={270} />;
}
