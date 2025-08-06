'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Trash2, Edit3, Clock, Sparkles, CheckCircle, X, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { documentService, Document } from '@/services/documentService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

function EnhancerPageContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await documentService.getAllDocuments();
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError('Failed to load documents');
      console.error('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const newDoc = await documentService.uploadDocument({ file });
      setDocuments(prev => [...prev, newDoc]);
      setSelectedDoc(newDoc);
      setError(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload document');
      console.error('Error uploading document:', err);
    } finally {
      setUploading(false);
    }
  };

  const enhanceDocument = async (doc: Document) => {
    setIsProcessing(true);
    
    try {
      const enhancedDoc = await documentService.enhanceDocument(doc.id);
      
      setDocuments(prev => 
        prev.map(d => d.id === doc.id ? enhancedDoc : d)
      );
      setSelectedDoc(enhancedDoc);
      setError(null);
    } catch (err) {
      setError('Failed to enhance document');
      console.error('Error enhancing document:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await documentService.deleteDocument(id);
      setDocuments(prev => prev.filter(d => d.id !== id));
      if (selectedDoc?.id === id) {
        setSelectedDoc(null);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete document');
      console.error('Error deleting document:', err);
    }
  };

  const startEditing = (doc: Document) => {
    setEditingName(doc.id);
    setNewName(doc.name);
  };

  const saveEdit = async (id: string) => {
    try {
      const updatedDoc = await documentService.updateDocument(id, { name: newName });
      setDocuments(prev =>
        prev.map(d => d.id === id ? updatedDoc : d)
      );
      if (selectedDoc?.id === id) {
        setSelectedDoc(updatedDoc);
      }
      setEditingName(null);
      setNewName('');
      setError(null);
    } catch (err) {
      setError('Failed to update document name');
      console.error('Error updating document:', err);
    }
  };

  const cancelEdit = () => {
    setEditingName(null);
    setNewName('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#111] border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#853DCC] h-6 w-6" />
              <h1 className="text-xl font-bold">Document Enhancer</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="h-4 w-4" />
                <span>{user?.username}</span>
              </div>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-[#853DCC] to-[#0d9668] hover:from-[#0d9668] hover:to-[#853DCC] text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="font-semibold">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span className="font-semibold">Upload Document</span>
              </>
            )}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Documents ({documents.length})
          </h2>
          
          <div className="space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#853DCC] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  selectedDoc?.id === doc.id
                    ? 'bg-[#853DCC]/20 border-[#853DCC]'
                    : 'bg-[#1a1a1a] border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="flex items-center justify-between mb-2">
                  {editingName === doc.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 bg-[#0a0a0a] border border-gray-600 rounded px-2 py-1 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(doc.id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        autoFocus
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit(doc.id);
                        }}
                        className="text-green-500 hover:text-green-400"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelEdit();
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-medium truncate" title={doc.name}>
                          {doc.name.length > 20 ? `${doc.name.substring(0, 20)}...` : doc.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(doc);
                          }}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDocument(doc.id);
                          }}
                          className="text-gray-400 hover:text-red-400 p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  {doc.enhanced && (
                    <span className="bg-[#853DCC] text-white px-2 py-1 rounded-full">
                      Enhanced
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedDoc ? (
          <>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedDoc.name}</h2>
                  <p className="text-gray-400">
                    Uploaded {new Date(selectedDoc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Link
                    href={`/enhancer/${selectedDoc.id}`}
                    className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Edit3 className="h-4 w-4" />
                    Open in Editor
                  </Link>
                  
                  {!selectedDoc.enhanced && (
                    <button
                      onClick={() => enhanceDocument(selectedDoc)}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-[#853DCC] to-[#0d9668] hover:from-[#0d9668] hover:to-[#853DCC] text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="h-5 w-5 animate-spin" />
                          <span className="font-semibold">Processing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          <span className="font-semibold">Enhance Document</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 border-4 border-[#853DCC] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">AI Enhancement in Progress</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Our AI is analyzing your document and generating improvements. This process takes approximately 10 seconds.
                  </p>
                </div>
              ) : selectedDoc.enhanced ? (
                <div className="space-y-8">
                  {/* Enhanced Content Preview - Main Focus */}
                  <div className="bg-gradient-to-br from-[#1e293b] to-[#111] border border-[#853DCC]/30 rounded-2xl p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="p-2 bg-[#853DCC] rounded-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      Enhanced Version
                    </h3>
                    
                    <div className="bg-[#0a0a0a]/50 border border-[#853DCC]/20 rounded-xl p-6 backdrop-blur-sm">
                      <pre className="text-base text-white whitespace-pre-wrap leading-relaxed font-mono">
                        {selectedDoc.enhancedContent}
                      </pre>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <Link
                        href={`/enhancer/${selectedDoc.id}`}
                        className="bg-gradient-to-r from-[#853DCC] to-[#0d9668] hover:from-[#0d9668] hover:to-[#853DCC] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Edit3 className="h-5 w-5" />
                        <span className="font-semibold">Edit Enhanced Version</span>
                      </Link>
                    </div>
                  </div>

                  {/* Original Content - Collapsed by default */}
                  <div className="bg-[#111] border border-gray-700 rounded-xl p-6">
                    <details className="group">
                      <summary className="cursor-pointer flex items-center gap-2 text-lg font-semibold text-gray-300 hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                        View Original Content
                        <div className="ml-auto transform group-open:rotate-180 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="mt-4 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {selectedDoc.content}
                        </pre>
                      </div>
                    </details>
                  </div>

                  {/* Improvements Section */}
                  <div className="bg-gradient-to-br from-[#111] to-[#0f0f0f] border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      AI Improvements Applied
                    </h3>
                    
                    <div className="grid gap-4">
                      {selectedDoc.improvements?.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-200 leading-relaxed">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#111] to-[#0f0f0f] border border-gray-700 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-gray-600 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    Document Preview
                  </h3>
                  
                  <div className="bg-[#0a0a0a]/50 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
                    <pre className="text-base text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
                      {selectedDoc.content}
                    </pre>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#1e293b] to-[#111] border border-[#853DCC]/30 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-[#853DCC] rounded-lg flex-shrink-0">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[#853DCC] font-bold text-lg mb-2">Ready for AI Enhancement</p>
                        <p className="text-gray-300 leading-relaxed">
                          Transform this content with AI-powered improvements including better structure, enhanced clarity, improved grammar, and more engaging language.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Document Selected</h2>
              <p className="text-gray-400 mb-6">
                Upload a document or select one from the sidebar to get started with AI enhancement.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-[#853DCC] to-[#0d9668] hover:from-[#0d9668] hover:to-[#853DCC] text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload className="h-6 w-6" />
                <span className="font-bold text-lg">Upload Your First Document</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnhancerPage() {
  return (
    <ProtectedRoute>
      <EnhancerPageContent />
    </ProtectedRoute>
  );
}