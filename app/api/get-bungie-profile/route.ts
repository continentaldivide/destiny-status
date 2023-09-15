import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import GetProfileResponseType from '@/app/_interfaces/BungieAPI/GetProfileResponse.interface';

export async function POST(request: NextRequest) {
  const fetchProfileInfo = async () => {
    const body = await request.json();
    const { membershipType, membershipId } = body;
    const response = await fetch(
      `https://www.bungie.net/platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=205,300`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
      }
    );
    const data: GetProfileResponseType = await response.json();
    return data.Response;
  };

  const profileInfo = await fetchProfileInfo();

  return NextResponse.json(profileInfo);
}
