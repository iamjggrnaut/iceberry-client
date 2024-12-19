import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Список товаров в корзине
    totalAmount: 500, // Общая стоимость корзины
    totalQuantity: 0, // Общее количество товаров,
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;

            // Найти, есть ли товар уже в корзине
            const existingItem = state.items.find((item) => item.id === product.id && item.priceVariant.price === product.priceVariant.price);

            if (existingItem) {
                // Если товар уже есть, увеличиваем его количество
                existingItem.quantity += product.quantity;
                existingItem.totalPrice = existingItem.quantity * Number(product.priceVariant.price);
            } else {
                // Если товара нет, добавляем его
                const product = action.payload;

                console.log(product);

                state.items.push({
                    ...product,
                    quantity: product.quantity, // Количество
                    totalPrice: product.quantity * Number(product.priceVariant.price), // Рассчитываем начальную стоимость
                });
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = 500 + state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const itemIndex = state.items.findIndex((item) => item.id === id);

            if (itemIndex !== -1) {
                state.items.splice(itemIndex, 1); // Удаляем товар
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = 500 + state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Обновляем количество
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.priceVariant.price;
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = 500 + state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        clearCart: (state) => {
            // Очищаем корзину
            state.items = [];
            state.totalAmount = 500;
            state.totalQuantity = 0;
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
