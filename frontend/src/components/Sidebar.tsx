'use client';

import { useState } from 'react';
import { DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
}

interface SidebarProps {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (document: Document) => void;
  onNewScript: () => void;
}

export default function Sidebar({ documents, selectedDocument, onSelectDocument, onNewScript }: SidebarProps) {
  return (
    <div className="w-64 bg-[#2f2f2f] border-r border-[#3f3f3f] flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-[#3f3f3f]">
        <h1 className="text-white font-semibold text-lg">AI Screenplay Enhancer</h1>
      </div>

      {/* New Script Button */}
      <div className="p-4">
        <button
          onClick={onNewScript}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3f3f3f] rounded-md transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Script
        </button>
      </div>

      {/* Documents Section */}
      <div className="flex-1 overflow-y-auto sidebar-scrollbar">
        <div className="px-4 pb-2">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            My Documents
          </h2>
          
          {documents.length === 0 ? (
            <div className="text-sm text-gray-500 italic">
              No documents uploaded yet
            </div>
          ) : (
            <div className="space-y-1">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDocument(doc)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                    selectedDocument?.id === doc.id
                      ? 'bg-[#0ea5e9] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#3f3f3f]'
                  }`}
                >
                  <DocumentTextIcon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{doc.name}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {doc.uploadedAt}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}