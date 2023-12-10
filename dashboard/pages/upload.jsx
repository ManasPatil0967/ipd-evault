import Navbar from "./components/navbar";
import { useState } from "react";
import pinataSDK from "@pinata/sdk";
import fs from "fs";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/d7Qp6uvrhMe
 */
export default function Component() {
    const [docName, setDocName] = useState("");
    const [docId, setDocId] = useState("");
    const [docFile, setDocFile] = useState(null);
    const [hash, setHash] = useState("");
    const pinata = new pinataSDK(
        {
            pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NDk3ZTg5OS0zMTAxLTQzYjctYTlmMi1kNzY2MmM5NjFmODYiLCJlbWFpbCI6Im1hbmFzcGF0aWwwOTY3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZTc2ODc3NGRmOGFlNGRlNjRmMCIsInNjb3BlZEtleVNlY3JldCI6ImUzMDFkZmQzMTY1MjUzZDNlZTI3NjBmZDYwMmZiNDZhZDdiNzNlODJjZTFlMjYyMGVlZjBkMWNlZjBkMWQyYzUiLCJpYXQiOjE3MDIyMjA0MzF9.PCNrzLu21TUxO9riDHWBXaOKIWj9Bty9jyOgYKFxqvk'
        }
    );

    const handleUpload = async (e) => {
        e.preventDefault();
        const doc = fs.createReadStream(docFile);
        const metadata = {
            name: docName,
            keyvalues: {
                docId: docId,
            },
        };
        const pinataResponse = await pinata.pinFileToIPFS(doc,  {pinataMetadata: metadata});
        console.log(pinataResponse.IpfsHash);
        setHash(pinataResponse.IpfsHash);
    }

  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <Navbar />
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold">Upload your Documents</h2>
        <form className="w-full max-w-lg p-6 mt-6 bg-black text-white">
          <div className="flex flex-wrap mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doc-name">
              Document Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="doc-name"
              placeholder="Document Name"
              required
              type="text"
              onChange={(e) => setDocName(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doc-id">
              Document ID:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="doc-id"
              placeholder="Document ID"
              required
              type="text"
              onChange={(e) => setDocId(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doc-file">
              Document File:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="doc-file"
              required
              type="file"
              onChange={(e) => setDocFile(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


