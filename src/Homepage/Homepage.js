import React, { useEffect, useState } from 'react'
import { Input, Card } from 'antd';
import DisplayTax from '../components/DisplayTax';

export default function Homepage() {

    const [allData, setAllData] = useState({ monthlyIncome: null, yearlyIncome: null, monthlyTax: null, salAfterTax: null, yearlyIncomeAfterTax: null, yearlyTax: null })
    const minimumIncome = 600000;

    const [myAdditionalTax] = useState({
        slab0: 0,
        slab1: 10000,
        slab2: 100000,
        slab3: 200000,
        slab4: 400000,
        slab5: 1000000,
        slab6: 2000000,
    })
    const [myTaxPercent] = useState({
        slab0: 0,
        slab1: 2.5,
        slab2: 12.5,
        slab3: 20,
        slab4: 25,
        slab5: 32.5,
        slab6: 35,
    })
    const [mySlabs] = useState({
        slab0: 0,
        slab1: 600000,
        slab2: 1200000,
        slab3: 2400000,
        slab4: 3600000,
        slab5: 6000000,
        slab6: 12000000
    })


    const calculateTax = () => {
        const yearlyIncome = allData.monthlyIncome * 12;

        const checkTax = (additTax, taxPercent, minIncome) => {
            const exceededAmount = yearlyIncome - minIncome;
            let yearlyTax = (exceededAmount / 100) * taxPercent;
            yearlyTax = Math.ceil(yearlyTax + additTax);
            const monthlyTax = Math.ceil(yearlyTax / 12);
            const salAfterTax = allData.monthlyIncome - monthlyTax;
            const yearlyIncomeAfterTax = yearlyIncome - yearlyTax;
            setAllData({ ...allData, yearlyIncome: yearlyIncome, yearlyTax: yearlyTax, monthlyTax: monthlyTax, salAfterTax: salAfterTax, yearlyIncomeAfterTax: yearlyIncomeAfterTax });
        }


        switch (true) {
            case (yearlyIncome > minimumIncome):
                switch (true) {
                    case (yearlyIncome > mySlabs.slab1):
                        checkTax(
                            myAdditionalTax.slab0,
                            myTaxPercent.slab1,
                            mySlabs.slab1);
                        break;
                    case (yearlyIncome > mySlabs.slab2):
                        checkTax(
                            myAdditionalTax.slab1,
                            myTaxPercent.slab2,
                            mySlabs.slab2);
                        break;
                    case (yearlyIncome > mySlabs.slab3):
                        checkTax(
                            myAdditionalTax.slab2,
                            myTaxPercent.slab3,
                            mySlabs.slab3);
                        break;
                    case (yearlyIncome > mySlabs.slab4):
                        checkTax(
                            myAdditionalTax.slab3,
                            myTaxPercent.slab4,
                            mySlabs.slab4);
                        break;
                    case (yearlyIncome > mySlabs.slab5):
                        checkTax(
                            myAdditionalTax.slab4,
                            myTaxPercent.slab5,
                            mySlabs.slab5);
                        break;

                    default:
                        checkTax(
                            myAdditionalTax.slab6,
                            myTaxPercent.slab6,
                            mySlabs.slab6);
                        break;
                }
                break;

            default:
                checkTax(myAdditionalTax.slab0, myTaxPercent.slab0, mySlabs.slab0);
                break;
        }

    }

    const numbersOnly = /^[0-9\b]*$/;
    const handleChange = (e) => {
        if (numbersOnly.test(e.target.value)) {
            setAllData({ ...allData, monthlyIncome: e.target.value })
        }
    }

    useEffect(() => {
        calculateTax();
    }, [allData.monthlyIncome])


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
                        maxLength={11}
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
        </div >
    )
}
