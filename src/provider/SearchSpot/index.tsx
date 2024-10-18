import { createContext, ReactNode, useState } from 'react';

interface SearchSpotInfo {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  bound: Bounds;
  setBound: React.Dispatch<React.SetStateAction<Bounds>>;
}

interface Bounds {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}

export const SearchSpotContext = createContext<SearchSpotInfo>(
  {} as SearchSpotInfo,
);
export const SearchSpotProvider = ({ children }: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState('검색');
  const [bound, setBound] = useState<Bounds>();

  const value = { keyword, setKeyword, bound, setBound };
  return (
    //@ts-ignore
    <SearchSpotContext.Provider value={value}>
      {children}
    </SearchSpotContext.Provider>
  );
};
