import { NextResponse } from 'next/server';
import { loadManifest } from '@/app/_server/manifest';

// Lets the refresh-manifest workflow see which manifest version is currently
// deployed, so it only triggers a redeploy when Bungie has actually shipped a
// new one.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ version: loadManifest().version });
  } catch (error) {
    console.error('Could not read slim manifest version:', error);
    return NextResponse.json(
      { error: 'Manifest unavailable' },
      { status: 500 }
    );
  }
}
