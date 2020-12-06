import React from 'react';
import ReactDOM from 'react-dom'
import MasterPage from "./components/layouts/MasterPage";
import { store } from "./createStore";
import { Provider } from 'react-redux';

const App = () => {
    return (
        <div className="container">
            <MasterPage />
        </div>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'));
}
