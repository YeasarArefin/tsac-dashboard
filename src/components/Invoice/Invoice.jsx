/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getFetcher } from '../../utils/functions/fetcher';
import EditPage from './Edit/EditPage';
import ViewPage from './View/ViewPage';

const Invoice = () => {
    const { data } = useSWR(`https://tsac.onrender.com/api/v1/accounts`, getFetcher);
    const [currentUser, setCurrentUser] = useState({});
    const [items, setItems] = useState([]);
    const [tableItems, setTableItems] = useState([]);
    const [newTableItem, setNewTableItem] = useState({ name: 'Tuition Fee', fee: 1 });
    const [preview, setPreview] = useState(false);
    const [vat, setVat] = useState(15);
    const [discount, setDiscount] = useState(0);

    const subjects = {
        HSC: [
            {
                name: 'physics - HSC',
                fee: 1000,
            },
            {
                name: 'chemistry - HSC',
                fee: 1000,
            },
            {
                name: 'biology - HSC',
                fee: 1000,
            },
            {
                name: 'higher math - HSC',
                fee: 1000,
            },
            {
                name: 'ict - HSC',
                fee: 1000,
            },
            {
                name: 'english - HSC',
                fee: 1000,
            },
        ],

        SSC: [
            {
                name: 'physics - SSC',
                fee: 1000,
            },
            {
                name: 'chemistry - SSC',
                fee: 1000,
            },
            {
                name: 'biology - SSC',
                fee: 1000,
            },
            {
                name: 'general math - SSC',
                fee: 1000,
            },
            {
                name: 'english - SSC',
                fee: 1000,
            },
        ],

        8: [
            {
                name: 'general math - 8',
                fee: 1000,
            },
            {
                name: 'science - 8',
                fee: 1000,
            },
            {
                name: 'english - 8',
                fee: 1000,
            },
        ],
    };

    const EditPageProps = {
        data,
        currentUser,
        newTableItem,
        setCurrentUser,
        setItems,
        setNewTableItem,
        setTableItems,
        tableItems,
        setPreview,
        vat,
        setVat,
        discount,
        setDiscount,
    };

    const ViewPageProps = {
        currentUser,
        setPreview,
        tableItems,
        vat,
        discount,
    };

    useEffect(() => {
        const filteredValues = [];
        Object.values(subjects).forEach((values) => {
            filteredValues.push(
                ...values
                    .filter((obj) => items?.includes(obj.name))
                    .map((obj) => ({
                        id: new Date().getTime() * Math.floor(Math.random() * 1000),
                        ...obj,
                    }))
            );
        });
        setTableItems(filteredValues);
    }, [currentUser]);

    return (
        <div>{!preview ? <EditPage {...EditPageProps} /> : <ViewPage {...ViewPageProps} />}</div>
    );
};

export default Invoice;
