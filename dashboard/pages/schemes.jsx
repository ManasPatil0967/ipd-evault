import Navbar from "./components/navbar";
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCurrentWalletConnected, getUser } from '@/utils/user';
import { data } from "autoprefixer";
import { match } from "assert";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RdkgeuZHnbp
 */
export async function getStaticProps() {
    const schemesCsvPath = path.join(process.cwd(), 'data', '../schemes.csv');
    const schemes = fs.readFileSync(schemesCsvPath, 'utf8');
    return {
        props: {
            schemes
        }
    };
}

export default function Component({ schemes}) {
    const schemesArray = schemes.split('\n');
    //console.log(schemesArray);
    const router = useRouter();
    const [wallet, setWallet] = useState(null);
    const [user, setUser] = useState(null);
    let matchingSchemes = [];
    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                }
                else {
                    setWallet('');
                }
            });
        }
        else {
            alert('Install Metamask');
        }
    }
    useEffect(() => {
        async function fetchWallet() {
            try {
                const wallet = await getCurrentWalletConnected();
                if (wallet) {
                    console.log('line 17 home.jsx: ', wallet);
                    setWallet(wallet);
                    const user = await getUser(wallet);
                    if (user) {
                        setUser(user);
                        console.log('line 35 home.jsx: ', user);
                    }
                    else {
                        router.push('/signup');
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchWallet();
        addWalletListener();
    }, []);
    useEffect(() => {
        {
            async function fetchUser() {
                const wallet = await getCurrentWalletConnected();
                if (wallet) {
                    try {
                        console.log('line 31 home.jsx: ', wallet);
                        const user = await getUser(wallet);
                        if (user) {
                            setUser(user);
                            console.log('line 35 home.jsx: ', user);
                        }
                        else {
                            router.push('/signup');
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            fetchUser();
        }
    }, []);
    if(user) {
        console.log(user.user[3]);
        console.log(Number(user.user[1]));
        for(let i = 0; i < schemesArray.length; i++) {
            if(schemesArray[i].split(',')[3] === user.user[3] || schemesArray[i].split(',')[2] === 'NA' || Number(schemesArray[i].split(',')[2]) <= Number(user.user[1])) {
                console.log(schemesArray[i]);
                matchingSchemes.push(schemesArray[i].split(',')[1]);
            }
        }
    }
    return (
      <div className="h-screen flex flex-col bg-[#22c55e]">
        <Navbar />
        <div className="border-t border-white" />
        <div className="flex-grow flex flex-col items-center justify-center bg-black text-white px-4">
          <h2 className="text-5xl font-bold">Schemes</h2>
          <h3 className="text-2xl mt-4">Following are the schemes and certificates based on your docs you can avail</h3>
            <div className="flex flex-col items-center justify-center mt-4">
                {matchingSchemes.map((scheme) => (
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg mt-4">
                        <h3 className="text-xl font-bold">{scheme}</h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    )
  }
  
  