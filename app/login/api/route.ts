import { BACKEDN_URL } from '@/app/utils/Url';

export async function sendOtp(number: string) {
  const res = await fetch(`${BACKEDN_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number: number }),
  });
  const data = await res.json();
  return data;
}

export async function verifyOtp(number: string, otp: string) {
  const res = await fetch(`${BACKEDN_URL}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userNumber: number, otp: otp }),
  });
  const data = await res.json();

  return data;
}
