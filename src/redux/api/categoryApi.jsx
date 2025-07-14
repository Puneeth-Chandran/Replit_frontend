import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminCategory', 'Category'],
    endpoints:(builder) => ({
        getAdminCategories: builder.query({
            query: () => ({
                url:'/admin/category',
            }),
            providesTags:["AdminCategory"]
        }),

        getCategory: builder.query({
            query: () =>({
                url:'/category',
            }),
            providesTags:["Category"]
        }),

        createCategory: builder.mutation({
            query(body) {
                return{
                    url: "/admin/category/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminCategory'],
        }),
        deleteCategory: builder.mutation({
            query(id) {
                return{
                    url: `/admin/category/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["AdminCategory"],
        }),
        updateCategoryImage: builder.mutation({
            query({id, body}) {
                return{
                    url: `/admin/category/${id}/update_image`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["AdminCategory"],
        }),
        
        updateCategory: builder.mutation({
            query({id, body}) {
                return{
                    url: `/admin/category/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['AdminCategory'],
        }),

        getCategoryDetails: builder.query({
            query: (id) =>({
                url: `/admin/category/details/${id}`,
            }),
            providesTags: ['AdminCategory'],
        }),

    }),
});

export const { useGetAdminCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryImageMutation, useUpdateCategoryMutation, useGetCategoryDetailsQuery, useGetCategoryQuery } = categoryApi;