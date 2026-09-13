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
    // Bungie returns ErrorCode 217 (UserCannotResolveCentralAccount) instead of search results for some usernames.  Treat it as a search with no results.  ref https://bungie-net.github.io/multi/schema_Exceptions-PlatformErrorCodes.html
    if (data.ErrorCode === 217) {
      return { searchResults: [], page: 0, hasMore: false };
    }
    // any other non-success ErrorCode (e.g. maintenance, throttling, a missing API key) has no Response to return
    if (data.ErrorCode !== 1) {
      return null;
    }
    return data.Response;
  };

  const foundUsers = await fetchUsersByUsernamePrefix();

  if (foundUsers === null) {
    return NextResponse.json(
      { error: 'Bungie user search failed' },
      { status: 502 }
    );
  }

  return NextResponse.json(foundUsers);
}
