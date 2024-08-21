import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";

const QRCodeGenerator: React.FC = () => {
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [encryption, setEncryption] = useState<string>("WPA");
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const generateQRCodeValue = (): string => {
    return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
  };

  const handleGenerateClick = () => {
    setShowQRCode(true);
  };

  const handleDownloadClick = () => {
    if (qrCodeRef.current === null) {
      return;
    }
    toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "wifi-qr-code.png";
        link.click();
      })
      .catch((err) => {
        console.error("Error generating QR code image", err);
      });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wi-Fi QR Code Generator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">SSID:</label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Encryption:
        </label>
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleGenerateClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          Generate QR Code
        </button>
      </div>

      {showQRCode && (
        <div className="flex flex-col items-center">
          <div ref={qrCodeRef} className="p-4 bg-white">
            <QRCode value={generateQRCodeValue()} size={256} />
          </div>
          <button
            onClick={handleDownloadClick}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
          >
            Download as PNG
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
