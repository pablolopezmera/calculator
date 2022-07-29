import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalculatorScreen from './CalculatorScreen';

describe('<Calculator />', () => {
  it('should render operators', () => {
    render(<CalculatorScreen />);

    const buttons = ["AC", "+", "-", "*", "/", "(", ")", String.fromCharCode(9003)];

    buttons.forEach((n) => {
      expect(screen.getByText(n.toString())).toBeInTheDocument();
    });
  });

  it('should render numbers', () => {
    render(<CalculatorScreen />);

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((n) => {
      expect(screen.getByText(n.toString())).toBeInTheDocument();
    });
  });

});