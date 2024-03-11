import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Header from './Header';

describe('Header tests', () => {
  test('Header render test', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
});