import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'valentine-progress';

export function useProgress() {
  const [completedPages, setCompletedPages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedPages));
  }, [completedPages]);

  const completePage = useCallback((page: number) => {
    setCompletedPages(prev => {
      if (prev.includes(page)) return prev;
      return [...prev, page].sort((a, b) => a - b);
    });
  }, []);

  const isPageAccessible = useCallback((page: number): boolean => {
    if (page === 0) return true; // landing always accessible
    if (page === 1) return completedPages.includes(0); // need landing done
    return completedPages.includes(page - 1);
  }, [completedPages]);

  const isPageCompleted = useCallback((page: number): boolean => {
    return completedPages.includes(page);
  }, [completedPages]);

  const getMaxAccessible = useCallback((): number => {
    if (completedPages.length === 0) return 0;
    const max = Math.max(...completedPages);
    return Math.min(max + 1, 7); // 7 = final page
  }, [completedPages]);

  return { completedPages, completePage, isPageAccessible, isPageCompleted, getMaxAccessible };
}
