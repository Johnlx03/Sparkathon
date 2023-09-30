// pages/NewPage.js
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router'; 
import { useWalletTokenBalance } from '@lndgalante/solutils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import "./api/test.sol";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

function NewPage() {

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);

  function handleWalletBalanceRequest() {
    getWalletTokenBalance('SOL');
  }

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
          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Your Public Key</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Amount</span>
            <i></i>
          </div>

          <div class="inputBox">
            <input type="text" required="required"></input>
            <span>Public Key</span>
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

         
      </div>
    </div>

  );
}

export default NewPage;
