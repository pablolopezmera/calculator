import React, { FC, useState } from "react";
import Calculator from "./Calculator";
import "./CalculatorScreen.css";
import logo from './logo.svg';

interface CalculatorProps {}

const calculator = new Calculator();

const CalculatorScreen: FC<CalculatorProps> = () => {

  const [calcExpr, setCalcExpr] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const resetCalc = () => {
    setCalcExpr("");
  };

  const updateCalcExpr = (symb: string) => {
    if (
      (ops.includes(symb) && calcExpr === "") ||
      (ops.includes(symb) && ops.includes(calcExpr.slice(-1)))
    ) {
      return;
    }

    setCalcExpr(calcExpr + symb);

  };

  const backspace = () => {
    if (calcExpr !== "") {
      setCalcExpr(calcExpr.slice(0, -1));
    }
  };

  const calculate = () => {
    const result = calculator.evaluate(calcExpr);
    setCalcExpr(result);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = /[^\d-+*/,.()\s]/g;
    setCalcExpr(event.target.value.replace(regexp, ""))
  }
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") {
      calculate();
    }
    if(event.key === "Escape") {
      resetCalc();
    }
  }

  return (
    <div className="Calculator" data-testid="Calculator">
      <div className="calc-body">
        <img src={logo} alt="Logo" className="logo" />
        <div className="calc-screen">
            <select multiple>
              {calculator.expressions.map((exp, index) => <option key={index}>{exp}</option> )}
            </select>
            <input value={calcExpr} onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>

        <div className="calc-button-row">
            <button className="ac"onClick={() => resetCalc()}>AC</button>
            <button className="opt" onClick={() => updateCalcExpr("(")}>(</button>
            <button className="opt" onClick={() => updateCalcExpr(")")}>)</button>
            <button className="opt"onClick={() => updateCalcExpr("/")}>/</button>
            <button onClick={() => updateCalcExpr("7")}>7</button>
            <button onClick={() => updateCalcExpr("8")}>8</button>
            <button onClick={() => updateCalcExpr("9")}>9</button>
            <button className="opt"onClick={() => updateCalcExpr("+")}>+</button>
            <button onClick={() => updateCalcExpr("4")}>4</button>
            <button onClick={() => updateCalcExpr("5")}>5</button>
            <button onClick={() => updateCalcExpr("6")}>6</button>
            <button className="opt"onClick={() => updateCalcExpr("*")}>*</button>
            <button onClick={() => updateCalcExpr("1")}>1</button>
            <button onClick={() => updateCalcExpr("2")}>2</button>
            <button onClick={() => updateCalcExpr("3")}>3</button>
            <button className="opt"onClick={() => updateCalcExpr("-")}>-</button>
            <button onClick={() => updateCalcExpr("0")}>0</button>
            <button onClick={() => updateCalcExpr(".")}>.</button>
            <button onClick={() => { backspace(); }}>&#9003;</button>
            <button className="opt"onClick={() => calculate()}>&#61;</button>
        </div>
      </div>

    </div>
  );
};

export default CalculatorScreen;
