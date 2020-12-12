import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Card from "@material-ui/core/Card/Card";
import { useStyles } from "../../../../styles";
import { TextareaAutosize } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { loadDataForNews } from "../../../../store/actions/Admin/News/AdminNewsActions";
import FormControl from "@material-ui/core/FormControl";
import { editSingleNews } from "../../../../store/actions/Admin/News/AdminNewsActions";


const EditNews = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const adminEditNews = useSelector(state => state.adminNews.adminEditNews);

    const [fields, setValues] = useState({
        title: '',
        body: '',
        category_id: '1',
        image: '',
        display_image: '',
    });

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(loadDataForNews(id))
                .then((result) => {
                    console.log('result here')
                    console.log(result);
                    console.log('return here');
                    setValues({
                        title: result.data.data.title,
                        body: result.data.data.body,
                        category_id: result.data.data.category_id,
                        image: result.data.data.image,
                        display_image: '',
                    });


                })
        return () => {
            document.getElementById('image').value = '';
        }

    }, [])

    const handleInputChange = (e) => {
        setValues({
            ...fields,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id
        dispatch(editSingleNews(fields, id))
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

    const getImageForDisplay = () => {
        if(fields.display_image == '') {
            return adminEditNews.data.file_directory + '/' + adminEditNews.data.data.image
        } else if(fields.display_image != '') {
            return fields.display_image;
        } else {
            return location.protocol + '//' + location.host + '/news_images/default-image-for-news.jpg';
        }
    }





    return (
        <div className="mt-5">
            <Card className="p-2 text-center">

                { adminEditNews
                    ?

                    <form onSubmit={handleSubmit} >
                        <div className="text-right">
                            <Button type="submit"
                                    style={{margin: 20}}
                                    variant="contained"
                                    color="primary"
                                    endIcon={<AccountCircleIcon/>}
                            >
                                <b>Edit News</b>
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
                                onChange={handleInputChange}
                                value={fields.title || ''}
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
                                    value={fields.body || ''}
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
                                    {/*{*/}
                                    {/*     fields.image == 'default-image-for-news.jpg'*/}
                                    {/*        ?  <img src={location.protocol + '//' + location.host + '/news_images/default-image-for-news.jpg'}  className="image-restyle"  />*/}
                                    {/*        : <img src={getImageForDisplay()} className="image-restyle" />*/}
                                    {/*}*/}
                                    <img src={getImageForDisplay()} className="image-restyle" />
                                    <input id="image" type="file" onChange={fileTransform} />
                                </FormControl>
                            </div>
                        </div>
                    </form>
                    : 'Loading...'
                }
            </Card>
        </div>
    );
};

export default EditNews
