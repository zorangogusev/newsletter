import React from 'react';
import ReactDOM from 'react-dom'
import MasterPage from "./components/MasterPage";

const App = () => {
    return (
        <div className="container">
            <MasterPage />
        </div>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
