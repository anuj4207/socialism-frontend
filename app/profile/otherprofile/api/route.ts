import { BACKEDN_URL } from '@/app/utils/Url';

export async function fetchOtherProfile(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/metadata/otherDetails/:${dto}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function fetchUpcomingEvent(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/event/myEvent/:${dto}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function follow(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/friend/follow/:${dto}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function unFollow(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/friend/unfollow/:${dto}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}
