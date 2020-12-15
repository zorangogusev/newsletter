import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getAllNews, getNewsForHomePage} from "../../store/actions/Admin/News/AdminNewsActions";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "../../styles";
import Pagination from "rc-pagination";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();

    const adminNewsResponse = useSelector(state => state.adminNews.adminNewsResponse);

    const classes = useStyles();

    useEffect(() => {
        console.log('useEffect her')
        let page = '';
        dispatch(getNewsForHomePage(page))
    }, []);

    console.log('adminNewsResponse here');
    console.log(adminNewsResponse);

    const paginateContent = (currentPage) => {
        dispatch(getNewsForHomePage(currentPage))
    }


    const createNewsBodyForCard = (body, maxLength) => {
        let trimmedString = body.substr(0, maxLength);
        if(body.length > trimmedString.length){
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
        }
        return trimmedString + '...';
    }

    const createNewsCards = () => {
        if(!adminNewsResponse) {
            return 'Loading...'
        }

        return adminNewsResponse.data.data.map((news) => (

            <div key={news.id} className="home-page-div-for-card">
                <Link to={`view-news/${news.id}`}>
                    <Card className={classes.root} style={{  margin: 'auto'}}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={adminNewsResponse.file_directory + '/' + news.image}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {news.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    { createNewsBodyForCard(news.body, 124) }
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
                </Link>
            </div>


        ));
    }

    return (
        <div>
            <h4 className="text-center mt-5">Home page</h4>
            <div id="home-main-div" style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                { createNewsCards() }
            </div>

            <div className="clearfix"></div>

            {adminNewsResponse
                ?
                <Pagination
                    showTitle={false}
                    defaultPageSize={9}
                    tooltip={''}
                    current={adminNewsResponse.data.current_page}
                    total={adminNewsResponse.data.total}
                    onChange={paginateContent}
                    className="pagination-restyle"
                    prevIcon={<ArrowBackIosIcon/>}
                    jumpPrevIcon={<ArrowBackIcon/>}
                    jumpNextIcon={<ArrowForwardIcon/>}
                    nextIcon={<ArrowForwardIosIcon/>}
                />
                : null
            }

        </div>
    );
};

export default Home
