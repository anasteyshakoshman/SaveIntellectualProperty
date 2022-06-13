import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
    ReactDOM.createRoot(
        document.getElementById('root')
    ).render(<App />);
};

renderApp();

if (module.hot) {
    module.hot.accept(renderApp);
}

