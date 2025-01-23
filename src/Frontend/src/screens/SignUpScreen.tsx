import React from 'react';
import { Store, Users } from 'lucide-react';

interface SignUpScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function SignUpScreen({ onBack, onNavigate }: SignUpScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto pt-20 px-8">
        <h1 className="text-5xl font-bold text-center mb-12">Choose Your Path</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Launch Community Option */}
          <div 
            onClick={() => onNavigate('seller-registration')}
            className="bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition-colors group cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Launch Your Community</h2>
              <p className="text-gray-400 mb-8">
                Start your own trading community, share signals, and monetize your expertise.
              </p>
              <button 
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Join Community Option */}
          <div 
            onClick={() => onNavigate('community-registration')}
            className="bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition-colors group cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Join a Community</h2>
              <p className="text-gray-400 mb-8">
                Follow top traders, get real-time signals, and learn from the best in the industry.
              </p>
              <button 
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-12 mx-auto block text-gray-400 hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}