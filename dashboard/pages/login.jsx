/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9ZDprezIx5f
 */
import { Button } from "@/components/ui/button"
import { getCurrentWalletConnected, isAuthenticated, login } from "@/utils/user"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function Component() {
  const router = useRouter()
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } else {
      alert("Install Metamask");
    }
  }
  useEffect(() => {
    async function fetchWallet() {
      try {
        const wallet = await getCurrentWalletConnected()
        if (wallet) {
          console.log("line 49 signup.jsx: ", wallet)
          setWallet(wallet)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchWallet();
    addWalletListener();
  }, [])

  const handleLogin = async () => {
    try {
      const user = await login(wallet)
      if (user) {
        console.log("line 35 login.jsx: ", user)
        setUser(user)
        router.push("/home")
      }
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
          <div className="mb-8 text-right text-white">
            <h2 className="text-2xl font-bold">DocVault</h2>
          </div>
          <div className="w-96 rounded-lg bg-gray-800 p-8">
            <h3 className="mb-6 text-3xl font-bold text-white">Log in</h3>
            <button className="w-full bg-green-600 py-2 text-white hover:bg-green-700" onClick={handleLogin}>Log in using Metamask</button>
          </div>
        </div>
      </div>
    </div>
  )
}


