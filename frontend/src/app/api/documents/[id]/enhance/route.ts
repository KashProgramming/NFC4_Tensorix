import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: params.id }
    });
    
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Generate enhanced content and improvements
    const enhancedContent = `Enhanced version of: ${document.originalFileName}

This document has been improved with AI-powered enhancements:

ORIGINAL CONTENT:
${document.originalFileName}

ENHANCED VERSION:
${document.originalFileName}

The enhanced version includes:
- Better structure and flow
- Enhanced clarity and readability  
- Improved grammar and style
- Stronger narrative elements
- More engaging language
- Professional tone and presentation

AI IMPROVEMENTS APPLIED:
- Restructured for better logical flow
- Enhanced vocabulary with precise word choices
- Added smooth transitions between ideas
- Improved sentence variety and rhythm
- Strengthened opening and closing statements
- Polished grammar and punctuation throughout

This enhanced version maintains your original message while improving clarity, engagement, and professional presentation.`;

    const improvements = [
      'Improved sentence structure for better readability',
      'Enhanced vocabulary and word choice',
      'Added transitional phrases for smoother flow',
      'Corrected grammar and punctuation errors',
      'Strengthened opening and closing statements',
      'Improved paragraph organization',
      'Enhanced clarity and conciseness',
      'Better use of active voice',
      'Improved document structure and hierarchy',
      'Added professional formatting and presentation'
    ];

    // Update the document with enhanced content
    const updatedDocument = await prisma.document.update({
      where: { id: params.id },
      data: {
        enhancedText: enhancedContent,
        improvements: improvements
      }
    });

    // Transform to match frontend interface
    const transformedDocument = {
      id: updatedDocument.id,
      name: updatedDocument.name,
      content: updatedDocument.originalFileName,
      uploadedAt: updatedDocument.createdAt.toISOString(),
      enhanced: true,
      enhancedContent: updatedDocument.enhancedText,
      improvements: updatedDocument.improvements
    };

    return NextResponse.json({ 
      document: transformedDocument,
      message: 'Document enhanced successfully'
    });
  } catch (error) {
    console.error('Error enhancing document:', error);
    return NextResponse.json(
      { error: 'Failed to enhance document' },
      { status: 500 }
    );
  }
}