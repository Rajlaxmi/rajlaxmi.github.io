import { useEffect } from 'react';

/**
 * Sets the document title and meta description for a route. Both are restored
 * when the component unmounts so a client-side navigation never leaves stale
 * metadata behind.
 */
const useDocumentTitle = (title: string, description?: string): void => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;
    if (meta && description) meta.content = description;

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [title, description]);
};

export default useDocumentTitle;
