import Navbar from "./components/navbar"
import { getUser } from "@/utils/user"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XBxQVC6G4Ln
 */
export default function Component() {
  const user = getUser();
  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <Navbar />
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <UserIcon className="w-16 h-16 mb-4" />
        <h2 className="text-3xl font-bold">Welcome, User</h2>
        <h3 className="mt-2 text-xl">{user.name}</h3>
        <p className="mt-2 text-xl">Here's your dashboard</p>
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

