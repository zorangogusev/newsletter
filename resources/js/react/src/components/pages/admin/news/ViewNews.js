import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNewsForViewNewsPage } from "../../../../store/actions/Admin/News/AdminNewsActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card/Card";
import {useStyles} from "../../../../styles";

const ViewNews = (props) => {

    const dispatch = useDispatch();

    const viewNews = useSelector(state => state.adminNews.viewNews);

    const classes = useStyles();

    console.log('viewNews :')
    console.log(viewNews)
    useEffect(() => {
        console.log('props are:')
        console.log(props)
        let id = props.match.params.id;
        dispatch(getNewsForViewNewsPage(id));

        return () => {
            dispatch({type: 'RESET_VIEW_NEWS'});
        }

    }, [])


    return (
        <div id="view-news-page">
            <h4>View News</h4>
            { viewNews
                ?
                <Card className={classes.root} style={{  margin: 'auto', width: '100%'}}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={viewNews.file_directory + '/' + viewNews.data.data[0].image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography className="text-center" gutterBottom variant="h2" component="h2">
                                <h2>{viewNews.data.data[0].title}</h2>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                { viewNews.data.data[0].body }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>


                : 'Loading...' }

        </div>
    )
}

export default ViewNews;
