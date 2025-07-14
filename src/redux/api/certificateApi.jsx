import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const certificateApi = createApi({
    reducerPath: 'certificateApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes:['AdminCertificate', 'Certificate'],
    endpoints:(builder) => ({

        createCertificate: builder.mutation({
            query(body) {
                return{
                    url: "/admin/certificate/new",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ['AdminCertificate'],
        }),

        getUserCertificate: builder.query({
            query: () =>({
                url:'/certificate',
            }),
            providesTags:["Certificate"]
        }),

        getAdminCertificate: builder.query({
            query: () =>({
                url:'/admin/certificate',
            }),
            providesTags:["AdminCertificate"]
        }),

        deleteCertificate: builder.mutation({
            query(id) {
                return{
                    url: `/admin/certificate/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["AdminCertificate"],
        }),

        updateCertificate: builder.mutation({
            query({id, body}) {
                return{
                    url: `/admin/certificate/${id}`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ['AdminCertificate', 'Certificate'],
        }),

        updateCertificateImage: builder.mutation({
            query({id, body}) {
                return{
                    url: `/admin/certificate/${id}/update_image`,
                    method: "PUT",
                    body,
                };
            },
            invalidatesTags: ["AdminCertificate"],
        }),

        getCertificateDetails: builder.query({
            query: (id) =>({
                url: `/admin/certificate/${id}`,
            }),
            providesTags: ['AdminCertificate'],
        }),

        deleteCertificateFile: builder.mutation({
            query(id) {
                return{
                    url: `/admin/certificate/${id}/delete_file`,
                    method: "PUT",
                };
            },
            invalidatesTags: [ "Certificate", "AdminCertificate"],
        }),

    }),
});

export const { useCreateCertificateMutation, useGetUserCertificateQuery, useGetAdminCertificateQuery, useDeleteCertificateMutation, useUpdateCertificateMutation, useGetCertificateDetailsQuery, useUpdateCertificateImageMutation, useDeleteCertificateFileMutation } = certificateApi;