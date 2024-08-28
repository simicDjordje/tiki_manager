import { createSlice } from '@reduxjs/toolkit';
import { apiCore } from './apiCore';


const initialState = {
  userData: 'loading',
  justCreatedSalon: null,
  justCreatedWorkerAccount: null,
  justSignedUp: null,
  currentSalon: null,
  userSalons: {
    salonsActive: [],
    salonsInactive: []
  },
  signUpFirstScreenData: {
    email: ''
  },
  comesFrom: null,
  activeCategory: null,
}


const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.userData = action.payload
    },

    setJustCreatedSalon: (state, action) => {
        state.justCreatedSalon = action.payload
    },

    setJustCreatedWorkerAccount: (state, action) => {
        state.justCreatedWorkerAccount = action.payload
    },

    setJustSignedUp: (state, action) => {
        state.justSignedUp = action.payload
    },

    setCurrentSalon: (state, action) => {
        state.currentSalon = action.payload
    },

    setUserSalons: (state, action) => {
        state.userSalons = action.payload
    },

    setSignUpFirstScreenData: (state, action) => {
        state.signUpFirstScreenData = action.payload
    },

    setComesFrom: (state, action) => {
        state.comesFrom = action.payload
    },

    setActiveCategory: (state, action) => {
        state.activeCategory = action.payload
    }

  },
  extraReducers: (builder) => {

    builder.addMatcher(
      apiCore.endpoints.getUserSalons.matchFulfilled,
      (state, action) => {
        const dataReversed = action?.payload?.result ? [...action?.payload?.result].reverse() : []

        state.userSalons.salonsActive = dataReversed.filter(i => i.isActive)
        state.userSalons.salonsInactive = dataReversed.filter(i => !i.isActive)

      }
    )

    builder.addMatcher(
        apiCore.endpoints.getSalonById.matchFulfilled,
        (state, action) => {  
        //   console.log('########')
        //   console.log(action?.payload?.result?.categories[0].category)
        //   console.log('########')

          state.currentSalon = action?.payload?.result ? action?.payload?.result : state.currentSalon
        }
    )
  },
})



export const { 
        setUser, 
        setJustCreatedSalon, 
        setJustCreatedWorkerAccount,
        setJustSignedUp,
        setCurrentSalon,
        setUserSalons,
        setSignUpFirstScreenData,
        setComesFrom,
        setActiveCategory
    } = generalSlice.actions

export default generalSlice.reducer