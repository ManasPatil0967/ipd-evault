import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import abi from "./abi.json";

const alchemy = "wss://polygon-mumbai.g.alchemy.com/v2/4p4dIgkSccNSIOpgg_8jnt8wGRsCBgJa";
const web3 = createAlchemyWeb3(alchemy);

const contractAddress = "0xA4F6E7d7a8A2d6CDE062359c0f0e6A36ad0DD2cE";
const contract = new web3.eth.Contract(abi, contractAddress);

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
        const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const obj = {
            address: addressArray[0],
        };
        return obj;
        } catch (err) {
        return {
            address: "",
            status: "😥 " + err.message,
        };
        }
    } else {
        return {
        address: "",
        status: (
            <span>
            <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
                </a>
            </p>
            </span>
        ),
        };
    }
    }

    export const getCurrentWalletConnected = async () => {
        if (window.ethereum) {
          try {
            const addressArray = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (addressArray.length > 0) {
              return addressArray[0];
            } else {
              return "";
            }
          } catch (err) {
            return "";
          }
        } else {
          return "";
      };
    }

export const createUser = async (address, name, income, age, state) => {
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: contract.methods.createUser(name, income, age, state).encodeABI(),
    };
    try {
        const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
        });
        return {
        success: true,
        txHash: txHash,
        };
    } catch (error) {
        return {
        success: false,
        error: error.message,
        };
    }
}

export const getUser = async (address) => {
    try {
        const user = await contract.methods.getUser(address).call();
        return {
            success: true,
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}


export const isAuthenticated = async (address) => {
    try {
        console.log(address);
        console.log("isAuthenticated");
        const result = await contract.methods.isAuth(address).call();
        return {
        success: true,
        result: result,
        };
    } catch (error) {
        return {
        success: false,
        error: error.message,
        };
    }
}

export const login = async (address) => {
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: contract.methods.login().encodeABI(),
    };
    try {
        const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
        });
        return {
        success: true,
        txHash: txHash,
        };
    } catch (error) {
        return {
        success: false,
        error: error.message,
        };
    }
}

export const logout = async (address) => {
    const transactionParameters = {
        to: contractAddress,
        from: address,
        data: contract.methods.logout().encodeABI(),
    };
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        return {
            success: true,
            txHash: txHash,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}


