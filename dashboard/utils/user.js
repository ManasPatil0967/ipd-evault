import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

const createUser = async (name, age, income, state) => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.createUser(name, age, income, state);
    await tx.wait();
};

const loginUser = async () => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.login();
    await tx.wait();
};

const logoutUser = async () => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.logout();
    await tx.wait();
};

const getUser = async () => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const user = await contractWithSigner.getUser();
    return user;
}

const onAuthStateChanged = async (user) => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.onAuthStateChanged(user);
    await tx.wait();
    return user;
}

export { createUser, loginUser, logoutUser, getUser, onAuthStateChanged };
