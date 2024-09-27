import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiCore = createApi({
	reducerPath: 'apiCore',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.27:5000/api/v1',
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
		//users

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
		getUserData: builder.mutation({
			query: (data) => {
				return {
					url: `/users/get-user-data`,
					method: 'POST',
					body: data
				}
			}
		}),
		getMyUserData: builder.mutation({
			query: (data) => {
				return {
					url: `/users/get-my-user-data`,
					method: 'POST',
					body: data
				}
			}
		}),
		searchForWorker: builder.mutation({
			query: (data) => {
				return {
					url: `/users/search`,
					method: 'POST',
					body: data
				}
			}
		}),
		updateUser: builder.mutation({
			query: (data) => {
				return {
					url: `/users/update`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end users

		//salons
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
		deleteCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/salons/delete-category`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end salons

		//services
		createCategory: builder.mutation({
			query: (data) => {
				return {
					url: `/services/create-category`,
					method: 'POST',
					body: data
				}
			}
		}),
		createService: builder.mutation({
			query: (data) => {
				return {
					url: `/services/create-service`,
					method: 'POST',
					body: data
				}
			}
		}),
		updateService: builder.mutation({
			query: (data) => {
				return {
					url: `/services/update-service`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end services


		//requests
		createToJoinSalonRequest: builder.mutation({
			query: (data) => {
				return {
					url: `/requests/create/join-to-salon`,
					method: 'POST',
					body: data
				}
			}
		}),
		checkIfToJoinSalonRequestExists: builder.mutation({
			query: (data) => {
				return {
					url: `/requests/check-if-exists/join-to-salon`,
					method: 'POST',
					body: data
				}
			}
		}),
		deleteToJoinSalonRequest: builder.mutation({
			query: (data) => {
				return {
					url: `/requests/delete/join-to-salon`,
					method: 'POST',
					body: data
				}
			}
		}),
		getRequest: builder.mutation({
			query: (data) => {
				return {
					url: `/requests/get-request`,
					method: 'POST',
					body: data
				}
			}
		}),
		updateRequest: builder.mutation({
			query: (data) => {
				return {
					url: `/requests//update/join-to-salon`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end requests

		//notifications
		getNotifications: builder.mutation({
			query: (data) => {
				return {
					url: `/notifications/get-notifications`,
					method: 'POST',
					body: data
				}
			}
		}),
		markSeenNotification: builder.mutation({
			query: (data) => {
				return {
					url: `/notifications/mark-seen`,
					method: 'POST',
					body: data
				}
			}
		}),
		markSeenNotificationAll: builder.mutation({
			query: (data) => {
				return {
					url: `/notifications/mark-all-seen`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end notifications

		//reservations
		getReservation: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/get-id`,
					method: 'POST',
					body: data
				}
			}
		}),
		rejectReservation: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/reject`,
					method: 'POST',
					body: data
				}
			}
		}),
		acceptReservation: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/accept`,
					method: 'POST',
					body: data
				}
			}
		}),
		checkReservation: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/check`,
					method: 'POST',
					body: data
				}
			}
		}),
		checkPendingReservationsByDateTime: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/check-all-pending`,
					method: 'POST',
					body: data
				}
			}
		}),
		rejectMultipleReservation: builder.mutation({
			query: (data) => {
				return {
					url: `/reservations/reject-multiple`,
					method: 'POST',
					body: data
				}
			}
		}),
		//end reservations
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
	useCreateServiceMutation,
	useUpdateServiceMutation,
	useGetUserDataMutation,
	useSearchForWorkerMutation,
	useCreateToJoinSalonRequestMutation,
	useCheckIfToJoinSalonRequestExistsMutation,
	useGetNotificationsMutation,
	useDeleteToJoinSalonRequestMutation,
	useGetRequestMutation,
	useUpdateRequestMutation,
	useMarkSeenNotificationMutation,
	useMarkSeenNotificationAllMutation,
	useGetMyUserDataMutation,
	useUpdateUserMutation,
	useGetReservationMutation,
	useRejectReservationMutation,
	useAcceptReservationMutation,
	useCheckReservationMutation,
	useCheckPendingReservationsByDateTimeMutation,
	useRejectMultipleReservationMutation,
	useDeleteCategoryMutation,
} = apiCore;
