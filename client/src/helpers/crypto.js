import CryptoJS from "crypto-js";
import { createTransform } from "redux-persist";


const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("Missing encryption secret key in environment variables");
}

// Function to encrypt state before saving it to sessionStorage
const encrypt = (inboundState) => {
  try {
    // console.log("State to be encrypted:", inboundState); 
    const stringifiedState = JSON.stringify(inboundState);
    const encryptedState = CryptoJS.AES.encrypt(stringifiedState, SECRET_KEY).toString();
    // console.log("Encrypted state:", encryptedState); 
    return encryptedState;
  } catch (error) {
    console.error("Error encrypting state:", error);
    return inboundState;
  }
};

const decrypt = (outboundState) => {
  try {
    // console.log("State to be decrypted:", outboundState); 
    const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
    const decryptedState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log("Decrypted state:", decryptedState); 
    return decryptedState;
  } catch (error) {
    console.error("Error decrypting state:", error);
    return null;
  }
};

// Create the transform to encrypt and decrypt the state
export const encryptTransform = createTransform(
  (inboundState) => encrypt(inboundState), // Called when persisting the state
  (outboundState) => decrypt(outboundState) // Called when rehydrating the state
);
