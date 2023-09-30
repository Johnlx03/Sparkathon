// pages/NewPage.js
import { Inter } from 'next/font/google';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Wallet from "@/components/Wallet";
import React, { useState } from 'react';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const NewPage = () =>  {
  // transaction part start 
  const [userPublicKey, setUserPublicKey] = useState("");

  // const [keypair, setKeypair] = useState("GoEpS3aPcWeXF8965Jb7cdf8QqDeoANtUFs6ubvFU5xq");
  //  {keypair && <Wallet keypair={keypair} />}
  {userPublicKey && <Wallet keypair={userPublicKey} />}
  const [airdropped, setAirdropped] = useState(false);
  const [airdropping, setAirdropping] = useState(false);
  const { publicKey } = useWallet();

  const onClickAirdrop = async () => {
    if (!userPublicKey) {
      console.error("User public key is required.");
      return;
    }
  
    setAirdropping(true);
    setAirdropped(true);
  
    try {
      const publicKey = new PublicKey(userPublicKey); // Use userPublicKey here

      const txid = await connection.requestAirdrop(publicKey, 1_000_000_000);

      console.log("Airdrop requested, TXID:", txid);
  
      const result = await connection.confirmTransaction(txid);
      console.log("Airdrop confirmed, Result:", result);
  
      if ("err" in result) {
        console.error(result.err);
        throw new Error("Failed to airdrop");
      }
    } catch (error) {
      console.error("Error during airdrop:", error);
    } finally {
      setAirdropping(false);
    }
  };
  

  return (
    <div className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="appDiv">
        <div className="NavDiv">
          <nav className="profileDiv">
            <div className="profileInnerDiv">
              <img src="./logo.png" alt="Profile Image" />
            </div>
            <div class="buttonAlign">
              <WalletMultiButton/>
            </div>
            
          </nav>
        </div>
      
        <br/>
        
        <div class="box">
          {/* <div class="keypairBox">
            <p>Your Keypair:</p>
            <p>{keypair}</p>
          </div> */}
          <div className="inputBox">
            <input
              type="text"
              required
              value={userPublicKey}
              onChange={(e) => setUserPublicKey(e.target.value)}
              
              
            />
            <span>Your Public Key</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Borrow Amount</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Keypair of other user</span>
            <i></i>
          </div>
        </div>

         <div class="center">
          <div class="outer button">
          <Link href="/"><button>Request</button></Link>
            <span></span>
            <span></span>
          </div>
         </div>


          <section>
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
            <div class="wave wave4"></div>
          </section>

          <>
      {/* {keypair && <Wallet keypair={keypair} />} */}
      {userPublicKey && <Wallet keypair={userPublicKey} />}
      <div className="mt-6">
        <p className="font-semibold">Airdop</p>
        <div className="mt-4">
          {(() => {
            if (airdropping) {
              return (
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed opacity-50 text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
                >
                  Airdropping...
                </button>
              );
            }

            if (airdropped) {
              return (
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed opacity-50 text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
                >
                  Already Airdropped
                </button>
              );
            }

            return (
              <button
                type="button"
                onClick={onClickAirdrop}
                className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
              >
                Click to Airdrop
              </button>
            );
          })()}
        </div>
      </div>
    </>
         
      </div>
    </div>

  );
}

export default NewPage;
