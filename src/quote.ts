import { createContext, useContext } from 'react';

export const QuoteContext = createContext<{ service: string; requestQuote: (serviceId?: string) => void }>({
  service: '',
  requestQuote: () => {},
});

export const useQuote = () => useContext(QuoteContext);
