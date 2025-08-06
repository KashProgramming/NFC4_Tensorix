import apiClient from '@/lib/api';

export interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: string;
  enhanced: boolean;
  enhancedContent?: string;
  improvements?: string[];
}

export interface CreateDocumentRequest {
  name: string;
  content: string;
}

export interface UpdateDocumentRequest {
  name?: string;
  content?: string;
}

export interface UploadDocumentRequest {
  file: File;
}

class DocumentService {
  // Get all documents
  async getAllDocuments(): Promise<Document[]> {
    try {
      const response = await apiClient.get('/documents');
      return response.data.documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw new Error('Failed to fetch documents');
    }
  }

  // Get single document by ID
  async getDocument(id: string): Promise<Document> {
    try {
      const response = await apiClient.get(`/documents/${id}`);
      return response.data.document;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw new Error('Failed to fetch document');
    }
  }

  // Create new document
  async createDocument(data: CreateDocumentRequest): Promise<Document> {
    try {
      const response = await apiClient.post('/documents', data);
      return response.data.document;
    } catch (error) {
      console.error('Error creating document:', error);
      throw new Error('Failed to create document');
    }
  }

  // Update document
  async updateDocument(id: string, data: UpdateDocumentRequest): Promise<Document> {
    try {
      const response = await apiClient.put(`/documents/${id}`, data);
      return response.data.document;
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error('Failed to update document');
    }
  }

  // Delete document
  async deleteDocument(id: string): Promise<void> {
    try {
      await apiClient.delete(`/documents/${id}`);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error('Failed to delete document');
    }
  }

  // Enhance document with AI
  async enhanceDocument(id: string): Promise<Document> {
    try {
      const response = await apiClient.post(`/documents/${id}/enhance`);
      return response.data.document;
    } catch (error) {
      console.error('Error enhancing document:', error);
      throw new Error('Failed to enhance document');
    }
  }

  // Upload document file
  async uploadDocument(data: UploadDocumentRequest): Promise<Document> {
    try {
      const formData = new FormData();
      formData.append('file', data.file);

      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.document;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new Error('Failed to upload document');
    }
  }
}

// Export singleton instance
export const documentService = new DocumentService();