import React, { useState } from 'react';
import { Lock, DollarSign, AlertCircle, ArrowLeft } from 'lucide-react';
import { connectRobinhood } from '../api/robinhood';

interface RobinhoodScreenProps {
  onBack: () => void;
}

export function RobinhoodScreen({ onBack }: RobinhoodScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const response = await connectRobinhood({ username, password });
      
      // Clear sensitive data immediately
      setUsername('');
      setPassword('');
      
      if (response.status === 'error') {
        throw new Error(response.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-black rounded-xl p-8 border border-gray-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Robinhood Account</h1>
              <p className="text-gray-400">Connect to your Robinhood account</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Robinhood Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Robinhood Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={handleConnect}
                disabled={isConnecting || !username || !password}
                className="bg-green-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-green-600 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Connect Account
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400">
                Connect your Robinhood account to enable automated trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}