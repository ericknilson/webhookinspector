/* eslint-disable @typescript-eslint/no-explicit-any */

import sendWebhook from "./sendWebhook";

// src/lib/requests.ts
export interface RequestData {
  id: string;
  number?: number;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  url: string;
  time: string;
}

let requests: RequestData[] = [];

export function addRequest(requestData: RequestData): void {
  requestData.number = requests.filter(e => e.id === requestData.id).length + 1;
  requests = [requestData, ...requests];
  console.log('query', requestData.query)
  sendWebhook({
    id: requestData.id,
    query: requestData.query ?? {},
    body: requestData.body ?? {},
    headers: requestData.headers ?? {},
    method: requestData.method,
  })
}

export function clearRequests(id: string): void {
  requests = requests.filter(e => e.id !== id);
}

export function getRequests(id: string): RequestData[] {
  return requests.filter(e => e.id === id);
}
