import { BACKEDN_URL } from '@/app/utils/Url';
import { Interface } from 'readline';

export async function updateLocaiton(dto: { state: string; city: string }) {
  const res = await fetch(`${BACKEDN_URL}/metadata/location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  return data;
}

export async function createProfile(dto: { name: string; about: string }) {
  const res = await fetch(`${BACKEDN_URL}/metadata/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  return data;
}

export async function addInterest(dto: { tag: string[] }) {
  const res = await fetch(`${BACKEDN_URL}/metadata/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(dto),
  });
  const data = await res.json();
  return data;
}
