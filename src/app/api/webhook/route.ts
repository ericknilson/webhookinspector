/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { addRequest, RequestData } from '@/lib/requests';

async function commonHandler(req: Request): Promise<NextResponse> {
  const { method, url, headers } = req;
  const parsedUrl = new URL(url);
  let body: any = null;

  // Tenta converter o corpo da requisição para JSON (para métodos que possuam body)
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      body = await req.json();
    } catch {
      body = await req.text();
    }
  }

  const requestData: RequestData = {
    method,
    headers: Object.fromEntries(headers.entries()),
    query: Object.fromEntries(parsedUrl.searchParams.entries()),
    body,
    url,
    time: new Date().toISOString(),
  };

  addRequest(requestData);
  return NextResponse.json(requestData);
}

export async function GET(req: Request) {
  return commonHandler(req);
}

export async function POST(req: Request) {
  return commonHandler(req);
}

export async function PUT(req: Request) {
  return commonHandler(req);
}

export async function PATCH(req: Request) {
  return commonHandler(req);
}

export async function DELETE(req: Request) {
  return commonHandler(req);
}
