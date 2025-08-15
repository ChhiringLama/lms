import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { courseApi } from '@/features/api/courseApi';
import { authApi } from '@/features/api/authApi';
import { purchaseApi } from '@/features/api/purchaseApi';
import { courseProgressApi } from '@/features/api/courseProgressApi';
import { reviewApi } from '@/features/api/reviewApi';

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer,

    auth:authReducer
})

export default rootReducer;