import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Wallet } from 'lucide-react';

interface PlaidLinkButtonProps {
  linkToken: string;
  onSuccess: (publicToken: string) => void;
  onExit: () => void;
}

export function PlaidLinkButton({ linkToken, onSuccess, onExit }: PlaidLinkButtonProps) {
  const config = {
    token: linkToken,
    onSuccess: (public_token: string) => {
      onSuccess(public_token);
    },
    onExit: () => {
      onExit();
    }
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="w-full bg-green-500 text-black px-6 py-3 rounded-lg font-medium 
                 hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
    >
      <Wallet className="w-5 h-5" />
      Connect Bank Account
    </button>
  );
}