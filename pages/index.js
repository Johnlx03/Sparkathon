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

function Home() {
  const router = useRouter();

  const { publicKey } = useWallet();
  const { connection } = useConnection();
 
  // solutils hooks 
  const { getWalletTokenBalance, result, status, error } = useWalletTokenBalance(publicKey, connection);
 
  // handlers
  function handleWalletBalanceRequest() {
    getWalletTokenBalance('SOL');
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          APUBCC Sparkathon 2023
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <WalletMultiButton/>
        </div>
      </div> */}
{/* 
      <div className="relative flex flex-col justify-between place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className='font-bold'>This is a boilerplate for the APUBCC Sparkathon 2023</h1>
          
          {publicKey ? <div className='place-items-center grid mt-10'>
          <Button onClick={handleWalletBalanceRequest}>Request Wallet Balance</Button>
          {status === 'iddle' ? <p>Haven&apos;t requested any SOL balance yet</p> : null}
          {status === 'loading' ? <p>Requesting your SOL balance tokens</p> : null}
          {status === 'success' ? <p>We successfully got your balance: {result} SOL</p> : null}
          {status === 'error' ? <p>{error}</p> :null}
        </div> : null}
        
      </div> */}

<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

</div>
            <div className="appDiv">
            <div className="NavDiv">
          <nav className="profileDiv">
            <div className="profileInnerDiv">
              <img src="./logo.png" alt="Profile Image" />
            </div>
            
            {/* <div className="profileInnerDiv" style={{ width: 'auto' }}>
              <div>
                <p className="publicKey">GCZUCUtd5PxucA8qFxVQkhWbaH7eyAuJ8v4rk66G4F4T</p>
              </div>
            </div> */}
            <div className="profileInnerDiv" style={{ width: 'auto' }}>
              <div>
                <WalletMultiButton/>
              </div>
            </div>
            
            
            
          </nav>
        </div>

  <br/>
  {publicKey ? <div className='place-items-center grid '>
    <Button onClick={handleWalletBalanceRequest}>Request Wallet Balance</Button>
    {/* {status === 'iddle' ? <p>Haven&apos;t requested any SOL balance yet</p> : null} */}
    {status === 'loading' ? <p>Requesting your SOL balance tokens</p> : null}
    {status === 'success' ? <p>Your balance: {result} SOL</p> : null}
    {status === 'error' ? <p>{error}</p> : null}
  </div> : null}
  <div className="pendingDebt">
    <h4 style={{ textTransform: 'uppercase', color: 'aliceblue', paddingTop: '20px', marginLeft: '20px' }}>Pending Approval</h4>

    <div className="pendingBigDiv">
      <nav className="pendingDiv">
        <div className="pendingOutter">
          <div className="pendingInnerDiv">
            <img src="logo.png" alt="Profile Image" />
          </div>
          <div className="pendingInnerDiv" style={{ width: 'auto' }}>
            <div>
              {/* <p className="publicKey">GoEpS3aPcWeXF8965Jb7cdf8QqDeoANtUFs6ubvFU5xq</p> */}
            </div>
          </div>
        </div>
      </nav>

      <div className="pendingDiv">
        <div className="pendingInnerDiv" style={{ width: 'auto' }}>
          <div>
            {/* <p>$30.99</p> */}
            {/* <p>2 SOL</p> */}
          </div>
        </div>
      </div>
    </div>          
  </div>
  <br/>
  <div className="pendingDebt">
    <h4 style={{ textTransform: 'uppercase', color: 'aliceblue', paddingTop: '20px', marginLeft: '20px' }}>Pending debt payment</h4>

    <div className="pendingBigDiv">
      <nav className="pendingDiv">
        <div className="pendingOutter">
          <div className="pendingInnerDiv">
            <img src="logo.png" alt="Profile Image" />
          </div>
          <div className="pendingInnerDiv" style={{ width: 'auto' }}>
            <div>
              {/* <p className="publicKey">GCZUCUtd5PxucA8qFxVQkhWbaH7eyAuJ8v4rk66G4F4T</p> */}
            </div>
          </div>
        </div>
      </nav>

      <div className="pendingDiv">
        <div className="pendingInnerDiv" style={{ width: 'auto' }}>
          <div>
            {/* <p>$30.99</p> */}
            {/* <p>2 SOL</p> */}
          </div>
        </div>
      </div>
    </div>          
  </div>
  <br/>
  <div className="pendingDebt">
    <h4 style={{ textTransform: 'uppercase', color: 'aliceblue', paddingTop: '20px', marginLeft: '20px' }}>Account Recievable</h4>

    <div className="pendingBigDiv">
      <nav className="pendingDiv">
        <div className="pendingOutter">
          <div className="pendingInnerDiv">
            <img src="logo.png" alt="Profile Image" />
          </div>
          <div className="pendingInnerDiv" style={{ width: 'auto' }}>
            <div>
              {/* <p className="publicKey">GoEpS3aPcWeXF8965Jb7cdf8QqDeoANtUFs6ubvFU5xq</p> */}
            </div>
          </div>
        </div>
      </nav>

      <div className="pendingDiv">
        <div className="pendingInnerDiv" style={{ width: 'auto' }}>
          <div>
            {/* <p>$30.99</p> */}
            {/* <p>2 SOL</p> */}
          </div>
        </div>
      </div>
    </div>          
  </div>

  <div class="center1">
          <div class="outer button">
          <Link href="Borrow"><button>Borrow</button></Link>
            <span></span>
            <span></span>
          </div>
          <div class="outer button">
            <Link href="Lending"><button>Send</button></Link>
            <span></span>
            <span></span>
          </div>
  </div>
  
   
</div>


<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>



    </main>
  )
}

export default dynamic (() => Promise.resolve(Home), {ssr: false} )
  