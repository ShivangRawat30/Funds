import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdOutlineWork } from 'react-icons/md'
import { MdVerified } from "react-icons/md";

const Page: NextPage = () => {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const checkVerification = async() => {
    try{
      const resp = await fetch(`https://api.holonym.io/sybil-resistance/gov-id/optimism?action-id=123456789&user=${address}`);
      const result = await resp.json();
      if(result.result == false){
        
        router.push('https://app.holonym.id/issuance/gov-id');
      }
      else{
        router.push('/Home');
      }

    } catch(error){
      console.log(error);
    }
  }
  return (
    <>
      {!isConnected ? (
        <div className="w-full h-[100vh] flex text-5xl text-[#F3F4F6] items-center justify-center bg-[#080813]">
          Please Connect Your Wallet
        </div>
      ) : (
        <div className="px-20 py-20 flex justify-center items-center h-[100vh] w-[100vw]">
          <div className="">
            <h1 className="py-20 text-[#a75891] text-center font-bold text-7xl">
              Register Yourself
            </h1>
            <div className="flex gap-[100px] items-center justify-center ">
              <div>
                <button
                  onClick={() => router.push('/register')}
                  className="bg-custom-primary text-[#a75891] hover:text-[#E0E0E0] h-[200px] font-black border-[2px] mr-2 px-6 py-5 w-[200px] rounded-xl 
  transition-colors duration-300 text-2xl delay-100 hover:border-0 hover:bg-[#a75891] cursor-pointer flex flex-col justify-betwee items-center"
                >
                  <BsFillPeopleFill size={150} />
                </button>
                <h1 className="flex items-center text-[#a75891] ml-10">Register Yourself</h1>
              </div>
              <div>
                <button
                  onClick={checkVerification}
                  className="bg-custom-primary text-[#a75891] hover:text-[#E0E0E0] h-[200px] font-black border-[2px] mr-2 px-6 py-5 w-[200px] rounded-xl 
  transition-colors duration-300 text-2xl delay-100 hover:border-0 hover:bg-[#a75891] cursor-pointer flex flex-col justify-betwee items-center"
                >
                  <MdVerified size={150} />
                </button>
                <h1 className="flex items-center text-[#a75891] ml-10">Verify Your Identity</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page

// export const getServerSideProps = async () => {
//   const charitiesData: CharityStruct[] = await getCharities();
//   return {
//     props: { charitiesData: JSON.parse(JSON.stringify(charitiesData)) },
//   }
// }
