import React, { Component } from 'react';

import '../pages/Timeline.css';
import twitterLogo from '../twitter.svg';

import Tweet from '../components/Tweet';

import api from '../services/api';

import socket from 'socket.io-client';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTeet: ""
    }

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweet');

        this.setState({ tweets: response.data })
    }

    subscribeToEvents = () => {
        const io = socket('http://locahost:3001');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ... this.state.tweets] });
        })
        io.on('like', data => {
            this.setState({
                tweet: this.state.tweets.map(tweet => 
                    tweet._id == data._id ? data : tweet
                )
            })
        })
    }

    handleNewTweet = async (e) => {
        if (e.keyCode != 13) {
            return;
        }
        const content = this.state.newTeet;
        const author = localStorage.getItem('username');

        await api.post('tweet', { content, author });

        this.setState({ newTeet: "" });
    }

    handleInputChange = (e) => {
        this.setState({ newTeet: e.target.value })
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} />
                <form>
                    <textarea value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet} />
                </form>
                <ul className="tweet-list">
                    {this.state.tweets.map(tweet =>
                        <Tweet key={tweet._id} tweet={tweet} />
                    )}
                </ul>
            </div>
        );
    }
}
