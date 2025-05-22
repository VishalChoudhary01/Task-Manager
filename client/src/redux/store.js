import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './featuresSlice/themeSlice';

export const store=configureStore({
    reducer:{
        theme:themeReducer,
    }
})

