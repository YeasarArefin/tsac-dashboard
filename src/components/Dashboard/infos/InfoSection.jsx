import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useSWR from 'swr';
import { getFetcher } from '../../../utils/functions/fetcher';
import BarChart from '../charts/BarChart';
import InfoCard from './InfoCard';

export default function InfoSection() {
    const { data } = useSWR('https://tsac.onrender.com/api/v1/dashboard', getFetcher);
    return (
        <section className="mb-20">
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
                <InfoCard data={data?.income} name="Income" icon={<TbCurrencyTaka />} />
                <InfoCard data={data?.expenditure} name="Expenditure" icon={<TbCurrencyTaka />} />
                <InfoCard data={data?.net} name="Net Income" icon={<TbCurrencyTaka />} />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <InfoCard data={data?.teachers} name="Teachers" icon={<FaChalkboardTeacher />} />
                <InfoCard data={data?.students} name="Students" icon={<BsPeople />} />
            </div>
            <div className="mt-10 grid gap-5 grid-cols-1 lg:grid-cols-2">
                <BarChart chartData={data?.monthlyChart} title="Monthly" type="month" />
                <BarChart chartData={data?.yearlyChart} title="Yearly" type="year" />
                {/* <YearlyChart chartData={data?.yearlyChart} title="Yearly" /> */}
            </div>
        </section>
    );
}
