import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from "../../../../styles";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { AdminRegisterAction, resetAdminAuthResponseAction } from "../../../../store/actions/Admin/Auth/AdminAuthActions";

const Register = (props) => {

    const dispatch = useDispatch();

    const adminAuthResponse = useSelector(state => state.adminAuth.adminAuthResponse);

    const classes = useStyles();

    const [inputFields, setValues] = useState({firstname:'', lastname:'', email:'', password:''});

    useEffect(() => {
        dispatch(resetAdminAuthResponseAction())
    })

    const handleInputChange = (e) => {
        // console.log('handleInputChange here')
        setValues({
            ...inputFields,
            [e.target.id]: e.target.value
        })
    }

    const adminRegister = (e) => {
        e.preventDefault();
        // console.log('adminRegister here');
        dispatch(AdminRegisterAction(inputFields, props))
    }

    const displayMessage = (adminAuthResponse) => {
        let divForMessages = document.querySelector('.div-for-messages');
        divForMessages.innerHTML = '';

        if(typeof adminAuthResponse == 'string') {
            divForMessages.innerHTML = '<div class="alert alert-success p-2 border-radius-5px">' + adminAuthResponse + '</div>';
        }

        if(adminAuthResponse.data != '' && typeof adminAuthResponse.data !== 'undefined' && adminAuthResponse.data.success == true) {
            console.log('displayMessage success == true here')

        } else if(adminAuthResponse.data != '' && typeof adminAuthResponse.data !== 'undefined' && adminAuthResponse.data.success == false) {

            if(typeof adminAuthResponse.data.message == "object") {
                for(let message in adminAuthResponse.data.message) {
                    // console.log(`${message}: ${(adminAuthResponse.data.message[message])}`)
                    divForMessages.innerHTML += '<div class="alert alert-danger p-2 border-radius-5px">' + adminAuthResponse.data.message[message] +  '</div>';
                }
            } else if(typeof adminAuthResponse.data.message == "string") {
                divForMessages.innerHTML += '<div class="alert alert-danger p-2 border-radius-5px">' + adminAuthResponse.data.message +  '</div>';
            }
        }
    }

    return (
        <div>
            <div className="margin-top-div-login">
                <Card className="p-2 text-center">
                    <h2 className="my-5"><b>Welcome to Admin Register</b></h2>

                    { adminAuthResponse != '' && typeof adminAuthResponse != null ?  displayMessage(adminAuthResponse) : ''}
                    <div className="div-for-messages"></div>

                    <form onSubmit={adminRegister}>
                        <div>
                            <TextField
                                type="text"
                                className={classes.fullWidth}
                                required
                                margin="normal"
                                variant="outlined"
                                label="First Name"
                                id="firstname"
                                onChange={handleInputChange}
                                value={inputFields.firstname}
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                className={classes.fullWidth}
                                required
                                margin="normal"
                                variant="outlined"
                                label="Last Name"
                                id="lastname"
                                onChange={handleInputChange}
                                value={inputFields.lastname}
                            />
                        </div>
                        <div>
                            <TextField
                                type="email"
                                className={classes.fullWidth}
                                required
                                margin="normal"
                                variant="outlined"
                                label="email"
                                id="email"
                                onChange={handleInputChange}
                                value={inputFields.email}
                            />
                        </div>
                        <div>
                            <div>
                                <TextField
                                    className={classes.fullWidth}
                                    label="Password"
                                    type="password"
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    id="password"
                                    onChange={handleInputChange}
                                    value={inputFields.password}
                                />
                            </div>
                            <div>
                                <Button type="submit"
                                        className={classes.fullWidth}
                                        style={{margin: 20}}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<AccountCircleIcon/>}
                                >
                                    <b>Login</b>
                                </Button>
                                <br/>
                                <div className={classes.linkContainer} style={{ textAlign: 'center', marginBottom: 0, }}>
                                    <Link  to="/login">Login Here</Link>
                                </div>
                                <div className={classes.linkContainer} style={{ textAlign: 'center' }}>
                                    <Link  to="/">Back To Home Page </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register
