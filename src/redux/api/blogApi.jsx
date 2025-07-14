import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminBlog', 'Blog'],
    endpoints:(builder) => ({

        createBlog: builder.mutation({
            query(body) {
                return{
                    url: "/admin/blog/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminBlog'],
        }),

        getUserBlog: builder.query({
            query: () =>({
                url:'/blog',
            }),
            providesTags:["Blog"]
        }),

    }),
});     

export const { useCreateBlogMutation, useGetUserBlogQuery } = blogApi;