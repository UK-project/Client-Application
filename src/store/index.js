import { configureStore } from "@reduxjs/toolkit";
import countryReducer from './country'

const store = configureStore({
    reducer:{
        country:countryReducer,
    }
});


export default store;
