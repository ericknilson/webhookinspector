// src/app/api/requests/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { clearRequests, getRequests } from '@/lib/requests';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json([]);
  }
  const requests = getRequests(id);
  return NextResponse.json(requests);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: 'Need to send id' });
  }

  clearRequests(id);
  return NextResponse.json({ message: 'Requests cleared' });
}
