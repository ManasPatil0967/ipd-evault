import { Button } from "@/components/ui/button";
import { connectWallet, getCurrentWalletConnected, createUser, isAuthenticated,getUser, editUser } from "@/utils/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "./components/navbar";

export default function Component() {
  const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [age, setAge] = useState("");
    const [income, setIncome] = useState("");
    const [wallet, setWallet] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleConnect = async () => {
      try {
          const user = await connectWallet();
          console.log(user)
          setWallet(user.wallet)
          //setUser(user)
      } catch (error) {
          console.log(error)
      }
  }

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

  useEffect(() => {
    if(wallet){
      async function fetchUser() {
      try {
        const user = await getUser(wallet)
        if (user) {
          console.log("line 64 user.jsx: ", user)
          setUser(user)
          // router.push("/home")
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser();
  }
    
  }, [])

    const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
          const { success } = await editUser(wallet, name, age, income, state);
          if (success) {
              console.log("User details updated successfully");
          } else {
              console.log("Failed to update user details");
          }
      } catch (error) {
          console.log(error);
      }
  };
  return (
    <div className="h-screen flex flex-col bg-[#22c55e]">
      <Navbar />
      <div className="border-t border-white" />
      <div className="flex-grow flex flex-col items-center justify-center bg-black text-white">
        <UserIcon className="w-16 h-16 mb-4" />
        <h2 className="text-3xl font-bold">Welcome, User</h2>
        <p className="mt-2 text-xl">Here's your dashboard</p>
        <div className="w-full p-6">
          
          <form onSubmit={handleEditSubmit} className="flex flex-col space-y-4 text-black">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="p-2 rounded-md"
            />
            <Button type="submit">Update</Button>
          </form>
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

