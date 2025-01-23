import React from 'react';
import { Store, Link as LinkIcon, ImageIcon, Youtube, Pencil } from 'lucide-react';

interface SellerInfoWidgetProps {
  username: string;
  description: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  images: string[];
  videos: string[];
  onEdit?: () => void;
}

export function SellerInfoWidget({
  username,
  description,
  socialLinks,
  images,
  videos,
  onEdit
}: SellerInfoWidgetProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <Store className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{username}</h2>
            <p className="text-gray-400">Community Leader</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
        <p className="text-white">{description}</p>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">Social Media</h3>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{link.platform}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Media */}
      <div className="space-y-4">
        {/* Images */}
        {images.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <img
                    src={image}
                    alt={`Community ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Videos</h3>
            <div className="space-y-2">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-zinc-800 rounded-lg p-3"
                >
                  <Youtube className="w-5 h-5 text-gray-400" />
                  <span className="text-white truncate">{video}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}