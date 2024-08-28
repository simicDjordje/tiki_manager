import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCore = createApi({
	reducerPath: 'apiCore',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.0.102:5000/api/v1',
		prepareHeaders: async (headers) => {
			let user = await AsyncStorage.getItem('@userData')
			user = JSON.parse(user)

			const token = user?.token

			if(token){
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: (builder) => ({
		checkIfUserExists: builder.mutation({
			query: (data) => {
				return {
					url: '/users/check',
					method: 'POST',
					body: data,
				}
			}
		}),
		signUpUser: builder.mutation({
			query: (data) => {
				return {
					url: '/users/signup',
					method: 'POST',
					body: data,
				}
			}
		}),
		createWorkerAccount: builder.mutation({
			query: (data) => {
				return {
					url: '/users/create-worker',
					method: 'POST',
					body: data
				}
			}
		}),
		signInUser: builder.mutation({
			query: (data) => {
				return {
					url: '/users/login',
					method: 'POST',
					body: data
				}
			}
		}),
		getUserSalons: builder.mutation({
			query: (data) => {
				return {
					url: '/salons/get-user-salons',
					method: 'POST',
					body: data
				}
			}
		}),
		createSalon: builder.mutation({
			query: (data) => {
				return {
					url: '/salons/create',
					method: 'POST',
					body: data
				}
			}
		}),
		getSalonById: builder.mutation({
			query: (data) => {
				return {
					url: `/salons/salon/${data?.salonId}`,
					method: 'POST',
					body: data
				}
			}
		}),
		updateSalon: builder.mutation({
			query: (data) => {
				return {
					url: `/salons/update`,
					method: 'POST',
					body: data
				}
			}
		}),
		createCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/services/create-category`,
					method: 'POST',
					body: data
				}
			}
		}),
	})
})

export const { 
	useCheckIfUserExistsMutation,
	useSignUpUserMutation,
	useCreateWorkerAccountMutation,
	useSignInUserMutation,
	useGetUserSalonsMutation,
	useCreateSalonMutation,
	useGetSalonByIdMutation,
	useUpdateSalonMutation,
	useCreateCategoryMutation,
} = apiCore;
