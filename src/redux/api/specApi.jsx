import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const specificationApi = createApi({
    reducerPath: 'specificationApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminSpecification', 'Specification'],
    endpoints:(builder) => ({
        getAdminSpecifications: builder.query({
            query: () => ({
                url:'/admin/fields',
                
            }),
            providesTags:["AdminSpecification"]
        }),

        getSpecifications: builder.query({
            query: () =>({
                url:'/fields',
            }),
            providesTags:["Specification"]
        }),

        createSpecification: builder.mutation({
            query(body) {
                return{
                    url: "/admin/field/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminSpecification'],
        }),

        deleteSpecification: builder.mutation({
            query(id) {
                return{
                    url: `/admin/field/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["AdminSpecification"],
        }),

       updateSpecification: builder.mutation({
        query({ id, title }) {
        return {
            url: `/admin/field/${id}`,
            method: "PUT",
            body: { title }, // Fix: Correctly structure body
        };
    },
            invalidatesTags: ['AdminSpecification'],
    }),

        getSpecificationDetails: builder.query({
            query: (id) =>({
                url: `admin/field/details/${id}`,
            }),
            providesTags: ['AdminSpecification'],
        }),
    }),
});

export const { useGetAdminSpecificationsQuery, useCreateSpecificationMutation, useDeleteSpecificationMutation, useUpdateSpecificationMutation, useGetSpecificationDetailsQuery, useGetSpecificationsQuery } = specificationApi;