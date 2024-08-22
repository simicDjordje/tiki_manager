import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCore = createApi({
	reducerPath: 'apiCore',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.4:5000/api/v1',
		prepareHeaders: async (headers) => {
			const token = await AsyncStorage.getItem('@userToken')
			
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
	})
})

export const { 
	useCheckIfUserExistsMutation,
	useSignUpUserMutation
} = apiCore;
