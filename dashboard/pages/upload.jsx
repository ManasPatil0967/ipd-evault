import { decl } from "postcss";
import Navbar from "./components/navbar";
import { useRef, useState } from "react";

export default function Component() {
    const [docName, setDocName] = useState("");
    const [docId, setDocId] = useState("");
    const [docFile, setDocFile] = useState(null);
    const [hash, setHash] = useState("");

    const [file, setFile] = useState(null);
    const inputFile = useRef(null);
    const [cid, setCid] = useState("");
    const [uploading, setUploading] = useState(false);


    const uploadFile = async (fileToUpload) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload, { filename: docName});
            console.log(formData);
            const res = await fetch("/api/files", {
                method: "POST",
                body: formData,
            });
            const ipfsHash = await res.text();
            console.log(ipfsHash);
            setCid(ipfsHash);
            setUploading(false);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };
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
              ref={inputFile}
              onChange= {handleUpload}
              style={{ display: "none" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" onClick={() => inputFile.current.click()} disabled={uploading}
            >
              Upload
            </button>
          </div>
        </form>
      <div className="flex flex-col items-center justify-center bg-black text-white">
        {uploading && <p>Uploading...</p>}
        {cid && <p>Uploaded to IPFS with CID: {cid}</p>}
      </div>
      </div>
    </div>
  )
}


