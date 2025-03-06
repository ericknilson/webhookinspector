/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/requests.ts
export interface RequestData {
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  url: string;
  time: string;
}

const requests: RequestData[] = [];

export function addRequest(requestData: RequestData): void {
  requests.push(requestData);
}

export function clearRequests(): void {
  requests.length = 0;
}

export function getRequests(): RequestData[] {
  return requests;
}
