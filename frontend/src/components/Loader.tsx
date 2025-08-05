'use client';

export default function Loader() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#0ea5e9] border-t-transparent"></div>
          <span className="text-lg text-white">Enhancing script...</span>
        </div>
        <p className="text-sm text-gray-400">
          AI is analyzing your screenplay for dialogue, tone, and character consistency
        </p>
      </div>
    </div>
  );
}