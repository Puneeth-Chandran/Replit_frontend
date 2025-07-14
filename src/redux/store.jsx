import {configureStore} from '@reduxjs/toolkit';

import userReducer from './features/userSlice.jsx';

import { productApi } from './api/productsApi.jsx';
import { authApi } from './api/authApi.jsx';
import { userApi } from './api/userApi.jsx';
import { categoryApi } from './api/categoryApi.jsx';
import { datasheetApi } from './api/datasheetApi.jsx';
import { specificationApi } from './api/specApi.jsx';
import { certificateApi } from './api/certificateApi.jsx';
import { otpApi} from './api/otpApi.jsx';
// import { videoApi } from './api/videoApi.jsx';
// import { knowApi } from './api/knowApi.jsx';
// import { blogApi } from './api/blogApi.jsx';

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [categoryApi.reducerPath]:categoryApi.reducer,
        [datasheetApi.reducerPath]:datasheetApi.reducer,
        [specificationApi.reducerPath]:specificationApi.reducer,
        [certificateApi.reducerPath]:certificateApi.reducer,
        [otpApi.reducerPath]:otpApi.reducer,
        // [videoApi.reducerPath]:videoApi.reducer,
        // [knowApi.reducerPath]:knowApi.reducer,
        // [blogApi.reducerPath]:blogApi.reducer,
},
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat([
        productApi.middleware,
        authApi.middleware,
        userApi.middleware,
        categoryApi.middleware,
        datasheetApi.middleware,
        specificationApi.middleware,
        certificateApi.middleware,
        otpApi.middleware,
        // videoApi.middleware,
        // knowApi.middleware,
        // blogApi.middleware,
    ]),
},
);