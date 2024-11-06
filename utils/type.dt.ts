export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface DonorParams {
  id?: number
  comment: string
  fullname: string
  amount: number | string
}

export interface CharityParams {
  id?: number
  name: string
  fullname: string
  profile: string
  amount: number | string
  description: string
  image: string
}

export interface CharityStruct {
  cid: string
  id: number
  owner: string
  amount: number
  donations: number
}

export interface SupportStruct {
  id: number
  amount: number
  supporter: string
}

export interface UserStruct{
  cid: string
  verified: boolean
}

export interface GlobalState {
  charities: CharityStruct[]
  charity: CharityStruct | null
  supports: SupportStruct[]
  user: UserStruct | null
  deleteModal: string
  donorsModal: string
  supportModal: string
  banModal: string
  owner: string
}

export interface RootState {
  globalStates: GlobalState
}
