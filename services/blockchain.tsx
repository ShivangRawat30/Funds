import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import abi from '@/artifacts/contracts/dappFundsX.sol/DappFundX.json'
import { globalActions } from '@/store/globalSlices'
import { CharityParams, CharityStruct, DonorParams, SupportStruct } from '@/utils/type.dt'
import { store } from '@/store'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)
const { setSupports, setCharity } = globalActions

let ethereum: any
let tx: any

if (typeof window !== 'undefined') ethereum = (window as any).ethereum

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contracts = new ethers.Contract(address.dappFundXContract, abi.abi, signer)
    return contracts
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contact = new ethers.Contract(address.dappFundXContract, abi.abi, signer)
    return contact
  }
}

const getAdmin = async (): Promise<string> => {
  const contract = await getEthereumContracts()
  const owner = await contract.owner()
  return owner
}

const getCharities = async (): Promise<CharityStruct[]> => {
  const contract = await getEthereumContracts()
  const charities = await contract.getCharities()
  return structuredCharities(charities)
}

const getMyCharities = async (): Promise<CharityStruct[]> => {
  const contract = await getEthereumContracts()
  const charities = await contract.getMyCharities()
  return structuredCharities(charities)
}

const getCharity = async (id: number): Promise<CharityStruct> => {
  const contract = await getEthereumContracts()
  const charity = await contract.getCharity(id)
  return structuredCharities([charity])[0]
}

const getSupporters = async (id: number): Promise<SupportStruct[]> => {
  const contract = await getEthereumContracts()
  const supporters = await contract.getSupporters(id)
  return structuredSupporters(supporters)
}

const createCharity = async (charity: CharityParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.createCharity(
      charity.name,
      charity.fullname,
      charity.profile,
      charity.description,
      charity.image,
      toWei(Number(charity.amount))
    )
    await tx.await()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}



const updateCharity = async (charity: CharityParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }
  try {
    const contract = await getEthereumContracts()
    tx = await contract.updateCharity(
      charity.id,
      charity.name,
      charity.fullname,
      charity.profile,
      charity.description,
      charity.image,
      toWei(Number(charity.amount))
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteCharity = async (id: Number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.deleteCharity(id)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const banCharity = async (id: number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.toggleBan(id)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const makeDonation = async (donation: DonorParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    ;(tx = await contract.donate(donation.id, donation.fullname, donation.comment)),
      {
        value: toWei(Number(donation.amount)),
      }
    await tx.wait()

    const supporters = await getSupporters(Number(donation.id))
    store.dispatch(setSupports(supporters))

    const charity = await getCharity(Number(donation.id))
    store.dispatch(setCharity(charity))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const structuredCharities = (charities: CharityStruct[]): CharityStruct[] =>
  charities
    .map((charity) => ({
      id: Number(charity.id),
      cid: (charity.cid),
      donations: Number(charity.donations),
      amount: parseFloat(fromWei(charity.amount)),
      owner: charity.owner,
    }))

const structuredSupporters = (supports: SupportStruct[]): SupportStruct[] =>
  supports
    .map((support) => ({
      id: Number(support.id),
      amount: parseFloat(fromWei(support.amount)),
      supporter: support.supporter,
    }))


export {
    getCharities,
    getMyCharities,
    getCharity,
    getSupporters,
    createCharity,
    updateCharity,
    deleteCharity,
    banCharity,
    getAdmin,
    makeDonation,
}