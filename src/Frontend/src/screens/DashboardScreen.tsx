import React, { useState } from 'react';
import { DashboardWidget } from '../components/DashboardWidget';
import { CommunityPerformance } from '../components/CommunityPerformance';
import { TopCommunities } from '../components/TopCommunities';
import { ChevronDown, LayoutDashboard } from 'lucide-react';
import { BankConnection } from '../components/BankConnection';

interface DashboardScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onBack, onNavigate }: DashboardScreenProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const activeSignals = [
    {
      symbol: 'AAPL',
      type: 'LONG',
      entry: 185.45,
      stopLoss: 182.30,
      takeProfit: 189.75,
      community: 'Alpha Traders',
      time: '2m ago'
    },
    {
      symbol: 'TSLA',
      type: 'SHORT',
      entry: 245.80,
      stopLoss: 249.20,
      takeProfit: 238.50,
      community: 'Beta Group',
      time: '15m ago'
    },
    {
      symbol: 'NVDA',
      type: 'LONG',
      entry: 725.40,
      stopLoss: 718.60,
      takeProfit: 735.90,
      community: 'Delta Force',
      time: '45m ago'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 px-8 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-white">CyCap</div>
          
          <div className="relative">
            <button 
              className="text-white flex items-center gap-1 hover:text-gray-300 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              What We Offer <ChevronDown className="w-4 h-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full mt-2 bg-black rounded-lg shadow-lg py-2 w-48">
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-900">Trading Tools</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-900">Analytics</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-900">Risk Management</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-900">Community Features</a>
              </div>
            )}
          </div>
          
          <button 
            className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
            onClick={onBack}
          >
            <LayoutDashboard className="w-4 h-4" />
            Home
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

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('robinhood')}
            className="bg-green-500 text-black px-6 py-2 rounded-full font-medium hover:bg-green-400 transition-colors"
          >
            Connect Robinhood
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            Login
          </button>
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Sign up
          </button>
        </div>
      </nav>

      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bank Connection Widget */}
          <div className="mb-8">
            <BankConnection />
          </div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <DashboardWidget
              type="communities"
              title="Active Communities"
              value="2,847"
            />
            <DashboardWidget
              type="winRate"
              title="Win Rate"
              value="78.5%"
            />
            <DashboardWidget
              type="traders"
              title="Verified Traders"
              value="1,234"
            />
            <DashboardWidget
              type="volume"
              title="Monthly Volume"
              value="$12.4M"
            />
          </div>
          
          {/* Performance and Top Communities */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <CommunityPerformance />
            </div>
            <div>
              <TopCommunities />
            </div>
          </div>

          {/* Active Signals */}
          <div className="bg-black rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Active Signals</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Entry</th>
                    <th className="pb-3 font-medium">SL</th>
                    <th className="pb-3 font-medium">TP</th>
                    <th className="pb-3 font-medium">Community</th>
                    <th className="pb-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSignals.map((signal, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-800 text-white hover:bg-gray-900 transition-colors"
                    >
                      <td className="py-4 font-medium">{signal.symbol}</td>
                      <td className={`py-4 ${signal.type === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                        {signal.type}
                      </td>
                      <td className="py-4">${signal.entry}</td>
                      <td className="py-4 text-red-400">${signal.stopLoss}</td>
                      <td className="py-4 text-green-400">${signal.takeProfit}</td>
                      <td className="py-4">{signal.community}</td>
                      <td className="py-4 text-gray-400">{signal.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}