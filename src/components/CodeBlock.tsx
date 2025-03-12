"use client";
import { useState } from "react";
import { Copy } from "lucide-react"; // Ícone de copiar
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code, language = 'html' }: { code: string, language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetar após 2 segundos
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded transition cursor-pointer"
      >
        <Copy size={16} />
      </button>

      <SyntaxHighlighter language={language} style={vscDarkPlus} className="rounded">
        {code}
      </SyntaxHighlighter>

      {copied && <span className="absolute top-2 left-2 text-white bg-green-400 rounded px-1 py-1">Copied!</span>}
    </div>
  );
}
