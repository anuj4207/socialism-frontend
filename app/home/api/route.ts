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
export async function fetchOtherProfile() {
  const res = await fetch(`${BACKEDN_URL}/metadata/otherDetails`, {
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
export async function fetchNearbyEvent() {
  const res = await fetch(`${BACKEDN_URL}/event/nearby`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  return data;
}

export async function joinEvent(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/event/joinrequest/;${dto}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  return data;
}

export async function cancelEvent(dto: any) {
  const res = await fetch(`${BACKEDN_URL}/event/delete/:${dto}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  return data;
}
