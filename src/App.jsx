import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { head, last, isEmpty } from "lodash";
import Layout from "./components/Layout";
import TweetsList from "./components/TweetsList";

class App extends Component {
  state = {
    tweets: []
  };

  /**
   * @param {number} afterId After id
   * @returns {undefined} Undefined
   */
  recursiveGetTweets = afterId => {
    const timeout = 2000;
    let params = { count: 10 };

    if (afterId) {
      params = { ...params, afterId };
    }

    axios
      .get("https://magiclab-twitter-interview.herokuapp.com/oliver-tuck/api", {
        params
      })
      .then(({ data }) =>
        this.setState({ tweets: [...data, ...this.state.tweets] }, () => {
          this.recursiveGetTweetsTimeout = setTimeout(
            () => this.recursiveGetTweets(head(this.state.tweets).id),
            timeout
          );
        })
      )
      .catch(() => {
        if (isEmpty(this.state.tweets)) {
          this.recursiveGetTweetsTimeout = setTimeout(
            this.recursiveGetTweets,
            timeout
          );
        } else {
          this.recursiveGetTweetsTimeout = setTimeout(
            () => this.recursiveGetTweets(head(this.state.tweets).id),
            timeout
          );
        }
      });
  };

  getTweetsBefore = beforeId => {
    axios
      .get("https://magiclab-twitter-interview.herokuapp.com/oliver-tuck/api", {
        params: {
          count: 10,
          beforeId
        }
      })
      .then(({ data }) =>
        this.setState({ tweets: [...this.state.tweets, ...data] })
      )
      .catch(() => this.getTweetsBefore(beforeId));
  };

  componentDidMount() {
    this.recursiveGetTweets();

    const lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // scrolled down
        clearTimeout(this.recursiveGetTweetsTimeout);
      } else {
        // scrolled up
        this.recursiveGetTweets(head(this.state.tweets).id);
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // scrolled to bottom

        console.log(last(this.state.tweets).id);

        this.getTweetsBefore(last(this.state.tweets).id);
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.recursiveGetTweetsTimeout);
  }

  render() {
    return <Layout main={<TweetsList tweets={this.state.tweets} />} />;
  }
}

export default App;
