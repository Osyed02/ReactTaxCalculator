import React, { useState } from 'react'
import { Input, Card, message } from 'antd';
import DisplayTax from '../components/DisplayTax';

export default function Homepage() {

    const [allData, setAllData] = useState({ monthlyIncome: null, yearlyIncome: null, monthlyTax: null, salAfterTax: null, yearlyIncomeAfterTax: null, yearlyTax: null })

    const calculateTax = () => {

        const minIncome = 600000;
        const slab1 = 1200000;
        const slab2 = 2400000;
        const slab3 = 3600000;
        const slab4 = 6000000;
        const slab5 = 12000000;

        const yearlyIncome = allData.monthlyIncome * 12;

        if (yearlyIncome > minIncome) {

            if (yearlyIncome < slab1) {
                const additTax = 0;
                const taxPercent = 2.5;
                const exceededAmount = yearlyIncome - minIncome;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            }
            else if (yearlyIncome < slab2) {
                const additTax = 15000;
                const taxPercent = 12.5;
                const exceededAmount = yearlyIncome - slab1;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            }
            else if (yearlyIncome < slab3) {
                const additTax = 165000;
                const taxPercent = 20;
                const exceededAmount = yearlyIncome - slab2;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            }
            else if (yearlyIncome < slab4) {
                const additTax = 405000;
                const taxPercent = 25;
                const exceededAmount = yearlyIncome - slab3;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            }
            else if (yearlyIncome < slab5) {
                const additTax = 1005000;
                const taxPercent = 32;
                const exceededAmount = yearlyIncome - slab4;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            } else {
                const additTax = 2955000;
                const taxPercent = 35;
                const exceededAmount = yearlyIncome - slab5;
                let yearlyTax = (exceededAmount / 100) * taxPercent;
                yearlyTax = yearlyTax + additTax;
                const monthlyTax = yearlyTax / 12;
                const salAfterTax = allData.monthlyIncome - monthlyTax;
                const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
                setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            }

        } else {
            const additTax = 0;
            const taxPercent = 0;
            const exceededAmount = yearlyIncome - minIncome;
            let yearlyTax = (exceededAmount / 100) * taxPercent;
            yearlyTax = yearlyTax + additTax;
            const monthlyTax = yearlyTax / 12;
            const salAfterTax = allData.monthlyIncome - monthlyTax;
            const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
            setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
            message.error('To pay Tax, Minimum yearly Income must be more than 60,0000');
        }




    }
    const btnCalc = () => {
        return (
            <button onClick={calculateTax} className='btn btn-outline-dark shadow-none'>Check</button>
        )
    }

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
                        suffix={btnCalc()}
                        placeholder='Your Monthly Salary'
                        value={allData.monthlyIncome}
                        onChange={e => setAllData({ ...allData, monthlyIncome: e.target.value })}
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
