/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xE1C35B5CAE
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex h-screen bg-[#22c55e]">
      <div className="flex w-1/2 flex-col items-center justify-center text-white">
        <img
          alt="Secure documents illustration"
          className="mb-8"
          height="300"
          src="/placeholder.svg"
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width="300"
        />
        <h1 className="text-4xl font-bold">Welcome to DocVault</h1>
        <p className="mt-4 text-xl">All your documents, securely stored</p>
      </div>
      <div className="w-1/2 bg-black">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-96 rounded-lg bg-gray-800 p-8">
            <h3 className="mb-6 text-3xl font-bold text-white">Sign up</h3>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="name">
                Enter your name
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="name"
                placeholder="Your Name"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="email">
                Enter your email address
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="email"
                placeholder="example@example.com"
                type="email"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="password"
                type="password"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="state">
                Enter your state
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="state"
                placeholder="Your State"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="age">
                Enter your age
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="age"
                placeholder="Your Age"
                type="number"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="income">
                Enter your income
              </label>
              <input
                className="w-full rounded-md border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-green-500 focus:ring-green-500"
                id="income"
                placeholder="Your Income"
                type="number"
              />
            </div>
            <Button className="w-full bg-green-600 py-2 text-white hover:bg-green-700">Sign Up</Button>
            <a className="mt-4 block text-center text-sm text-gray-400 hover:text-gray-300" href="#">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


