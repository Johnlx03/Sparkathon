// pages/NewPage.js
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router'; 
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import { Dispatch, SetStateAction } from "react";
import Wallet from "@/components/Wallet";
import React, { useState } from 'react';
import { Connection, Keypair } from "@solana/web3.js";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const NewPage = ({
  connection
}) =>  {
  // transaction part start 
  const [keypair, setKeypair] = useState("GoEpS3aPcWeXF8965Jb7cdf8QqDeoANtUFs6ubvFU5xq");
 {keypair && <Wallet keypair={keypair} />}
  const [airdropped, setAirdropped] = useState(false);
  const [airdropping, setAirdropping] = useState(false);
  const { publicKey } = useWallet();

  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);

  function handleWalletBalanceRequest() {
    getWalletTokenBalance('SOL');
  }

  const onClickAirdrop = async () => {
    if (!keypair) return;

    setAirdropping(true);
    setAirdropped(true);

    try {
      /** Exercise 2, use the connection object to request an airdrop to your Keypair */
      const txid = await connection.requestAirdrop(
        keypair,
        1_000_000_000
      );

      const result = await connection.confirmTransaction(txid);
      /** End of exercise 2 */

      if ("err" in result) {
        console.error(result.err);
        throw new Error("Failed to airdrop");
      }
    } catch (error) {
      // ignore
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
          <div class="keypairBox">
            <p>Your Keypair:</p>
            <p>{keypair}</p>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Amount</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Receiver Keypair</span>
            <i></i>
          </div>
        </div>

         <div class="center">
          <div class="outer button">
          <Link href="/"><button>Return</button></Link>
            <span></span>
            <span></span>
          </div>
          <div class="outer button">
            <Link href="/"><button>Lend</button></Link>
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
      {keypair && <Wallet keypair={keypair} />}
      <div className="mt-6">
        <p className="font-semibold">Airdrop</p>
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
