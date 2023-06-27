import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum));
  const [signer, setSigner] = useState(null);

  const ABI = [{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"timeStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];

  const contractAddress = '0x90d524dC6Cb8089daa99F18788529d220126d23D';

  const contract = signer ? new ethers.Contract(contractAddress, ABI, signer) : null;

  const connectWallet = async () => {
    await window.ethereum.enable();
    setSigner(provider.getSigner());
  }

  const stake = async (amount) => {
    if (contract) {
      const weiAmount = ethers.utils.parseEther(amount.toString());
      await contract.stake({ value: weiAmount });
    }
  };

  const unstake = async () => {
    if (contract) {
      await contract.unstake();
    }
  };

  return (
      <div>
        {!signer ? (
            <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
            <>
              <button onClick={() => stake(1)}>Stake 1 ETH</button>
              <button onClick={unstake}>Unstake</button>
            </>
        )}
      </div>
  );
}

export default App;
