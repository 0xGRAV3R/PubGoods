import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';

const erc20abi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

const APE_TOKEN_ADDRESS = '0x4d224452801ACEd8B2F0aebE155379bb5D594381';

export async function rewardContributorsWithToken (addressAmountMapping) {
  const provider = new JsonRpcProvider({
    url: 'https://eth-mainnet.g.alchemy.com/v2/3KWr08H3rsKblx210xMX16ZSjHFLcY5q'
  });
  const contract = new Contract(APE_TOKEN_ADDRESS, erc20abi, provider.getSigner());
  // send ape coint to contributors
  for (let i=0; i < Object.keys(addressAmountMapping); i++) {
    try {
    contract.transfer(Object.keys(addressAmountMapping)[i], addressAmountMapping[Object.keys(addressAmountMapping)[i]]).then(
      (tx) => tx.wait()).catch((e) => console.log(e));
    } catch (e) {
      console.warn(e)
    }
  }
}