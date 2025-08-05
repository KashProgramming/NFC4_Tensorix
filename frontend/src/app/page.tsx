'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import FileUploader from '@/components/FileUploader';
import ScriptEditor from '@/components/ScriptEditor';
import Loader from '@/components/Loader';

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
}

type AppState = 'empty' | 'uploading' | 'processing' | 'viewing';

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [appState, setAppState] = useState<AppState>('empty');

  const handleFileUpload = (file: File) => {
    setAppState('processing');
    
    // Simulate processing time
    setTimeout(() => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        uploadedAt: `Uploaded ${getRelativeTime(new Date())}`
      };
      
      setDocuments(prev => [...prev, newDocument]);
      setSelectedDocument(newDocument);
      setAppState('viewing');
    }, 2500); // 2.5 second delay to simulate AI processing
  };

  const handleSelectDocument = (document: Document) => {
    setSelectedDocument(document);
    setAppState('viewing');
  };

  const handleNewScript = () => {
    setSelectedDocument(null);
    setAppState('empty');
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const renderMainContent = () => {
    switch (appState) {
      case 'empty':
        return <FileUploader onFileUpload={handleFileUpload} />;
      case 'processing':
        return <Loader />;
      case 'viewing':
        return selectedDocument ? (
          <ScriptEditor document={selectedDocument} />
        ) : (
          <FileUploader onFileUpload={handleFileUpload} />
        );
      default:
        return <FileUploader onFileUpload={handleFileUpload} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#191919] text-white">
      <Sidebar
        documents={documents}
        selectedDocument={selectedDocument}
        onSelectDocument={handleSelectDocument}
        onNewScript={handleNewScript}
      />
      {renderMainContent()}
    </div>
  );
}
