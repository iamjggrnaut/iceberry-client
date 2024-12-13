import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Список товаров в корзине
    totalAmount: 0, // Общая стоимость корзины
    totalQuantity: 0, // Общее количество товаров
};

const calculatePrice = (item) => {
    // Выбор цены в зависимости от количества
    return item.quantity >= 10
        ? item.wholesalePrice * item.quantity // Оптовая цена
        : item.retailPrice * item.quantity;  // Розничная цена
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;

            // Найти, есть ли товар уже в корзине
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                // Если товар уже есть, увеличиваем его количество
                existingItem.quantity += product.quantity;
                existingItem.totalPrice = calculatePrice(existingItem);
            } else {
                // Если товара нет, добавляем его
                state.items.push({
                    ...product,
                    quantity: product.quantity, // Количество
                    totalPrice: calculatePrice(product), // Рассчитываем начальную стоимость
                });
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const itemIndex = state.items.findIndex((item) => item.id === id);

            if (itemIndex !== -1) {
                state.items.splice(itemIndex, 1); // Удаляем товар
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Обновляем количество
                existingItem.quantity = quantity;
                existingItem.totalPrice = calculatePrice(existingItem);
            }

            // Пересчитываем общую стоимость и количество
            state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        clearCart: (state) => {
            // Очищаем корзину
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
