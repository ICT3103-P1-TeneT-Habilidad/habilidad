// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProvider } from './context/appContext'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <AppProvider>
            <App />
        </AppProvider>,
        div
    )
})
