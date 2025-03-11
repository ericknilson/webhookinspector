/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { addRequest, RequestData } from '@/lib/requests';

async function commonHandler(req: Request, params: { id: string }): Promise<NextResponse> {
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
    id: params?.id,
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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return commonHandler(req, params);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return commonHandler(req, params);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return commonHandler(req, params);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return commonHandler(req, params);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return commonHandler(req, params);
}
