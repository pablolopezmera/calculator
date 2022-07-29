import {evaluate} from "mathjs";

class Calculator {
  
  expressions: string[] = [];
  
  evaluate(expression: string): string {
    const regexp = /^[\d-+*./()]+$/;
    const isMathExpression = regexp.test(expression);

    if (!isMathExpression) return "Not a math expression";

    try {
      const result = parseFloat(evaluate(expression).toFixed(4)).toString();
      this.expressions.push(expression + " = " + result);
      return result;
    } catch (error) {
      let errorMessage = "Could not parse expression..."
      if (error instanceof Error) 
        errorMessage = error.message
      return errorMessage;
    }
  }
  
  clear() {
    this.expressions = [];
  }

  lastExpression(): any {
    return this.expressions[this.expressions.length-1] || "";
  }

}

export default Calculator;