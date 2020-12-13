import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Card from "@material-ui/core/Card/Card";
import { useStyles } from "../../../../styles";
import { TextareaAutosize } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from "../../../../store/actions/Admin/News/AdminNewsActions";
import FormControl from "@material-ui/core/FormControl";

const AddNews = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const adminAddNews = useSelector(state => state.adminNews.adminAddNews);

    console.log('adminAddNews in addnews.js here')
    console.log(adminAddNews)

    const [fields, setValues] = useState({
        title: '',
        body: '',
        category_id: '1',
        image: '',
        display_image: '',
    });

    const handleInputChange = (e) => {
        setValues({
            ...fields,
            [e.target.id]: e.target.value
        });
    }

    const createNewNews = (e) => {
        e.preventDefault();
        dispatch(addNews(fields))
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const fileTransform = (e) => {
        getBase64(e.target.files[0], (base64String) => {
            setValues({
                ...fields,
                image: base64String
            });
        })
        onImageChangeDisplayImage(e);
    }

    const onImageChangeDisplayImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setValues({...fields, display_image: e.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const displayMessage = () => {
        let divForMessages = document.getElementById('div-for-messages');
        divForMessages.innerHTML = '';
        if(adminAddNews.data != '' && typeof adminAddNews.data !== 'undefined' && adminAddNews.data.success == true) {
            divForMessages.innerHTML += '<div class="alert alert-success p-2 border-radius-5px">' + adminAddNews.data.message +  '</div>';
        } else if(adminAddNews.data != '' && typeof adminAddNews.data !== 'undefined' && adminAddNews.data.success == false) {
            if(typeof adminAddNews.data.message == "string") {
                divForMessages.innerHTML += '<div class="alert alert-danger p-2 border-radius-5px">' + adminAddNews.data.message +  '</div>';
            }
        }
    }

    return (
        <div className="mt-5">
            <Card className="p-2 text-center">

                <div id="div-for-messages"></div>
                { adminAddNews ?  displayMessage(adminAddNews) : '' }

                <form onSubmit={createNewNews}>
                    <div className="row">
                        <div className="text-left col-6">
                            <Button
                                style={{margin: 20}}
                                onClick={() => { props.history.goBack() }}
                            >
                                <b>Go Back</b>
                            </Button>
                        </div>
                        <div className="text-right col-6">
                            <Button type="submit"
                                    style={{margin: 20}}
                                    variant="contained"
                                    color="primary"
                            >
                                <b>Add News</b>
                            </Button>
                        </div>
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
                            onChange={handleInputChange}
                            value={fields.title}
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
                                onChange={handleInputChange}
                                value={fields.body}
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
                                id="category_id"
                                value="1"
                                disabled
                            />
                        </div>
                        <div style={{ margin:  53, justifyContent: 'center', maxWidth:1000, textAlign: 'left', }}>
                            <FormControl>
                                <img src={fields.display_image}  className="image-restyle"  />
                                <input id="image" type="file" onChange={fileTransform} />
                            </FormControl>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddNews
