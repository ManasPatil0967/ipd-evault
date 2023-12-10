import Navbar from "./components/navbar"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/COyWWfuCTMY
 */
export default function Component() {
  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <Navbar />
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <UserIcon className="w-16 h-16 mb-4" />
        <h2 className="text-3xl font-bold">Welcome, User</h2>
        <p className="mt-2 text-xl">Here's your dashboard</p>
        <div className="w-full p-6">
          <h3 className="text-2xl font-bold mb-4">My Documents</h3>
          <div className="flex overflow-x-scroll gap-4">
            <img
              alt="Sample document"
              className="bg-white"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <img
              alt="Sample document"
              className="bg-white"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <img
              alt="Sample document"
              className="bg-white"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <img
              alt="Sample document"
              className="bg-white"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

