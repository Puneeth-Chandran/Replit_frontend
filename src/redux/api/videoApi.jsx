import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminVideo', 'Video'],
    endpoints:(builder) => ({

        createVideo: builder.mutation({
            query(body) {
                return{
                    url: "/admin/video/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminVideo'],
        }),

        getUserVideos: builder.query({
            query: () =>({
                url:'/faq-videos',
            }),
            providesTags:["Video"]
        }),
    }),
});

export const { useCreateVideoMutation, useGetUserVideosQuery } = videoApi;