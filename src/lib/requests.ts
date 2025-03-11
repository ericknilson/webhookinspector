/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/requests.ts
export interface RequestData {
  id: string;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  url: string;
  time: string;
}

let requests: RequestData[] = [];

export function addRequest(requestData: RequestData): void {
  requests.push(requestData);
}

export function clearRequests(id: string): void {
  requests = requests.filter(e => e.id !== id);
}

export function getRequests(id: string): RequestData[] {
  return requests.filter(e => e.id === id);
}
