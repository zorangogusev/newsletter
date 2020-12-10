import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card/Card";
import {useStyles} from "../../../../styles";
import {TextareaAutosize} from "@material-ui/core";

const AddNews = (props) => {

    const classes = useStyles();

    const createNewNews = (e) => {

    }

    const fileTransform = () => {

    }

    return (
        <div className="mt-5">
            <Card className="p-2 text-center">
                <form onSubmit={createNewNews}>
                    <div className="text-right">
                        <Button type="submit"
                                style={{margin: 20}}
                                variant="contained"
                                color="primary"
                                endIcon={<AccountCircleIcon/>}
                        >
                            <b>Add News</b>
                        </Button>
                    </div>
                    <div>
                        <TextField
                            type="text"
                            className={classes.fullWidth}
                            required
                            margin="normal"
                            variant="outlined"
                            label="Title"
                            id="title"
                        />
                    </div>
                    <div>
                        <div>
                            <TextareaAutosize
                                className={classes.fullWidth}
                                rows="25"
                                required
                                margin="normal"
                                id="body"
                            />
                        </div>
                        <div>
                            <TextField
                                className={classes.fullWidth}
                                label="Category"
                                type="text"
                                required
                                margin="normal"
                                variant="outlined"
                                id="category"
                                value="1"
                                disabled
                            />
                        </div>
                        <input id="file" type="file" onChange={fileTransform} />


                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddNews
