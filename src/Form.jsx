import React from "react";
import "./Form.css";
import { useState } from 'react';


function Form() {

    const [inputVal, setInputVal] = useState("");
    const [operation, setOperation] = useState("");
    const [add, setSum] = useState("");
    let isNan = false;

    const performResult = (e) => {
        e.preventDefault();

        const arr = inputVal.split(",").map((a) => {

            if (Number.isNaN(Number(a))) {
                isNan = true;

            } else {
                return Number(a);
            }
        });
        if (isNan) {
            setSum("Invalid input.");
            return;
        }


        let totalVal = arr.reduce((t, a) => { return t + a }, 0)
        if (operation == "sum") {
            setSum(totalVal);

        } else if (operation == "average") {
            setSum(totalVal / arr.length);

        } else if (operation == "mode") {
            let map1 = new Map();
            arr.forEach((a) => {
                if (map1.has(a)) {
                    map1.set(a, map1.get(a) + 1);
                } else {
                    map1.set(a, 1);
                }
            })
            let map2 = new Map([...map1.entries()].sort((a, b) => b[1] - a[1]));
            setSum(`The number ${Array.from(map2)[0][0]} appears ${Array.from(map2)[0][1]} times`);

        } else {
            setSum("Invalid input.");
            return;
        }
        setInputVal("");

    };

    return (
        <>
            <form onSubmit={performResult}>
                <input id="values" name="values" type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                <select id="operation" name="operation" value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value=""></option>
                    <option value="sum">sum</option>
                    <option value="average">average</option>
                    <option value="mode">mode</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            <section id="result">
                <p>{add}</p>
            </section>
        </>
    );
}

export default Form;
