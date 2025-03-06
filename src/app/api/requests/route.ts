// src/app/api/requests/route.ts
import { NextResponse } from 'next/server';
import { clearRequests, getRequests } from '@/lib/requests';

export async function GET() {
  const requests = getRequests();
  return NextResponse.json(requests);
}

export async function DELETE() {
  clearRequests();
  return NextResponse.json({ message: 'Requests cleared' });
}
