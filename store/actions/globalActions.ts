import { CharityStruct, GlobalState, SupportStruct, UserStruct } from "@/utils/type.dt"
import { PayloadAction } from "@reduxjs/toolkit"

export const globalActions = {
    setCharities: (state: GlobalState, action: PayloadAction<[]>) => {
        state.charities = action.payload
    },
    setCharity: (state: GlobalState, action: PayloadAction<CharityStruct | null>) => {
        state.charity = action.payload
    },
    setSupports: (state: GlobalState, action: PayloadAction<SupportStruct[]>) => {
        state.supports = action.payload
    },
    setUser: (state: GlobalState, action: PayloadAction<UserStruct | null>) => {
        state.user = action.payload
    },
    setDeleteModal: (state: GlobalState, action: PayloadAction<string>) => {
        state.deleteModal = action.payload
    },
    setDonorsModal: (state: GlobalState, action: PayloadAction<string>) => {
        state.donorsModal = action.payload
    },
    setSupportModal: (state: GlobalState, action: PayloadAction<string>) => {
        state.supportModal = action.payload
    },
    setBanModal: (state: GlobalState, action: PayloadAction<string>) => {
        state.banModal = action.payload
    },
    setOwner: (state: GlobalState, action: PayloadAction<string>) => {
        state.owner = action.payload
    },
}