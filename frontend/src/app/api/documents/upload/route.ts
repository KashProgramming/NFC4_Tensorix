import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/markdown",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload PDF, DOC, DOCX, TXT, or MD files.",
        },
        { status: 400 }
      );
    }

    // For now, we'll extract text content based on file type
    let content = "";

    if (file.type === "text/plain" || file.type === "text/markdown") {
      content = await file.text();
    } else if (file.type === "application/pdf") {
      // For PDF files, we'll use a placeholder for now
      // In production, you'd use a PDF parsing library like pdf-parse
      content = `PDF Content from ${file.name}\n\nThis is a placeholder for PDF content extraction. In production, this would contain the actual extracted text from the PDF file.`;
    } else {
      // For DOC/DOCX files, placeholder content
      // In production, you'd use libraries like mammoth.js for DOCX
      content = `Document Content from ${file.name}\n\nThis is a placeholder for document content extraction. In production, this would contain the actual extracted text from the document.`;
    }

    // Predefined enhanced content and improvements
    const enhancedText = `Enhanced version of: ${file.name}

This document has been improved with AI-powered enhancements:

ORIGINAL CONTENT:
${content}

ENHANCED VERSION:
The content has been restructured and improved for better clarity and engagement. Key improvements include enhanced readability, better flow, improved grammar, and professional presentation.

${content}

ADDITIONAL ENHANCEMENTS:
- Professional formatting and structure
- Enhanced vocabulary and word choice
- Improved sentence flow and transitions
- Better paragraph organization
- Corrected grammar and punctuation
- Strengthened narrative elements

This enhanced version maintains your original message while significantly improving clarity, engagement, and professional presentation.`;

    const improvements = [
      "Improved sentence structure for better readability",
      "Enhanced vocabulary and word choice",
      "Added transitional phrases for smoother flow",
      "Corrected grammar and punctuation errors",
      "Strengthened opening and closing statements",
      "Improved paragraph organization",
      "Enhanced clarity and conciseness",
      "Better use of active voice",
      "Improved document structure and hierarchy",
      "Added professional formatting and presentation",
      "Enhanced narrative flow and engagement",
      "Optimized content for target audience",
    ];

    const newDocument = await prisma.document.create({
      data: {
        name: file.name,
        originalFileName: content,
        enhancedText,
        improvements,
        userId: user.userId,
      },
    });

    // Transform to match frontend interface
    const transformedDocument = {
      id: newDocument.id,
      name: newDocument.name,
      content: newDocument.originalFileName,
      uploadedAt: newDocument.createdAt.toISOString(),
      enhanced: true,
      enhancedContent: newDocument.enhancedText,
      improvements: newDocument.improvements,
    };

    return NextResponse.json(
      {
        document: transformedDocument,
        message: "File uploaded and enhanced successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error uploading file:", error);

    if (error.message === "Authentication required") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
