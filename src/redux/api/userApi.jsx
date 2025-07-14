import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';
import { BASE_URL } from '../../config';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes: ['User', 'AdminUsers','AdminUser'],
    endpoints:(builder) => ({
        getMe: builder.query({
           query: () => "/me",
           transformResponse: (result) => result.user,
           async onQueryStarted(args, {dispatch, queryFulfilled}){
            try{
              const { data } = await queryFulfilled;
              dispatch(setUser(data));
              dispatch(setIsAuthenticated(true));
              dispatch(setLoading(false));
            }catch(error){
                dispatch(setLoading(false));
              }
           }
        }),
        forgotPassword: builder.mutation({
            query(body){
                return {
                    url: "/password/forgot",
                    method: "POST",
                    body,
                }
            }
        }),
        resetPassword : builder.mutation({
            query({token, body}) {
                return {
                    url:`/password/reset/${token}`,
                    method: "PUT",
                    body,
                }
            }
        }),
        getAdminUsers: builder.query({
            query: () => '/admin/users',
            providesTags: ["AdminUsers"]
        }),
        contactFormSubmit: builder.mutation({
            query(body){
                return {
                    url: "/reach-us",
                    method: "POST",
                    body,
                }
            }
        }),
        getUserDetails: builder.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: ["AdminUser"]
        }),
        updateUser : builder.mutation({
            query({id, body}) {
                return {
                    url:`admin/users/${id}`,
                    method: "PUT",
                    body,
                }
            },
            invalidatesTags: ["AdminUsers"]
        }),
        deleteUser : builder.mutation({
            query(id){
                return {
                    url: `/admin/users/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["AdminUsers"],
        }),

        distributorFormSubmit: builder.mutation({
            query(body){
                return {
                    url: "/become-distributor",
                    method: "POST",
                    body,
                }
            }
        }),
    }),
});

export const { useGetMeQuery, useForgotPasswordMutation, useResetPasswordMutation, useGetAdminUsersQuery, 
    useContactFormSubmitMutation, useGetUserDetailsQuery, useUpdateUserMutation, useDeleteUserMutation, useDistributorFormSubmitMutation } = userApi;