import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import CONTRACT_ABI from "../constant/ABI.json";

const RPC_URL = "https://sepolia.infura.io/v3/3ca08f13b2f94d4aa806fead92888aa8";
const CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";

let contractWithSigner: ethers.Contract | null = null;

export const savePrivateKey = (privateKey: string, password: string): void => {
  const encrypted = CryptoJS.AES.encrypt(privateKey, password).toString();
  sessionStorage.setItem("ENCRYPTED_OWNER_KEY", encrypted);
  connectWithPrivateKey(privateKey);
};

export const unlockPrivateKey = (password: string): void => {
  const encrypted = sessionStorage.getItem("ENCRYPTED_OWNER_KEY");
  if (!encrypted) throw new Error("No key stored");
  const bytes = CryptoJS.AES.decrypt(encrypted, password);
  const key = bytes.toString(CryptoJS.enc.Utf8);
  if (!key) throw new Error("Invalid password");
  connectWithPrivateKey(key);
};

export const connectWithPrivateKey = (privateKey: string): void => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const ownerSigner = new ethers.Wallet(privateKey, provider);
  contractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ownerSigner);
};

export const getContract = () => {
  if (contractWithSigner) return contractWithSigner;
  const encrypted = sessionStorage.getItem("ENCRYPTED_OWNER_KEY");
  if (!encrypted) throw new Error("Owner key not set");
  throw new Error("Password required to unlock key");
};
