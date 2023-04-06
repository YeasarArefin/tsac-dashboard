/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getFetcher = async (...args) => {
    const { data } = await axios.get(...args);
    return data;
};

export const postFetcher = async (...args) => {
    const { data } = await axios.post(...args);
    return data;
};
