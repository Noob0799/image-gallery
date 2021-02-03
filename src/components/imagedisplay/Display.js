import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Navbar from '../navbar/Navbar';
import Axios from 'axios';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: '5vh 5vw',
        margin: '2vh 5vw'
      },
      gridList: {
        width: '100vw',
      },
      tile: {
          height: '20vh'
      },
      searchbar: {
        margin: '2vh 5vw'
      },
      searchroot: {
        backgroundColor: "white",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '5px solid orange',
              borderRadius: "0",
              boxShadow: "0px 0px 10px orange"
            },
            '&:hover fieldset': {
                border: '5px solid orange',
                borderRadius: "0",
              },
            '&.Mui-focused fieldset': {
              border: '5px solid orange',
              borderRadius: "0",
            },
        },
    },
    popupIndicatorOpen: {
        transform: "scaleX(1)"
    },
    paper: {
        marginTop: "0",
        border: "5px solid orange",
        backgroundColor: "black",
        color: "orange",
        borderRadius: "0",
    },
    option: {
        borderBottom: "2px solid orange",
        padding: "10px"
    }
});

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayData: [],
            date: new Date().toLocaleString(),
            name: '',
            image: ''
        }
    }

    componentDidMount() {
        let displayData = [];
        const token = sessionStorage.getItem('token');
        const tokenString = `Bearer ${token}`;
        Axios.get('http://localhost:5000/image/get',{ headers: { Authorization: tokenString } })
            .then(res => {
                console.log(res.data.message);
                displayData = [...res.data.displayData];
                this.setState({
                    data: [...displayData],
                    displayData: [...displayData]
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSearch = (event,name) => {
        console.log(name);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }

    render() {
        const { classes } = this.props;
        const getGridListCols = () => {
            if (isWidthUp('xl', this.props.width)) {
                return 5;
            }
            if (isWidthUp('lg', this.props.width)) {
              return 4;
            }
            if (isWidthUp('md', this.props.width)) {
              return 3;
            }
            if (isWidthUp('sm', this.props.width)) {
              return 2;
            }
            return 1;
        }
        let element = <h2>You have to login first...</h2>
        if(sessionStorage.getItem('token')) {
            element = (
                <Fragment>
                    <div className={classes.searchbar}>
                        <Autocomplete
                            freeSolo
                            id="autocomplete"
                            disableClearable
                            options={this.state.data.map((option) => option.imagename)}
                            classes={{
                                popupIndicator: classes.popupIndicator,
                                clearIndicator: classes.clearIndicator,
                                popupIndicatorOpen: classes.popupIndicatorOpen,
                                paper: classes.paper,
                                option: classes.option,
                            }}
                            onChange={(event,value) => {
                                this.handleSearch(event,value);
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search image name..."
                                margin="normal"
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                classes={{
                                    root: classes.searchroot,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                }}
                                // onKeyUp={(event) => {
                                //     this.handleChange(event);
                                // }}
                            />
                            )}
                        />
                    </div>
                    <div className={classes.root}>
                        <GridList cellHeight={200} className={classes.gridList} cols={getGridListCols()} spacing={10}>
                            {this.state.displayData.map((tile) => (
                            <GridListTile key={tile._id} className={classes.tile}>
                                <img src={tile.image} alt={tile.imagename} />
                                <GridListTileBar
                                title={tile.imagename}
                                subtitle={<span>Date: {tile.imagedate}</span>}
                                />
                            </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Navbar option='View' token={sessionStorage.getItem('token')}/>
                {element}
            </Fragment>
        )
    }
}

export default withRouter(withWidth()(withStyles(styles)(Display)));

