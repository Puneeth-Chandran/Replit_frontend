import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';

export const otpApi = createApi({
  reducerPath: 'otpApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  tagTypes: ['Otp'],
  endpoints: (builder) => ({

    sendOtp: builder.mutation({
      query: (body) => ({
        url: '/send-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Otp'],
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { email, otp },
      }),
      invalidatesTags: ['Otp'],
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: '/send-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Otp'],
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation, useResendOtpMutation } = otpApi;
