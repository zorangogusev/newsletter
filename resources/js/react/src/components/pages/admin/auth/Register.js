import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from "../../../../styles";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { AdminRegisterAction } from "../../../../store/actions/Admin/Auth/AdminAuthActions";

const Register = (props) => {

    const dispatch = useDispatch();

    const classes = useStyles();

    const [inputFields, setValues] = useState({firstname:'', lastname:'', email:'', password:''});

    const handleInputChange = (e) => {
        console.log('handleInputChange here')
        setValues({
            ...inputFields,
            [e.target.id]: e.target.value
        })
    }

    const adminRegister = (e) => {
        e.preventDefault();
        console.log('adminRegister here');
        dispatch(AdminRegisterAction(inputFields, props))
    }

    return (
        <div>
            <div className="margin-top-div-login">
                <Card className="p-2 text-center">
                    <h2 className="my-5"><b>Welcome to Admin Register</b></h2>
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
                                    required
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
