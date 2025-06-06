/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { Info } from "lucide-react";
import CodeBlock from './CodeBlock';
import Modal from './Modal';

interface RequestData {
  number: number;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  url: string;
  time: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const clearRequests = (id: string) => fetch(`/api/requests?id=${id}`, { method: 'DELETE' });

export default function Inspect() {
  const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldFetch = session?.user?.id ? `/api/requests?id=${session.user.id}` : null;
  const { data, error } = useSWR<RequestData[]>(shouldFetch, fetcher, { refreshInterval: 3000 });
  const { data: repo } = useSWR('https://api.github.com/repos/ericknilson/webhookinspector', fetcher);
  const { data: contributors } = useSWR(
    'https://api.github.com/repos/ericknilson/webhookinspector/contributors',
    fetcher
  );
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      setUrl(`https://webhookinspector.com/api/${session.user.id}`);
    }
  }, [session]);
  

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
    <>
      <div className="flex flex-row items-center justify-start p-1 gap-4">
        <p>Hello, {session?.user?.name}! </p>
        <button className='text-sm font-semibold cursor-pointer' onClick={() => signOut()}>(Sign out)</button>
      </div>
      <div className="flex flex-col md:flex-row h-screen font-sans">
        {/* Menu */}
        <aside className="md:w-1/4 w-full bg-gray-100 p-4 md:overflow-y-auto border-r text-gray-700">
          <div className='flex flex-col items-center mb-4'>
            <Image src="/logo.png" width={70} height={70} alt="Webhook Inspector" />
            <h1 className="text-xl font-bold mb-4 text-gray-700">Webhook Inspector</h1>
          </div>
          {session && (
            <>
              <p className="text-sm">
                Your WebhookInspectorId is <Info size={16} className='inline cursor-pointer' color='blue' onClick={() => setIsModalOpen(true)} />:
              </p>
              <CodeBlock code={session.user.id} />
            </>
          )}
          <p className="mt-4 text-sm">
            Send requests to:
          </p>
          <CodeBlock code={url} />
          {!!data.length && (
            <div className='flex justify-end items-center'>
              <button
                className="mb-4 p-2 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => clearRequests(session?.user?.id as string)}
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
                className={`mb-2 p-2 rounded cursor-pointer hover:bg-blue-200 text-center md:text-left ${
                  selectedRequest === req ? 'bg-blue-400' : 'bg-blue-100'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{req.method}</span>
                  <span className="text-sm text-gray-600">{req.time}</span>
                </div>
                <p className="text-sm text-gray-800">Request {req.number}</p>
              </li>
            ))}
          </ul>
          
          <div className="p-4 bg-gray-900 text-zinc-400 rounded mt-10 hidden md:block">
            <div 
              className='flex p-2 rounded items-center justify-center gap-2 mb-4 cursor-pointer hover:bg-gray-800' 
              onClick={() => window.open('https://github.com/ericknilson/webhookinspector', '_blank')}
            >
              <GitHubIcon />
              <h1 className='text-white font-bold'>Github</h1>
            </div>
            {!!repo?.owner?.login && (
              <h1 className="text-sm font-bold mb-4">Created by: <a href={repo?.owner?.html_url} target='_blank'>{repo?.owner?.login}</a></h1>
            )}
            {!!contributors && !!contributors.length && (
              <>
                <h2 className="text-sm font-semibold mb-2">Contributors:</h2>
                <ul className="list-disc ml-6">
                  {contributors.map((contributor: any) => (
                    <li key={contributor.id} className="mb-1 text-sm">
                      <a href={contributor.html_url} target='_blank'>{contributor.login}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className='mt-4'>
            <form action="https://www.paypal.com/donate" method="post" target="_blank">
              <input type="hidden" name="hosted_button_id" value="TCKVLBXPSCH9A" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <Image alt="" src="https://www.paypal.com/en_BR/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 md:overflow-y-auto">
          {selectedRequest ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Request {selectedRequest.number} Details</h2>
              <div className="mb-4">
                <div className="mb-2">
                  <h3 className="font-semibold">Headers:</h3>
                  <CodeBlock language='json' code={JSON.stringify(selectedRequest.headers, null, 2)} />
                </div>
                <div className="mb-2">
                  <h3 className="font-semibold">Query Params:</h3>
                  <CodeBlock language='json' code={JSON.stringify(selectedRequest.query, null, 2)} />
                </div>
                <div className="mb-2">
                  <h3 className="font-semibold">Body:</h3>
                  <CodeBlock language='json' code={JSON.stringify(selectedRequest.body, null, 2)} />
                </div>
                <div>
                  <h3 className="font-semibold">URL:</h3>
                  <CodeBlock language='html' code={selectedRequest.url} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a request to see details.
            </div>
          )}
          <div className="p-4 bg-gray-900 text-zinc-400 rounded mt-10 block md:hidden">
            <div 
              className='flex p-2 rounded items-center justify-center gap-2 mb-4 cursor-pointer hover:bg-gray-800' 
              onClick={() => window.open('https://github.com/ericknilson/webhookinspector', '_blank')}
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
        </main>
      </div>
    </>
  );
}
