'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

interface Document {
  id: string;
  name: string;
  uploadedAt: string;
}

interface ScriptEditorProps {
  document: Document;
}

const mockEnhancedScript = `FADE IN:

EXT. COFFEE SHOP - DAY

The morning sun filters through large windows as SARAH (28), a determined journalist, sits across from MARCUS (35), a tech entrepreneur with tired eyes.

SARAH
(leaning forward, more assertive)
Marcus, people deserve to know the truth. Your silence isn't protecting anyone—it's enabling the very system you claim to oppose.

MARCUS
(pause, conflicted)
You don't understand the complexity here, Sarah. One wrong move and everything I've built... everything we've worked for... it all crumbles.

SARAH
(softening, but firm)
Sometimes things need to crumble before they can be rebuilt properly. That's not destruction—that's renovation.

Marcus stares into his coffee, the weight of decision heavy on his shoulders.

MARCUS
(quietly, with resolve)
Give me 24 hours. If I'm going to do this, I need to do it right.

FADE OUT.`;

const aiChanges = [
  "Rewrote Sarah's opening dialogue to be more assertive and emotionally compelling",
  "Added character direction for Marcus showing internal conflict through body language",
  "Enhanced the metaphor in Sarah's response about 'renovation vs destruction'",
  "Improved pacing by adding strategic pauses and character beats",
  "Strengthened Marcus's final line to show character growth and decision-making"
];

export default function ScriptEditor({ document }: ScriptEditorProps) {
  const handleDownload = () => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Enhanced Screenplay', 20, 20);
    
    // Add document info
    pdf.setFontSize(10);
    pdf.text(`Original: ${document.name}`, 20, 30);
    pdf.text(`Enhanced: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Add script content
    pdf.setFontSize(12);
    const lines = mockEnhancedScript.split('\n');
    let yPosition = 50;
    
    lines.forEach((line) => {
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, 20, yPosition);
      yPosition += 6;
    });
    
    pdf.save(`${document.name.replace(/\.[^/.]+$/, '')}_enhanced.pdf`);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#3f3f3f] p-6">

        
        <h1 className="text-2xl font-semibold text-white mb-2">
          {document.name}
        </h1>
        
        <p className="text-sm text-gray-400 mb-4">
          {document.uploadedAt} · Last AI Update: just now
        </p>
        
        <div className="bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-lg p-4">
          <p className="text-sm text-[#0ea5e9]">
            AI will enhance dialogue, emotional tone, and character consistency based on your uploaded script.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl">
          {/* Enhanced Script Preview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Enhanced Script Preview</h2>
            <div className="bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg p-6">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                {mockEnhancedScript}
              </pre>
            </div>
          </div>

          {/* AI Changes Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">What the AI Changed</h2>
            <div className="bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg p-6">
              <ul className="space-y-3">
                {aiChanges.map((change, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#0ea5e9] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download Enhanced Script (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}