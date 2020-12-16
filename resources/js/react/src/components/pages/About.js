import React from 'react';

const About = () => {
    return (
        <div>

            <div className="mt-5">
                <h3>This is demo application</h3>
                <h5 className="mt-5">The following tehnologies are used</h5>
                <p>Docker, PHP7.3, Maria-DB10.1, Laravel8.17.2 <br />
                   React(react-router, redux, jwt, react-hook-form, rc-pagination)</p>
                <p>
                    You can register in the Register page, login in the Login page, and you can create, update, delete news that are going to be displayed on the home page<br />
                    You can also login with user zoran@test.com, password 123456.
                </p>
            </div>
        </div>
    );
};

export default About
