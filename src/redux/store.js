import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer, // Подключаем редюсер корзины
    },
});

export default store;