"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Download,
  Sparkles,
  FileText,
  Clock,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { documentService, Document } from "@/services/documentService";
import ProtectedRoute from "@/components/ProtectedRoute";

function DocumentEditorContent() {
  const params = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const [currentContent, setCurrentContent] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocument();
  }, [params.id]);

  const loadDocument = async () => {
    try {
      setLoading(true);
      const doc = await documentService.getDocument(params.id as string);
      setDocument(doc);
      setCurrentContent(doc.content);
      // Show enhanced content by default if available
      setShowEnhanced(doc.enhanced);
      setError(null);
    } catch (err) {
      setError("Failed to load document");
      console.error("Error loading document:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (value: string) => {
    setCurrentContent(value);
    setHasUnsavedChanges(true);
  };

  const saveDocument = async () => {
    if (!document) return;

    try {
      const updatedDoc = await documentService.updateDocument(document.id, {
        content: currentContent,
      });
      setDocument(updatedDoc);
      setHasUnsavedChanges(false);
      setError(null);
    } catch (err) {
      setError("Failed to save document");
      console.error("Error saving document:", err);
    }
  };

  const enhanceContent = async () => {
    if (!document) return;

    setIsEnhancing(true);

    try {
      const enhancedDoc = await documentService.enhanceDocument(document.id);
      setDocument(enhancedDoc);
      setShowEnhanced(true);
      setError(null);
    } catch (err) {
      setError("Failed to enhance document");
      console.error("Error enhancing document:", err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const downloadDocument = () => {
    const content =
      showEnhanced && document?.enhancedContent
        ? document.enhancedContent
        : currentContent;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = globalThis.document.createElement("a");
    a.href = url;
    a.download = `${document?.name || "document"}.txt`;
    globalThis.document.body.appendChild(a);
    a.click();
    globalThis.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || !document) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#853DCC] border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
          <h2 className="text-xl font-semibold mb-2">Loading document...</h2>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111] to-[#0f0f0f] border-b border-gray-700 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/enhancer"
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-gray-800"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-[#853DCC] to-[#0d9668] rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {document.name.length > 30
                    ? `${document.name.substring(0, 30)}...`
                    : document.name}
                </h1>
                <p className="text-sm text-gray-400">
                  Last modified:{" "}
                  {new Date(document.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {document.enhanced && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEnhanced(!showEnhanced)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    showEnhanced
                      ? "bg-gradient-to-r from-[#853DCC] to-[#0d9668] text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {showEnhanced ? "✨ Enhanced" : "📄 Original"}
                </button>
                <div className="w-px h-8 bg-gray-600"></div>
              </div>
            )}

            <button
              onClick={enhanceContent}
              disabled={isEnhancing}
              className="bg-gradient-to-r from-[#853DCC] to-[#0d9668] hover:from-[#0d9668] hover:to-[#853DCC] text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none font-semibold"
            >
              {isEnhancing ? (
                <>
                  <Clock className="h-5 w-5 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Enhance
                </>
              )}
            </button>

            <button
              onClick={saveDocument}
              disabled={!hasUnsavedChanges}
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none font-semibold"
            >
              <Save className="h-5 w-5" />
              Save
            </button>

            <button
              onClick={downloadDocument}
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
            >
              <Download className="h-5 w-5" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {isEnhancing ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 border-4 border-[#853DCC] border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
                <h2 className="text-2xl font-bold mb-4">
                  AI Enhancement in Progress
                </h2>
                <p className="text-gray-400 mb-4">
                  Our AI is analyzing your document and generating improvements.
                  This process takes approximately 10 seconds.
                </p>
                <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#853DCC] mb-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">Processing...</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Analyzing structure, improving clarity, enhancing flow
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-8">
              <div className="max-w-5xl mx-auto h-full">
                <div className="bg-gradient-to-br from-[#111] to-[#0f0f0f] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
                  <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-[#0f0f0f] to-[#111]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            showEnhanced && document.enhanced
                              ? "bg-gradient-to-r from-[#853DCC] to-[#0d9668]"
                              : "bg-gray-700"
                          }`}
                        >
                          {showEnhanced && document.enhanced ? (
                            <Sparkles className="h-5 w-5 text-white" />
                          ) : (
                            <FileText className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <h2 className="text-xl font-bold">
                          {showEnhanced && document.enhanced
                            ? "✨ Enhanced Content"
                            : "📝 Document Editor"}
                        </h2>
                      </div>
                      {hasUnsavedChanges && (
                        <span className="text-sm text-yellow-400 flex items-center gap-2 bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-500/30">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                          Unsaved changes
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <textarea
                      value={
                        showEnhanced && document.enhancedContent
                          ? document.enhancedContent
                          : currentContent
                      }
                      onChange={(e) => handleContentChange(e.target.value)}
                      disabled={showEnhanced && document.enhanced}
                      className="w-full h-full p-8 bg-transparent text-white resize-none focus:outline-none disabled:opacity-70 text-lg leading-relaxed font-mono"
                      placeholder="Start typing your document content here..."
                      style={{ minHeight: "calc(100vh - 300px)" }}
                    />
                    {showEnhanced && document.enhanced && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#853DCC] to-[#0d9668] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        AI Enhanced ✨
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Improvements Sidebar */}
        {document.enhanced && document.improvements && (
          <div className="w-96 bg-gradient-to-b from-[#111] to-[#0f0f0f] border-l border-gray-700 p-6 shadow-xl">
            <div className="sticky top-0">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#853DCC] to-[#0d9668] rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                AI Improvements
              </h3>

              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {document.improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#853DCC] to-[#0d9668] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">
                        {improvement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#1e293b] to-[#111] border border-[#853DCC]/30 rounded-xl shadow-lg">
                <h4 className="font-bold text-[#853DCC] mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#853DCC] rounded-full"></div>
                  Enhancement Summary
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Your document has been enhanced with{" "}
                  <span className="font-semibold text-white">
                    {document.improvements.length}
                  </span>{" "}
                  AI-powered improvements focusing on clarity, structure, and
                  engagement.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DocumentEditor() {
  return (
    <ProtectedRoute>
      <DocumentEditorContent />
    </ProtectedRoute>
  );
}
