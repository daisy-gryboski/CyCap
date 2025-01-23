import React, { createContext, useContext, useState } from 'react';

interface SocialLink {
  platform: string;
  url: string;
}

interface SellerInfo {
  username: string;
  description: string;
  type: 'crypto' | 'options' | 'futures' | 'stocks';
  memberCount: number;
  winRate: number;
  monthlyReturn: number;
  isVerified: boolean;
  socialLinks: SocialLink[];
  images: string[];
  videos: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  sellerInfo: SellerInfo | null;
  allSellers: SellerInfo[];
  login: (username: string, sellerInfo?: SellerInfo) => void;
  logout: () => void;
  updateSellerInfo: (info: SellerInfo) => void;
}

const dummySellers: SellerInfo[] = [
  // Crypto Communities
  {
    username: "CryptoAlpha",
    description: "Leading crypto signals with focus on Bitcoin and top altcoins. Proven track record of successful trades in bull and bear markets.",
    type: "crypto",
    memberCount: 15234,
    winRate: 92.5,
    monthlyReturn: 28.4,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  {
    username: "DeFi Traders",
    description: "Specialized in DeFi protocols and yield farming strategies. Daily signals and market analysis for the DeFi ecosystem.",
    type: "crypto",
    memberCount: 8756,
    winRate: 88.9,
    monthlyReturn: 24.7,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  
  // Options Communities
  {
    username: "Options Elite",
    description: "Expert options trading strategies focusing on high-probability setups. Weekly options flow analysis and trade alerts.",
    type: "options",
    memberCount: 12453,
    winRate: 89.3,
    monthlyReturn: 32.1,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  {
    username: "Theta Gang",
    description: "Premium options selling strategies. Specializing in theta decay and income generation through options.",
    type: "options",
    memberCount: 9234,
    winRate: 94.2,
    monthlyReturn: 18.5,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  
  // Futures Communities
  {
    username: "Futures Masters",
    description: "Day trading futures with precision. Focus on ES, NQ, and CL futures with real-time trade alerts.",
    type: "futures",
    memberCount: 7845,
    winRate: 87.6,
    monthlyReturn: 45.3,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  {
    username: "Index Futures Pro",
    description: "Technical analysis driven futures trading. Specializing in index futures with detailed market analysis.",
    type: "futures",
    memberCount: 6234,
    winRate: 85.8,
    monthlyReturn: 38.9,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  
  // Stocks Communities
  {
    username: "Momentum Stocks",
    description: "Catching the biggest movers in the stock market. Focus on momentum and breakout strategies.",
    type: "stocks",
    memberCount: 18567,
    winRate: 91.4,
    monthlyReturn: 26.8,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  },
  {
    username: "Value Investors Club",
    description: "Long-term value investing strategies. Finding undervalued stocks with strong growth potential.",
    type: "stocks",
    memberCount: 14532,
    winRate: 95.7,
    monthlyReturn: 21.3,
    isVerified: true,
    socialLinks: [],
    images: [],
    videos: []
  }
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);
  const [allSellers, setAllSellers] = useState<SellerInfo[]>(dummySellers);

  const login = (username: string, sellerInfo?: SellerInfo) => {
    setIsAuthenticated(true);
    setUsername(username);
    if (sellerInfo) {
      setSellerInfo(sellerInfo);
      setAllSellers(prev => [...prev, sellerInfo]);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setSellerInfo(null);
  };

  const updateSellerInfo = (info: SellerInfo) => {
    setSellerInfo(info);
    setAllSellers(prev => prev.map(seller => 
      seller.username === info.username ? info : seller
    ));
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      username, 
      sellerInfo,
      allSellers,
      login, 
      logout,
      updateSellerInfo 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}