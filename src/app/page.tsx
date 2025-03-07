/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RequestData {
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  url: string;
  time: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const clearRequests = () => fetch('/api/requests', { method: 'DELETE' });

export default function Home() {
  const { data, error } = useSWR<RequestData[]>('/api/requests', fetcher, { refreshInterval: 3000 });
  const { data: repo } = useSWR('https://api.github.com/repos/erickmanovei/webhook', fetcher);
  const { data: contributors } = useSWR(
    'https://api.github.com/repos/erickmanovei/webhook/contributors',
    fetcher
  );
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  if (error) return <div className="p-4">Error fetching data.</div>;
  if (!data) return <div className="p-4">Loading...</div>;

  const GitHubIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-white"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.205 11.387c.6.111.82-.261.82-.58 0-.287-.01-1.043-.016-2.049-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.762-1.603-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.874.118 3.176.77.842 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.921.432.371.816 1.102.816 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.217.696.825.578A12.005 12.005 0 0024 12c0-6.63-5.37-12-12-12z"
        />
      </svg>
    );
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Menu */}
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r text-gray-700">
        <h1 className="text-xl font-bold mb-4 text-gray-700">Webhook Inspector</h1>
        <p className="mb-4 text-sm">
          Send requests to:
        </p>
        <SyntaxHighlighter language="html" style={vscDarkPlus} className="rounded">
          https://webhook.desenlike.com.br/api/webhook
        </SyntaxHighlighter>
        {!!data.length && (
          <div className='flex justify-end items-center'>
            <button
              className="mb-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => clearRequests()}
            >
              Clear All
            </button>
          </div>
        )}
        {data.length === 0 && <p>No requests yet.</p>}
        <ul>
          {data.map((req, index) => (
            <li
              key={index}
              onClick={() => setSelectedRequest(req)}
              className={`mb-2 p-2 rounded cursor-pointer hover:bg-blue-200 ${
                selectedRequest === req ? 'bg-blue-400' : 'bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{req.method}</span>
                <span className="text-sm text-gray-600">{req.time}</span>
              </div>
              <p className="text-sm text-gray-800">Request {index + 1}</p>
            </li>
          ))}
        </ul>
        
        <div className="p-4 bg-gray-900 text-zinc-400 rounded mt-10">
          <div 
            className='flex p-2 rounded items-center justify-center gap-2 mb-4 cursor-pointer hover:bg-gray-800' 
            onClick={() => window.open('https://github.com/erickmanovei/webhook', '_blank')}
          >
            <GitHubIcon />
            <h1 className='text-white font-bold'>Github</h1>
          </div>
          {!!repo?.owner?.login && (
            <h1 className="text-sm font-bold mb-4">Created by: {repo?.owner?.login}</h1>
          )}
          {!!contributors && !!contributors.length && (
            <>
              <h2 className="text-sm font-semibold mb-2">Contributors:</h2>
              <ul className="list-disc ml-6">
                {contributors.map((contributor: any) => (
                  <li key={contributor.id} className="mb-1 text-sm">
                    {contributor.login}
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {selectedRequest ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Request Details</h2>
            <div className="mb-4">
              <div className="mb-2">
                <h3 className="font-semibold">Headers:</h3>
                <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
                  {JSON.stringify(selectedRequest.headers, null, 2)}
                </SyntaxHighlighter>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold">Query Params:</h3>
                <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
                  {JSON.stringify(selectedRequest.query, null, 2)}
                </SyntaxHighlighter>
              </div>
              <div className="mb-2">
                <h3 className="font-semibold">Body:</h3>
                <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
                  {JSON.stringify(selectedRequest.body, null, 2)}
                </SyntaxHighlighter>
              </div>
              <div>
                <h3 className="font-semibold">URL:</h3>
                <SyntaxHighlighter language="html" style={vscDarkPlus} className="rounded">
                  {selectedRequest.url}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a request to see details.
          </div>
        )}
      </main>
    </div>
  );
}
