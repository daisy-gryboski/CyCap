import React, { useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TradeExecutionWidget } from '../components/TradeExecutionWidget';
import { VerifiedCommunitiesWidget } from '../components/VerifiedCommunitiesWidget';
import { PerformanceTrackingWidget } from '../components/PerformanceTrackingWidget';
import { TradeLoggingWidget } from '../components/TradeLoggingWidget';
import { RiskManagementWidget } from '../components/RiskManagementWidget';
import { CommunityInsightsWidget } from '../components/CommunityInsightsWidget';
import { ProfileWidget } from '../components/ProfileWidget';
import { PerformanceOverview } from '../components/PerformanceOverview';
import { MonthlyStats } from '../components/MonthlyStats';
import { RiskMetrics } from '../components/RiskMetrics';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);

  };

return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black z-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
	    <div className="flex items-center gap-3">
	    <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
		  className="p-2 hover:bg-zinc-800 rounded-lg"
                >
		<Menu className="w-5 h-5 text-white" />
                </button>
                <span className="text-white font-bold">CYCAP</span>
              </div>
	      {showMobileMenu && (
	        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col space-y-2 p-4 lg:hidden">
		    <button className="text-left hover:text-gray-300">What We Offer</button>					  <button className="text-left hover:text-gray-300">Communities</button>
		    <button className="text-left hover:text-gray-300">Learn</button>
		    <button className="text-left hover:text-gray-300">Support</button>
	  </div>
	)}
{/*
	<div className="hidden lg:flex items-center gap-6">
                <button className="text-white hover:text-gray-300 transition-colors flex items-center gap-2">
                  What We Offer <ChevronDown className="w-4 h-4" />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  Communities
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  Learn
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  Support
                </button>
        </div>
	*/}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('login')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 min-h-screen flex items-center">
        <div className="w-full max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <h1 className="text-[120px] font-bold leading-none tracking-tight">
              <div className="text-white">trade</div>
              <div className="text-white">with the best</div>
              <div className="text-white">win</div>
              <div className="text-white">together</div>
            </h1>
            
            <p className="text-gray-400 text-xl mt-8 mb-12 max-w-xl">
              Join <span className="text-white">verified</span> trading communities. Execute trades
              <span className="text-white"> instantly</span>. Track performance in <span className="text-white">real-time</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-white text-black px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
              >
                START TRADING
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="text-white px-8 py-3 rounded-lg font-medium text-lg border border-white/20 hover:bg-white/5 transition-colors"
              >
                Sign in →
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden">
            {/* Add your hero image here */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900/50 py-32">
        <div className="max-w-screen-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Everything you need to trade
            <br />
            <span className="text-gray-400">with confidence</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Join verified trading communities and execute trades with precision using
            our comprehensive platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-xl">
              <PerformanceTrackingWidget />
            </div>
            <div className="bg-black p-8 rounded-xl">
              <TradeExecutionWidget />
            </div>
            <div className="bg-black p-8 rounded-xl">
              <VerifiedCommunitiesWidget />
            </div>
            <div className="bg-black p-8 rounded-xl">
              <TradeLoggingWidget />
            </div>
            <div className="bg-black p-8 rounded-xl">
              <RiskManagementWidget />
            </div>
            <div className="bg-black p-8 rounded-xl">
              <CommunityInsightsWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="py-32">
        <div className="max-w-screen-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Track Your Performance
            <br />
            <span className="text-gray-400">in real-time</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Monitor your trading performance with advanced analytics and insights
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <ProfileWidget 
                username="Alpha Trader"
                memberCount={1234}
                winRate={87.5}
                monthlyWinRate={92.3}
                totalTrades={1543}
                isVerified={true}
              />
            </div>
            <div className="lg:col-span-2">
              <PerformanceOverview />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-zinc-900 rounded-xl p-6">
              <MonthlyStats 
                winRate={78.5}
                profitFactor={2.4}
                totalTrades={342}
              />
            </div>
            <div className="bg-zinc-900 rounded-xl p-6">
              <RiskMetrics 
                maxDrawdown={12.3}
                sharpeRatio={2.8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}