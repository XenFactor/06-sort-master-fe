import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Advert } from '../common/types/Advert';
import { fetchJson } from '../lib/api';

interface AdvertsContextType {
  adverts: Advert[];
  loading: boolean;
  error: string | null;
  addAdvert: (advert: Advert) => void;
  removeAdvert: (id: number) => void;
  reloadAdverts: () => void;
}

const AdvertsContext = createContext<AdvertsContextType | undefined>(undefined);

export function AdvertsProvider({ children }: { children: ReactNode }) {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdverts = () => {
    setLoading(true);
    fetchJson<Advert[]>('/api/advert')
      .then((data) => {
        setAdverts(data || []);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setAdverts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdverts();
  }, []);

  const addAdvert = (advert: Advert) => {
    setAdverts((prev) => [advert, ...prev]);
  };

  const removeAdvert = (id: number) => {
    setAdverts((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <AdvertsContext.Provider value={{ adverts, loading, error, addAdvert, removeAdvert, reloadAdverts: loadAdverts }}>
      {children}
    </AdvertsContext.Provider>
  );
}

export function useAdverts() {
  const ctx = useContext(AdvertsContext);
  if (!ctx) throw new Error('useAdverts must be used within an AdvertsProvider');
  return ctx;
} 