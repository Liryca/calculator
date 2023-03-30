import React from "react";
import { useState, useEffect } from "react";
import "./Total.scss";
import config from "../data/config.json";
import data from "../data/data.json";

const Total = ({ userData, setBasket }) => {

    const [active, setActive] = useState(true);
    const [area, setArea] = useState(0);
    const [cell, setCell] = useState(0);
    const [lumpSum, setLumpSum] = useState(0);
    const [totalFix, setTotalFix] = useState({});
    const [totalPipe, setTotalPipe] = useState({});
    const [totalList, setTotalList] = useState({
        name: 'Лист-1 0.5 ширина 1.8м',
        amount: 0,
        unit: "",
        sum: 0,
    });

    useEffect(() => {

        if (totalFix.sum && totalPipe.sum&& totalList.sum) {   
            let sum = totalFix.sum + totalPipe.sum + totalList.sum;
            setLumpSum(sum);
        }


    }, [totalFix, totalList, totalPipe])




    function addBasket() {

        setBasket((prev) => {
            return [
                ...prev,
                totalFix,
                totalPipe,
                totalList
            ]
        })



    }

    function sumList() {

        const totalArea = Number(userData.width) * Number(userData.length);
        setArea(totalArea);

        for (let item of data) {
            if (item.name === userData.material) {
                setActive(false);
                const amount = totalArea / item.width;
                const sum = amount * item.price;

                setTotalList((prev) => {
                    return {
                        ...prev,
                        name: item.name,
                        unit: item.unit,
                        amount: Math.ceil(amount),
                        sum: Math.round(sum),
                    };
                });
            }

            for (let fix of config) {
                if (fix.key === item.material && fix.type === 'fix' && item.name === userData.material) {
                    const value = fix.value * Math.ceil(totalArea / item.width);
                    for (let i of data)
                        if (i.type === 'fix') {
                            const sum = value * i.price
                            setTotalFix((prev) => {
                                return {
                                    ...prev,
                                    name: i.name,
                                    unit: i.unit,
                                    sum: Math.round(sum),
                                    amount: Math.ceil(value),
                                }
                            })
                        }
                }
            }

            if (item.name === userData.tube) {
                for (let elem of config) {
                    if (elem.name === userData.strength) {
                        const pipeLength =
                            (Number(userData.width) / elem.step + item.width / 1000) * Number(userData.length) +
                            (Number(userData.length) / elem.step + item.width / 1000) * Number(userData.width);

                        const sum = pipeLength * item.price;

                        setCell(elem.step + item.width / 1000)

                        setTotalPipe((prev) => {
                            return {
                                ...prev,
                                name: item.name,
                                unit: item.unit,
                                sum: Math.round(sum),
                                amount: Math.ceil(pipeLength),
                            };
                        });
                    }
                }
            }
        }

    }
    return (
        <div className="total">
            <button className="total__button" onClick={sumList}>
                Рассчитать
            </button>
            <div className={active ? "total__content" : "total__content_active"}>
                <p>Площадь изделия: {area} m2</p>
                <p className="total__info">Расчетный размер ячейки: {cell}x{cell}</p>
                <table className="total__table">
                    <thead>
                        <tr className="table__row">
                            <th className="table__column">Наименование</th>
                            <th className="table__column">ед.</th>
                            <th className="table__column">кол-во</th>
                            <th className="table__column">сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table__row">
                            <td className="table__column">{totalList.name}</td>
                            <td className="table__column">{totalList.unit}</td>
                            <td className="table__column">{totalList.amount}</td>
                            <td className="table__column">{totalList.sum}</td>
                        </tr>
                        <tr className="table__row">
                            <td className="table__column">{totalPipe.name}</td>
                            <td className="table__column">{totalPipe.unit}</td>
                            <td className="table__column">{totalPipe.amount}</td>
                            <td className="table__column">{totalPipe.sum}</td>
                        </tr>
                        <tr className="table__row">
                            <td className="table__column">{totalFix.name}</td>
                            <td className="table__column">{totalFix.unit}</td>
                            <td className="table__column">{totalFix.amount}</td>
                            <td className="table__column">{totalFix.sum}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="total__lump-sum"> Итого: {lumpSum}</p>
                <button
                    className="total__card-button"
                    type="button"
                    onClick={addBasket}
                >
                    Добавить в корзину
                </button>
            </div>

        </div>
    );
};

export default Total;
