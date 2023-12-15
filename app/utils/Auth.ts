'use client';
export const isAuthenticated = false;
export function checkAuthentication() {
  const currTime = new Date();
  if (typeof window !== 'undefined') {
    const expAt = localStorage.getItem('expAt');
    if (typeof expAt === 'string') {
      if (parseInt(expAt) > currTime.getTime()) {
        return true;
      } else {
        localStorage.removeItem('expAt');
        localStorage.removeItem('token');
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
