import React, { Component, Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
            displayData: [],
            date: new Date().toLocaleString(),
            name: 'Itachi',
            image: 'https://firebasestorage.googleapis.com/v0/b/image-album-e0fc6.appspot.com/o/images%2FItachi?alt=media&token=43b03ff7-ce4b-4b64-ac6d-fca1de8ddcf3'
        }
    }

    componentDidMount() {
        const displayData = [];
        for(let i=0;i<20;i++) {
            const obj = {
                name: this.state.name,
                image: this.state.image,
                date: this.state.date,
                id: i
            };
            displayData.push(obj);
        }
        this.setState({
            displayData: displayData
        });
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
        return (
            <Fragment>
                <div className={classes.searchbar}>
                    <Autocomplete
                        freeSolo
                        id="autocomplete"
                        disableClearable
                        options={this.state.displayData.map((option) => option.name)}
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
                        <GridListTile key={tile.id} className={classes.tile}>
                            <img src={tile.image} alt={tile.name} />
                            <GridListTileBar
                            title={tile.name}
                            subtitle={<span>Date: {tile.date}</span>}
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(withWidth()(withStyles(styles)(Display)));

