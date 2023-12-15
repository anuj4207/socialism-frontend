import { BACKEDN_URL } from '@/app/utils/Url';

export async function createEvent(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/event/create`, {
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
