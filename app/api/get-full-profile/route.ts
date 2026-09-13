import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GetFullProfileType } from '@/app/_interfaces/BungieAPI/GetFullProfileResponse.interface';
import { enrichProfile } from '@/app/_server/enrichProfile';

// Reads the slim manifest off disk, so this has to stay on the Node runtime.
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const fetchProfileInfo = async () => {
    const body = await request.json();
    const { membershipType, membershipId } = body;
    const response = await fetch(
      `https://www.bungie.net/platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=205,300,302`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_DESTINY_API_KEY}`,
        },
      }
    );
    const data: GetFullProfileType = await response.json();
    return data.Response;
  };

  try {
    const profileInfo = await fetchProfileInfo();
    if (!profileInfo?.characterEquipment) {
      return NextResponse.json(
        { error: 'Bungie returned no equipment for this profile' },
        { status: 502 }
      );
    }
    // Resolve the profile's item hashes here so the browser doesn't need its
    // own copy of Bungie's manifest to render names and icons.
    return NextResponse.json(await enrichProfile(profileInfo));
  } catch (error) {
    console.error('Could not build profile response:', error);
    return NextResponse.json(
      { error: 'Could not load this profile' },
      { status: 500 }
    );
  }
}
