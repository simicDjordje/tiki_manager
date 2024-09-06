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
  activeService: null,
  activeWorkerDetails: null,
  notifications: {
    seen: [],
    unseen: [],
    all: [],
  },
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
    },
    
    setActiveService: (state, action) => {
        state.activeService = action.payload
    },

    setActiveWorkerDetails: (state, action) => {
      state.activeWorkerDetails = action.payload
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload
    },

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
      apiCore.endpoints.getNotifications.matchFulfilled,
      (state, action) => {
        const responseData = action.payload?.result ? [...action?.payload?.result] : []

        state.notifications.seen = responseData.filter(i => i.seen)
        state.notifications.unseen = responseData.filter(i => !i.seen)
        state.notifications.all = responseData
        
        console.log('STATE NOTIFICATIONS: ', state.notifications)
      }
    )

    builder.addMatcher(
        apiCore.endpoints.getSalonById.matchFulfilled,
        (state, action) => {
          if (action?.payload?.result) {
            console.log(action?.payload?.result.workers)
            // Reverse categories and services within them
            const reversedCategories = action.payload.result.categories.map(category => {
              const reversedServices = [...category.category.services].reverse()
      
              return {
                ...category,
                category: {
                  ...category.category,
                  services: reversedServices
                }
              }
            }).reverse();
      
            // Set the reversed data to state
            state.currentSalon = {
              ...action.payload.result,
              categories: reversedCategories
            }
      
            if (state.activeCategory) {
              const foundedActiveCategory = reversedCategories.find(i =>
                String(i.category._id) === String(state.activeCategory._id)
              );
      
              if (foundedActiveCategory) {
                state.activeCategory = foundedActiveCategory.category;
              }
            }
          }
        }
      );     
      
      builder.addMatcher(
        apiCore.endpoints.getUserData.matchFulfilled,
        (state, action) => {
          state.activeWorkerDetails = action?.payload?.result ? action?.payload?.result : null
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
        setActiveCategory,
        setActiveService,
        setActiveWorkerDetails,
        setNotifications,
    } = generalSlice.actions

export default generalSlice.reducer