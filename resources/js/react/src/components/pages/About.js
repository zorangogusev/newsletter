import React from 'react';

const About = () => {
    return (
        <div>
            <h4 className>This is About page</h4>
            <div>
                <p>This app is still in development.</p><br />

                <p>The following tehnologies are used:<br />
                    Docker, PHP7.3, Maria-DB10.1, Laravel8.0, React(react-router, redux, jwt)</p>
                <p>
                    You can register in the Register page, login in the Login page, and you can create, update, delete news that are going to be displayed on the home page<br />
                    You can also login with user zoran@test.com, password 123456.
                </p>
                </div>
        </div>
    );
};

export default About
