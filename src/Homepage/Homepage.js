import React, { useEffect, useState } from 'react'
import { Input, Card } from 'antd';
import DisplayTax from '../components/DisplayTax';

export default function Homepage() {

    const [allData, setAllData] = useState({ monthlyIncome: null, yearlyIncome: null, monthlyTax: null, salAfterTax: null, yearlyIncomeAfterTax: null, yearlyTax: null })

    const calculateTax = () => {

        const minIncome = 600000;
        const slab0 = 600000;
        const slab1 = 1200000;
        const slab2 = 2400000;
        const slab3 = 3600000;
        const slab4 = 6000000;
        const slab5 = 12000000;

        const yearlyIncome = allData.monthlyIncome * 12;

        const checkTax = (additTax, taxPercent, minIncome) => {
            const exceededAmount = yearlyIncome - minIncome;
            let yearlyTax = (exceededAmount / 100) * taxPercent;
            yearlyTax = yearlyTax + additTax;
            const monthlyTax = yearlyTax / 12;
            const salAfterTax = allData.monthlyIncome - monthlyTax;
            const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
            setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
        }

        if (yearlyIncome > minIncome) {

            if (yearlyIncome < slab1) {
                const minIncome = slab0;
                checkTax(0, 2.5, minIncome);
            }
            else if (yearlyIncome < slab2) {
                const minIncome = slab1;
                checkTax(15000, 12.5, minIncome);
            }
            else if (yearlyIncome < slab3) {
                const minIncome = slab2;
                checkTax(165000, 20, minIncome);
            }
            else if (yearlyIncome < slab4) {
                const minIncome = slab3;
                checkTax(405000, 25, minIncome);
            }
            else if (yearlyIncome < slab5) {
                const minIncome = slab4;
                checkTax(1005000, 32, minIncome);
            } else {
                const minIncome = slab5;
                checkTax(2955000, 35, minIncome);
            }

        } else {
            const minIncome = slab0;
            checkTax(0, 0, minIncome);
        }

    }


    const handleChange = (e) => {
        setAllData({ ...allData, monthlyIncome: e.target.value })
    }

    useEffect(() => {
        calculateTax();
    }, [handleChange])

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand text-center w-100" href="./"><h2 className='mb-0'>Tax Calculator</h2></a>
                </div>
            </nav>
            <br />
            <br />
            <div className='container'>
                <Card style={{ width: "100%", height: "100%" }}>
                    <Input
                        style={{ width: '100%' }}
                        type={'text'}
                        prefix="Enter your Monthly Income | "
                        placeholder='Your Monthly Salary'
                        value={allData.monthlyIncome}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <ul className="list-group">
                        <DisplayTax title={"Monthly Income"} val={allData.monthlyIncome} />
                        <DisplayTax title={"Monthly Tax"} val={allData.monthlyTax} />
                        <DisplayTax title={"Salary After Tax"} val={allData.salAfterTax} />
                        <DisplayTax title={"Yearly Income"} val={allData.yearlyIncome} />
                        <DisplayTax title={"Yearly Tax"} val={allData.yearlyTax} />
                        <DisplayTax title={"Yearly Income After Tax"} val={allData.yearlyIncomeAfterTax} />
                    </ul>
                </Card>
            </div>
        </div>
    )
}
