import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('AboutUs tests', () => {
  test('AboutUs render test', () => {
    const { getByTestId } = render(<AboutUs />);
    const aboutUsElement = getByTestId('aboutUs');
    expect(aboutUsElement).toBeInTheDocument();
  });
});