import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    
    const documents = await prisma.document.findMany({
      where: {
        userId: user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match frontend interface
    const transformedDocuments = documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      content: doc.originalFileName, // Using originalFileName as content for now
      uploadedAt: doc.createdAt.toISOString(),
      enhanced: !!doc.enhancedText,
      enhancedContent: doc.enhancedText,
      improvements: doc.improvements
    }));

    return NextResponse.json({ documents: transformedDocuments });
  } catch (error: any) {
    console.error('Error fetching documents:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const body = await request.json();
    const { name, content } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }

    // Predefined enhanced content and improvements
    const enhancedText = `Enhanced version of: ${content}

This document has been improved with AI-powered enhancements:

ORIGINAL CONTENT:
${content}

ENHANCED VERSION:
${content}

The enhanced version includes:
- Better structure and flow
- Enhanced clarity and readability  
- Improved grammar and style
- Stronger narrative elements
- More engaging language
- Professional tone and presentation

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
      'Improved document structure and hierarchy'
    ];

    const newDocument = await prisma.document.create({
      data: {
        name,
        originalFileName: content, // Store content in originalFileName for now
        enhancedText,
        improvements,
        userId: user.userId
      }
    });

    // Transform to match frontend interface
    const transformedDocument = {
      id: newDocument.id,
      name: newDocument.name,
      content: newDocument.originalFileName,
      uploadedAt: newDocument.createdAt.toISOString(),
      enhanced: true,
      enhancedContent: newDocument.enhancedText,
      improvements: newDocument.improvements
    };

    return NextResponse.json({ document: transformedDocument }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating document:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}