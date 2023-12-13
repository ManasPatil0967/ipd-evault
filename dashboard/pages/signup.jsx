/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xE1C35B5CAE
 */
import { Button } from "@/components/ui/button"
import { createUser, onAuthStateChanged, loginUser } from "@/utils/user"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Component() {
    const [name, setName] = useState("")
    const [state, setState] = useState("")
    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged (async (user) => { 
            setUser(user)
            setLoading(false)
            if (user) {
                router.push("/dashboard")
            }
        })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (user) {
        return <div>Logged in as {user.email}</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUser(name, state, age, income)
        } catch (error) {
            console.log(error)
        }
    }

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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setAge(e.target.value)}
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
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <button className="w-full bg-green-600 py-2 text-white hover:bg-green-700" onClick={handleSubmit}>Sign Up</button>
            <a className="mt-4 block text-center text-sm text-gray-400 hover:text-gray-300" href="#">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


