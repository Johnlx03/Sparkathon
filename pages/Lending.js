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
  const [keypair, setKeypair] = useState("CJbZZzxpTmCexj53fFFt9D1dyRKWa6xJcZNCayGnciGS");
 {keypair && <Wallet keypair={keypair} />}
  const [airdropped, setAirdropped] = useState(false);
  const [airdropping, setAirdropping] = useState(false);
  const [txid, setTxid] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amountToTransfer, setAmountToTransfer] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const onClickAirdrop = async () => {
    if (!keypair) return;

    setAirdropping(true);
    setAirdropped(true);

    try {
      const publicKey = new PublicKey(keypair);
      /** Exercise 2, use the connection object to request an airdrop to your Keypair */
      const txid = await connection.requestAirdrop(
        publicKey,
        1_000_000_000
      );
      console.log("Airdrop requested, TXID:", txid);

      const result = await connection.confirmTransaction(txid);
      console.log("Airdrop confirmed, Result:", result);
      /** End of exercise 2 */

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

  const onClickTransfer = async () => {
    if (!keypair) return;

    try {
      new PublicKey(recipient);
    } catch (error) {
      alert("Invalid Public Key");
      return;
    }

    setIsSending(true);

    try {
      const ix = SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amountToTransfer,
      });

      const { blockhash } = await connection.getLatestBlockhash();
      const messageV0 = new TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: blockhash,
        instructions: [ix],
      }).compileToV0Message();

      const verTx = new VersionedTransaction(messageV0);
      verTx.sign([keypair]);
      const txid = await connection.sendTransaction(verTx);
      setTxid(txid);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
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
        <p className="font-semibold">Airdop</p>
        <div className="mt-4">
          {(() => {
            if (airdropping) {
              return (
                <div class="center">
          <div class="outer button">
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed opacity-50 text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
                >
                  Airdropping...
                </button>
                </div></div>
              );
            }

            if (airdropped) {
              return (
                <div class="center">
          <div class="outer button">
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed opacity-50 text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
                >
                  Airdropped
                </button>
                </div></div>
              );
            }

            return (
              <div class="center">
          <div class="outer button">
              <button
                type="button"
                onClick={onClickAirdrop}
                className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
              >
               Airdrop
              </button>
              </div></div>
            );
          })()}
        </div>
      </div>
    </>

    <>
      {keypair && <Wallet keypair={keypair} />}
      <div className="mt-6">
        <p className="font-semibold">Transfer SOL</p>
        <div className="mt-4">
          Recipient:{" "}
          <input
            value={recipient}
            className="text-black rounded-lg border border-black/10 px-2 py-1 w-full max-w-[480px]"
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          Amount to transfer:{" "}
          <input
            className="text-black rounded-lg border border-black/10 px-2 py-1"
            value={amountToTransfer}
            onChange={(e) => {
              setAmountToTransfer(e.target.valueAsNumber);
            }}
            type="number"
          />
        </div>

        {isSending ? (
          <button
            type="button"
            disabled
            className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white mt-4 cursor-not-allowed opacity-50"
          >
            Sending...
          </button>
        ) : (
          <button
            type="button"
            onClick={onClickTransfer}
            className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white mt-4"
          >
            Transfer
          </button>
        )}
      </div>

      <div className="mt-6">
        <p className="font-semibold">Transaction ID:</p>
        <div className="mt-4 text-xs">{txid}</div>

        <div className="flex mt-4">
          {txid ? (
            <a
              href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
              target="_blank"
              className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
            >
              Open Explorer
            </a>
          ) : null}
        </div>
      </div>
    </>
         
      </div>
    </div>

  );
}

export default NewPage;
