import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
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

    // Transform to match frontend interface
    const transformedDocument = {
      id: document.id,
      name: document.name,
      content: document.originalFileName,
      uploadedAt: document.createdAt.toISOString(),
      enhanced: !!document.enhancedText,
      enhancedContent: document.enhancedText,
      improvements: document.improvements
    };

    return NextResponse.json({ document: transformedDocument });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, content } = body;
    
    const document = await prisma.document.findUnique({
      where: { id: params.id }
    });
    
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const updatedDocument = await prisma.document.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(content && { originalFileName: content })
      }
    });

    // Transform to match frontend interface
    const transformedDocument = {
      id: updatedDocument.id,
      name: updatedDocument.name,
      content: updatedDocument.originalFileName,
      uploadedAt: updatedDocument.createdAt.toISOString(),
      enhanced: !!updatedDocument.enhancedText,
      enhancedContent: updatedDocument.enhancedText,
      improvements: updatedDocument.improvements
    };

    return NextResponse.json({ document: transformedDocument });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await prisma.document.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}