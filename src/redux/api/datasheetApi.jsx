import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const datasheetApi = createApi({
    reducerPath: 'datasheetApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminDatasheet'],
    endpoints:(builder) => ({
        getAdminDatasheets: builder.query({
            query: () => ({
                url:'/admin/datasheets',
            }),
            providesTags:["AdminDatasheet"]
        }),

        uploadDatasheet: builder.mutation({
            query(body) {
                return{
                    url: "/admin/datasheet/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminDatasheet'],
        }),

        deleteDatasheet: builder.mutation({
            query(id) {
                return{
                    url: `/admin/datasheet/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["AdminDatasheet"],
        }),

    }),
});

export const { useUploadDatasheetMutation, useDeleteDatasheetMutation, useGetAdminDatasheetsQuery } = datasheetApi;