import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newsItems: []
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addNews: (state, action) => {
            state.newsItems.push(action.payload);
        },
        setNews: (state, action) => {
            state.newsItems = action.payload;
        }
    }
});

export const { addNews, setNews } = newsSlice.actions;
export default newsSlice.reducer;   
