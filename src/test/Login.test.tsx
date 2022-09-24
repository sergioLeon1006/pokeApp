import React from 'react';
import { render, screen } from '@testing-library/react';
import {Login} from '../components';

describe('first test', () => {
  it('should show te email input', () => {
    render(<Login></Login>)
    expect(screen.getByText(/email/i)).toBeInTheDocument()
  })
  it('should show te password input', () => {
    render(<Login></Login>)
    expect(screen.getByText('Password')).toBeInTheDocument()
  })
});