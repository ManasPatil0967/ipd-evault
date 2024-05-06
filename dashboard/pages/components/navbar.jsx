import React from 'react'
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getCurrentWalletConnected } from '@/utils/user'

export default function Navbar() {
    const router = useRouter();
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
    }
    , [])

    const handleLogout = async () => {
      try {
        setWallet(null);
        setUser(null);
        localStorage.clear();
        router.push("/");
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <nav className="bg-black flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img alt="Vercel logo" className="w-8 h-8 mr-3 bg-white" src="/vercel.svg" />
          <a className="text-2xl font-bold text-white" href="/home">DocVault</a>
        </div>
        <div className="flex items-center space-x-4">
          <a className="text-xl text-white" href="/user">
            User
          </a>
          <a className="text-xl text-white" href="/upload">
            Upload
          </a>
          <a className="text-xl text-white" href="/schemes">
            Schemes
          </a>
          <a className="text-xl text-white" href="/orgs">
            Organizations
          </a>
            <button className="text-xl text-white" onClick={handleLogout}>
                Logout
            </button>
        </div>
      </nav>
    )
}
