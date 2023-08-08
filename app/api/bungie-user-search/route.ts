import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const fetchUsersByUsernamePrefix = async () => {
    const body = await request.json();
    const { username } = body;
    const response = await fetch(
      'https://www.bungie.net/platform/User/Search/GlobalName/0/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
        body: JSON.stringify({
          displayNamePrefix: username,
        }),
      }
    );
    const data = await response.json();
    return data.Response;
  };

  const foundUsers = await fetchUsersByUsernamePrefix();

  return NextResponse.json(foundUsers);
}
