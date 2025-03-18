import { X } from "lucide-react";

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2xl relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">WebhookInspectorId</h2>
        <p className="text-gray-700 text-sm">
          The Webhook Inspector has a system that can be run on your local machine, allowing all received requests to be redirected to your locally running system. 
        </p>  
        <p className="text-gray-700 text-sm">
          This will help you test software that is being developed and tested in a localhost environment.
        </p>
        <p className="text-gray-700 text-sm">
To do this, you need to download the executable below and run it on your local machine. When the system runs for the first time, it will ask for your WebhookInspectorId and the local endpoint where you want to redirect the requests.
        </p>
         <p className="text-gray-700 text-sm">
          Choose the file you want to download according to your operating system:
        </p>

        <ul className="list-disc list-inside mt-2">
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-windows-amd64.exe" className="text-blue-500 hover:underline">
              Windows amd64
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-windows-386.exe" className="text-blue-500 hover:underline">
              Windows 386
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-linux-amd64" className="text-blue-500 hover:underline">
              Linux amd64
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-linux-386" className="text-blue-500 hover:underline">
              Linux 386
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-linux-arm" className="text-blue-500 hover:underline">
              Linux arm
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-linux-arm64" className="text-blue-500 hover:underline">
              Linux arm64
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-darwin-amd64" className="text-blue-500 hover:underline">
              Darwin amd64
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/erickmanovei/webhookinspector-cli/blob/master/releases/webhookinspector-darwin-arm64" className="text-blue-500 hover:underline">
              Darwin arm64
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Modal;