import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
  userId: string;
  email: string;
}

export function getAuthUser(request: NextRequest): AuthUser | null {
  try {
    // Try to get token from cookie first
    const cookieToken = request.cookies.get('auth-token')?.value;
    
    // If no cookie, try Authorization header
    const authHeader = request.headers.get('authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    const token = cookieToken || headerToken;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = getAuthUser(request);
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}