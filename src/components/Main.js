import React from 'react';
import axios from 'axios';
import shortid from 'shortid';

import Picture from './Picture';

class Main extends React.Component {

    state = {
        allPictures: [],
        mostRecentAlbums: [],
        mostRecentPictures: []
    };

    componentDidMount() {
        this.getAllPictures();
    }

    getAllPictures = async () => {
        try {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/photos"
            );
            this.setState(
                {
                    allPictures: data
                }, () => {
                    this.getMostRecentAlbums();
                });
        } catch (err) {
            console.log(err);
        }
    };

    getMostRecentAlbums = () => {
        var allPictures = this.state.allPictures.map(function (item) { return item.albumId; });
        var mostRecentAlbums = Array.from(new Set(allPictures)).reverse().slice(0, 3);

        this.setState({ mostRecentAlbums }, () => { this.getMostRecentPictures(); });
    };

    getMostRecentPictures = () => {
        const {
            mostRecentAlbums,
            allPictures
        } = this.state;

        var index;
        for (index = 0; index < mostRecentAlbums.length; index++) {
            var mostTwoRecentPictures = this.getTwoMostRecentPicturesByAlbum(mostRecentAlbums[index], allPictures);
            var mostRecentPictures = this.state.mostRecentPictures;
            mostRecentPictures.push(mostTwoRecentPictures);

            this.setState({ mostRecentPictures });
        }
    }

    getTwoMostRecentPicturesByAlbum = (albumId, allPictures) => {
        var picturesByAlbum = allPictures.filter(function (item) { return item.albumId === albumId; })
            .reverse().slice(0, 2);
        return picturesByAlbum;
    }

    render() {
        const borderColors = ["green", "blue", "purple"];
        return (
            <React.Fragment>
                {this.state.mostRecentPictures && this.state.mostRecentPictures.map((item, index) => (
                    <Picture key={shortid.generate()} pictures={item} borderColor={borderColors[index]} />
                ))}
            </React.Fragment>
        );
    }
}

export default Main;