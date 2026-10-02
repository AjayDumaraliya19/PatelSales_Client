import React, { useEffect, useState } from 'react';
import Icon from '../ui/AppIcon';

export default function PWAUpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateFn, setUpdateFn] = useState(null);

  useEffect(() => {
    const handleNeedRefresh = (event) => {
      const customEvent = event;
      setUpdateFn(() => customEvent.detail);
      setShowUpdate(true);
    };

    window.addEventListener('pwa-need-refresh', handleNeedRefresh);
    return () => window.removeEventListener('pwa-need-refresh', handleNeedRefresh);
  }, []);

  const handleUpdate = async () => {
    if (updateFn) await updateFn(true);
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom))] lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:max-w-sm z-[55]">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-[#003087]/10 rounded-lg flex items-center justify-center shrink-0">
          <Icon name="ArrowPathIcon" size={20} className="text-[#003087]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 mb-0.5">Update available</p>
          <p className="text-xs text-gray-500 mb-3">A new version of Patel Sales is ready.</p>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-[#003087] hover:bg-[#002266] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Update Now
            </button>
            <button
              onClick={() => setShowUpdate(false)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-2"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
