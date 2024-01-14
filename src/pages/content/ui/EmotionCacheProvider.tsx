import createCache from '@emotion/cache';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';

export default function EmotionCacheProvider({ children, rootId }: { rootId: string; children: ReactNode }) {
  const [emotionCache, setEmotionCache] = useState<EmotionCache | null>(null);

  useEffect(() => {
    function setEmotionStyles(shadowRoot: ShadowRoot) {
      setEmotionCache(
        createCache({
          key: rootId,
          container: shadowRoot,
        }),
      );
    }

    const root = document.getElementById(rootId);
    if (root && root.shadowRoot) {
      setEmotionStyles(root.shadowRoot);
    }
  }, [rootId]); // rootId를 의존성 배열에 추가

  return emotionCache ? <CacheProvider value={emotionCache}>{children}</CacheProvider> : null;
}
