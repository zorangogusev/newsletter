import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from "../../../../styles";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLoginAction } from "../../../../store/actions/Admin/Auth/AdminAuthActions";

const Login = (props) => {

    const dispatch = useDispatch();

    const [inputFields, setValues] = useState({email:'', password:''});

    const classes = useStyles();

    const handleInputChange = (e) => {
        console.log('handleInputChange here')
        console.log(e.target.value)
            setValues({
                ...inputFields,
                [e.target.id]: e.target.value
            })
    }

    const adminLogin = (e) => {
        e.preventDefault();
        console.log('adminLogin here');
        console.log(props);

        dispatch(AdminLoginAction(inputFields, props));
    }

    return (
        <div>
            <div className="margin-top-div-login">
                <Card className="p-2 text-center">
                    <h2 className="my-5"><b>Welcome to Admin Login</b></h2>
                    <form onSubmit={adminLogin}>
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
                                    <Link  to="/register">Register Here</Link>
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

export default Login
