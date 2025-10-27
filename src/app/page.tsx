import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// This is a server component, so we can check for a session cookie
// or use a server-side auth library to check the session.
async function checkAuthStatus() {
  // In a real app, you'd integrate with your auth provider here.
  // For this demo, we'll check for a mock session cookie.
  // In a real Firebase setup, you might use firebase-admin to verify an ID token from the cookie.
  const cookieStore = cookies();
  const session = cookieStore.get('firebaseIdToken'); // A more realistic cookie name
  return !!session;
}

export default async function Home() {
  const isLoggedIn = await checkAuthStatus();

  // Redirect based on auth status. This is the robust, server-side way.
  if (isLoggedIn) {
     redirect('/dashboard');
  } else {
     redirect('/login');
  }
  
  // This return is never reached due to the redirects, but is required by React.
  return null;
}
