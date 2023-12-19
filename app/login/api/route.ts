import { BACKEDN_URL } from '@/app/utils/Url';

export async function logIn(email: string, password: string) {
  const res = await fetch(`${BACKEDN_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await res.json();
  return data;
}

export async function signIn(email: string, password: string) {
  const res = await fetch(`${BACKEDN_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await res.json();

  return data;
}
