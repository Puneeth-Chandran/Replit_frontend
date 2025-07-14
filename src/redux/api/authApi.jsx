import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';
import { BASE_URL } from '../../config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    endpoints:(builder) => ({
        register: builder.mutation({
            query(body){
                return {
                    url:"/admin/user/new",
                    method: "POST",
                    body,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                }catch(error){
                    console.error('error');
                }
            }
        }),
        login: builder.mutation({
            query(body) {
                return {
                    url: '/admin-belcab',
                    method: 'POST',
                    body,
                    credentials: "include",
                };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try {
                    const { data } = await queryFulfilled;
                    
                    await dispatch(userApi.endpoints.getMe.initiate(null, { forceRefetch: true }));
                } catch (error) {
                    console.error('Login error:', error);
                }
            }
        }),
        logout: builder.query({
            query: () => "/logout",
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;