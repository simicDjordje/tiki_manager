import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCore = createApi({
	reducerPath: 'apiCore',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://164.92.129.161/api',
		prepareHeaders: async (headers) => {
			const token = await AsyncStorage.getItem('@userToken')
			
			if(token){
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: (builder) => ({
		getAllData: builder.query({query: () => '/get-all-data2'}),
		getCountries: builder.query({query: () => '/country-list'}),
		getAvailableServers: builder.query({query: () => '/available-servers'}),
		register: builder.mutation({
			query: (data) => {
				return {
					url: '/register-mobile',
					method: 'POST',
					body: data,
				}
			}
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `/login-mobile`,
				method: 'POST',
				body: data,
			})
		}),
		connectMT: builder.mutation({
			query: (data) => ({
				url: `/connect-mt-mobile`,
				method: 'POST',
				body: data,
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: `/logout`,
				method: 'POST',
			})
		}),
		discoverStrategies: builder.mutation({
			query: () => ({
				url: `/discover-strategies-mobile`,
				method: 'POST',
			})
		}),
		strategyInfo: builder.mutation({
			query: (data) => ({
				url: `/strategy-info-mobile`,
				method: 'POST',
				body: data
			})
		}),
		subscribeStrategy: builder.mutation({
			query: (data) => ({
				url: `/subscribe-strategy-mobile`,
				method: 'POST',
				body: data
			})
		}),
		alreadySubscribedStrategies: builder.mutation({
			query: () => ({
				url: `/subscribed-strategies-mobile`,
				method: 'POST',
			})
		}),
		addedStrategies: builder.mutation({
			query: () => ({
				url: `/added-strategies-mobile`,
				method: 'POST',
			})
		}),
		unsubscribeStrategy: builder.mutation({
			query: (data) => ({
				url: `/unsubscribe-strategy-mobile`,
				method: 'POST',
				body: data
			})
		}),
		removeStrategy: builder.mutation({
			query: (data) => ({
				url: `/remove-strategy-mobile`,
				method: 'POST',
				body: data
			})
		}),
		addStrategy: builder.mutation({
			query: (data) => {
				return {
					url: '/add-strategy-mobile',
					method: 'POST',
					body: data,
				}
			}
		}),
		changePassword: builder.mutation({
			query: (data) => {
				return {
					url: '/change-password-mobile',
					method: 'POST',
					body: data,
				}
			}
		}),
		editProfile: builder.mutation({
			query: (data) => {
				return {
					url: '/edit-profile',
					method: 'POST',
					body: data,
				}
			}
		}),
	})
})

export const { 
	useGetAllDataQuery,
	useGetCountriesQuery,
	useGetAvailableServersQuery,
	useRegisterMutation,
	useLoginMutation,
	useConnectMTMutation,
	useLogoutMutation,
	useDiscoverStrategiesMutation,
	useStrategyInfoMutation,
	useSubscribeStrategyMutation,
	useAlreadySubscribedStrategiesMutation,
	useUnsubscribeStrategyMutation,
	useRemoveStrategyMutation,
	useAddStrategyMutation,
	useAddedStrategiesMutation,
	useChangePasswordMutation,
	useEditProfileMutation,
} = apiCore;
