import 'resize-observer-polyfill';
import React from 'react';
import { render, screen, waitFor, fireEvent  } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import '@testing-library/jest-dom';
import GeneralData from '../components/generalData';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));




describe('GeneralData', () => {
  test('renders with initial values', () => {
    render(<GeneralData />);
    expect(screen.getByText("5'126'522'292")).toBeInTheDocument();

    // Add your assertions here
  });

  test('updates values on input change', async () => {
    render(<GeneralData />);
  
    // Simulate input change
    const lockedInput = screen.getByTestId('locked-input') as HTMLInputElement;
    userEvent.type(lockedInput, '100');
  
    // Convert the input value to a number
    const inputValue = lockedInput.getAttribute('value');
  
    // Assert updated values
    
    expect(screen.getByText("5'126'522'292")).toBeInTheDocument();
    expect(inputValue).toBe('100');
    const rewardsNumberElement = screen.getByTestId('reward-number') as HTMLElement;
    expect(rewardsNumberElement).toHaveTextContent('150');
    await waitFor(() => {
      const rewardsPercentElement = screen.getByTestId('percent-gain') as HTMLElement;
      expect(rewardsPercentElement).toHaveTextContent('50%');
    })



  });

  test('updates percentage on slider change', async () => {
    render(<GeneralData />);
    const lockedInputForPercent = screen.getByTestId('locked-input') as HTMLInputElement;
    userEvent.type(lockedInputForPercent, '100');
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 5 } });
  
    // Wait for the updated percentage value
    await waitFor(() => {
      expect(screen.getByTestId('percent-gain')).toHaveTextContent('125%');
    });
    const rewardsNumberElementForPercent = screen.getByTestId('reward-number') as HTMLElement;
    expect(rewardsNumberElementForPercent).toHaveTextContent('225');
  });
  // Add more tests as needed
});
