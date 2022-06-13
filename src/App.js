import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Background from './components/Background/Background';
import Alert from './containers/Alert';
import { routes } from './routes';
import { store } from './store';
import './styles/font.css';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Background />
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))}
                </Routes>
                <Alert />
            </BrowserRouter>
        </Provider>
      );
}

export default App;
