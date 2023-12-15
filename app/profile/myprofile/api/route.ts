import { BACKEDN_URL } from '@/app/utils/Url';

export async function fetchMyProfile() {
  const res = await fetch(`${BACKEDN_URL}/metadata/myDetails`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  return data;
}
