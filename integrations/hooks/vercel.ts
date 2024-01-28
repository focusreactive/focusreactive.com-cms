import { useEffect, useRef, useState } from 'react';
import { getHasActiveDeployments, getIsVercelIntegrationEnabled } from '../vercel';

export const useHasActiveDeployments = () => {
  const checkInterval = 1000 * 5; // 5 seconds
  const checkIntervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const [hasActiveDeployments, setHasActiveDeployments] = useState(false);

  const checkActiveDeployments = async () => {
    setHasActiveDeployments(await getHasActiveDeployments());
  };

  useEffect(() => {
    if (!getIsVercelIntegrationEnabled()) return;

    checkIntervalId.current = setInterval(checkActiveDeployments, checkInterval);

    return () => {
      if (checkIntervalId.current) {
        clearInterval(checkIntervalId.current);
      }
    };
  }, []);

  return { hasActiveDeployments, checkActiveDeployments };
};
