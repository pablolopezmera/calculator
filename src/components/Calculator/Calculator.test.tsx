import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';

describe('Calculations', () => {

  it('should support empty expression', () => {
    const calculator = new Calculator();
    calculator.evaluate("");

    expect(calculator.expressions.length).toEqual(0);

  });

  it('should add two values', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("1+2");

    expect(result).toEqual("3");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should clear list', () => {
    const calculator = new Calculator();
    calculator.evaluate("1+2");
    
    calculator.clear();

    expect(calculator.expressions.length).toEqual(0);
  });

  it('malformed expression should return error', () => {
    const calculator = new Calculator();

    const result = calculator.evaluate("1(2");
    
    expect(calculator.expressions.length).toEqual(0);
    expect(result).toEqual("Parenthesis ) expected (char 4)");
  });

  it('should avoid security risk', () => {
    const calculator = new Calculator();

    const result = calculator.evaluate("exec");
    
    expect(calculator.expressions.length).toEqual(0);
    expect(result).toEqual("Not a math expression");
  });

  it('should respect order precedence', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("1+2*2");

    expect(result).toEqual("5");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should handle 0 division', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("1/0");

    expect(result).toEqual("Infinity");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should handle parenthesis expressin', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("(1+8)*3");

    expect(result).toEqual("27");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should handle complex expression', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("1/4*12/(1-6)-7/12");

    expect(result).toEqual("-1.1833");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should support decimal values', () => {
    const calculator = new Calculator();
    const result = calculator.evaluate("1.5-2.3");

    expect(result).toEqual("-0.8");
    expect(calculator.expressions.length).toEqual(1);

  });

  it('should presserve expressions', () => {
    const calculator = new Calculator();
    calculator.evaluate("1");
    calculator.evaluate("2");
    calculator.evaluate("3-1");

    expect(calculator.expressions.length).toEqual(3);
    expect(calculator.lastExpression()).toEqual("3-1 = 2");

  });

});