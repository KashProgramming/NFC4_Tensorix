export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['.pdf', '.docx', '.txt'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (!allowedTypes.includes(fileExtension)) {
    return {
      isValid: false,
      error: `File type not supported. Please upload ${allowedTypes.join(', ')} files only.`
    };
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    return {
      isValid: false,
      error: 'File size too large. Please upload files smaller than 10MB.'
    };
  }
  
  return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};