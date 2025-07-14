import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['Product','AdminProducts','Reviews'],
    // keepUnusedDataFor: 90,
    endpoints:(builder) => ({
        getProducts: builder.query({
    query: (params = {}) => {
        const { page, keyword, subcategory, category, specifications } = params;

        return {
            url: '/products',
            params: {
                page,
                keyword,
                subcategory,
                category,
                ...(specifications
                    ? Object.fromEntries(
                        Object.entries(specifications).map(([key, value]) => [`spec-${key}`, value])
                      )
                    : {}
                )
            }
        };
    }
}),

        getAllProducts: builder.query({
            query: () =>({
                url:'/all-products',
            }),
            providesTags:["Product"]
        }),

        getProductDetails: builder.query({
            query: (slug) =>({
                url:  `/products/${slug}`,
            }),
            providesTags: ['Product'],
        }),

        getAdminProductDetails: builder.query({
            query: (slug) =>({
                url:  `/admin/products/${slug}`,
            }),
            providesTags: ['Product'],
        }),

        submitReview: builder.mutation({
            query(body){
                return {
                    url: '/reviews',
                    method: "PUT",
                    body,
                }
            },
            invalidatesTags: ['Product']
        }),
        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ['AdminProducts'],
        }),

        createProduct: builder.mutation({
            query(body) {
                return{
                    url: "/admin/product",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminProducts'],
        }),

        createProductVariant: builder.mutation({
            query({ slug, ...body }) {
                return{
                    url: `/admin/product/${slug}/variant`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminProducts', 'Product'],
        }),

        updateProduct: builder.mutation({
            query({slug, body}) {
                return{
                    url: `/admin/products/${slug}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['AdminProducts', "Product"],
        }),
        uploadProductImages: builder.mutation({
            query({slug, body}) {
                return{
                    url: `/admin/products/${slug}/upload_images`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: [ "Product"],
        }),
        deleteProductImage: builder.mutation({
            query({slug, body}) {
                return{
                    url: `/admin/products/${slug}/delete_image`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: [ "Product"],
        }),
        deleteProduct: builder.mutation({
            query(id) {
                return{
                    url: `/admin/products/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["AdminProducts"],
        }),
        getProductReviews: builder.query({
            query: (productId) => ({
                url:`/admin/reviews?id=${productId}`,
            }),
            providesTags: ['Reviews','AdminProducts'],
        }),
        deleteReview: builder.mutation({
            query({productId, id}) {
                return{
                    url: `/admin/reviews?productId=${productId}&id=${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ['Reviews','AdminProducts'],
        }),

        sendQuotationEmail: builder.mutation({
            query(body) {
                return {
                    url: '/send-quotation',
                    method: 'POST',
                    body,
                };
            }
            }),
        
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useGetAdminProductsQuery, useCreateProductMutation, 
    useUpdateProductMutation, useUploadProductImagesMutation, useSubmitReviewMutation, useDeleteProductImageMutation, useGetAllProductsQuery, 
    useDeleteProductMutation, useLazyGetProductReviewsQuery, useDeleteReviewMutation, useGetAdminProductDetailsQuery, useCreateProductVariantMutation , useSendQuotationEmailMutation } = productApi;