/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/page.tsx
'use client';

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

export default function Home() {
  const { data, error } = useSWR<RequestData[]>('/api/requests', fetcher, { refreshInterval: 3000 });

  if (error) return <div className="p-4">Falha ao carregar as requisições.</div>;
  if (!data) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Requisições Recebidas</h1>
      <p className="mb-4">
        Envie requisições para: https//webhook.desenlike.com.br/api/webhook para ver as requisições abaixo:
      </p>
      {data.length === 0 && <p>Nenhuma requisição recebida ainda.</p>}
      {data.map((req, index) => (
        <div key={index} className="border border-gray-300 rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">
            {`Requisição ${index + 1} - ${req.method} - ${req.time}`}
          </h2>
          <div className="mb-2">
            <h3 className="font-semibold">Headers:</h3>
            <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
              {JSON.stringify(req.headers, null, 2)}
            </SyntaxHighlighter>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Query Params:</h3>
            <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
              {JSON.stringify(req.query, null, 2)}
            </SyntaxHighlighter>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Body:</h3>
            <SyntaxHighlighter language="json" style={vscDarkPlus} className="rounded">
              {JSON.stringify(req.body, null, 2)}
            </SyntaxHighlighter>
          </div>
          <div>
            <h3 className="font-semibold">URL:</h3>
            <SyntaxHighlighter language="html" style={vscDarkPlus} className="rounded">
              {req.url}
            </SyntaxHighlighter>
          </div>
        </div>
      ))}
    </div>
  );
}
