/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pRqLKRfePZZ
 */
import Navbar from "./components/navbar"
import Request from "./components/request"
import { useState } from "react";

export default function Component() {
    const [showRequest, setShowRequest] = useState(false);
  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <Navbar />
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold">Organizations</h2>
        <div className="w-full max-w-lg p-6 mt-6 text-white">
          <div className="grid grid-cols-3 gap-4">
              <img
                alt="Organization logo"
                height="100"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <h3 className="mt-4 text-lg font-bold text-white">Organization 1</h3>
              <button
                className="mt-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setShowRequest(true);
                }}
              >
                Request Certificate
              </button>
                {showRequest && <Request onClose={() => {setShowRequest(false)}} />}            
          </div>
        </div>
      </div>
    </div>
  )
}
    

