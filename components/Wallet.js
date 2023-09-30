import React from "react";

const Wallet = ({ keypair }) => {
  return (
    <div>
      <div className="flex mt-4">
        <a
          href={`https://explorer.solana.com/address/${keypair}?cluster=devnet`}
          target="_blank"
          className="text-black backdrop-blur-2xl rounded-xl px-4 py-2 bg-white"
        >
          Open Explorer
        </a>
      </div>
    </div>
  );
};

export default Wallet;
