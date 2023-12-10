import Navbar from "./components/navbar";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/d7Qp6uvrhMe
 */
export default function Component() {
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
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


