import React, { useState, useEffect } from 'react';
import { Store, ArrowLeft, AlertCircle, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../hooks/useNavigate';

interface SellerRegistrationScreenProps {
  onBack: () => void;
}

interface SocialLink {
  platform: string;
  url: string;
}

export function SellerRegistrationScreen({ onBack }: SellerRegistrationScreenProps) {
  const { username: currentUsername, sellerInfo, login, updateSellerInfo } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'crypto' | 'options' | 'futures' | 'stocks'>('crypto');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([{ platform: '', url: '' }]);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sellerInfo) {
      setIsEditMode(true);
      setUsername(currentUsername || '');
      setDescription(sellerInfo.description || '');
      setType(sellerInfo.type || 'crypto');
      setSocialLinks(sellerInfo.socialLinks.length > 0 ? sellerInfo.socialLinks : [{ platform: '', url: '' }]);
    }
  }, [sellerInfo, currentUsername]);

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index][field] = value;
    setSocialLinks(newLinks);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isEditMode && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const sellerInfo = {
        username,
        description,
        type,
        memberCount: 0,
        winRate: 0,
        monthlyReturn: 0,
        isVerified: true,
        socialLinks: socialLinks.filter(link => link.platform && link.url),
        images: images.map(image => URL.createObjectURL(image)),
        videos: videos.map(video => video.name)
      };

      if (isEditMode) {
        updateSellerInfo(sellerInfo);
      } else {
        login(username, sellerInfo);
      }

      navigate('seller-dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto pt-20 px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-zinc-900 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {isEditMode ? 'Edit Community Profile' : 'Create Seller Account'}
              </h1>
              <p className="text-gray-400">
                {isEditMode ? 'Update your community information' : 'Start your trading community'}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isEditMode}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Choose a username"
              />
            </div>

            {!isEditMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Community Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="crypto">Crypto</option>
                <option value="options">Options</option>
                <option value="futures">Futures</option>
                <option value="stocks">Stocks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Community Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Describe your trading community..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Social Links
              </label>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      placeholder="Platform (e.g., Twitter)"
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                               focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500
                               focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="p-3 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Social Link
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white
                         file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold file:bg-white file:text-black
                         hover:file:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Videos
              </label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white
                         file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold file:bg-white file:text-black
                         hover:file:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg 
                       hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {isEditMode ? 'Updating Profile...' : 'Creating Account...'}
                </>
              ) : (
                isEditMode ? 'Update Profile' : 'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}