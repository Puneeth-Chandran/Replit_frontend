import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const knowApi = createApi({
    reducerPath: 'knowApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminKnow', 'Know'],
    endpoints:(builder) => ({

        createKnow: builder.mutation({
            query(body) {
                return{
                    url: "/admin/know-how/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminKnow'],
        }),

        getUserKnow: builder.query({
            query: () =>({
                url:'/know-how',
            }),
            providesTags:["Know"]
        }),
    }),
});

export const { useCreateKnowMutation, useGetUserKnowQuery } = knowApi;