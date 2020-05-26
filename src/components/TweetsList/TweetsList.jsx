import React from "react";
import PropTypes from "prop-types";
import "./TweetsList.css";
import TweetCard from "../TweetCard";

/**
 * @param {object} props Component props
 * @returns {jsx} Component markup
 */
const TweetsList = ({ tweets }) => {
  const renderTweetCards = tweets.map(
    ({ id, image, username, timeStamp, text }) => (
      <li key={id}>
        <TweetCard
          image={image}
          username={username}
          timeStamp={timeStamp}
          text={text}
        />
      </li>
    )
  );

  return <ul className="tweets-list list-unstyled">{renderTweetCards}</ul>;
};

TweetsList.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      username: PropTypes.string,
      timeStamp: PropTypes.number,
      text: PropTypes.string
    })
  ).isRequired
};

export default TweetsList;
