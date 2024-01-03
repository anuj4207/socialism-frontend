import { BACKEDN_URL } from '@/app/utils/Url';

export async function uploadMedia(file: any) {
  const res = await fetch(`${BACKEDN_URL}/post/uploadpostimage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: file }),
  });
  const data = await res.json();

  return data;
}
