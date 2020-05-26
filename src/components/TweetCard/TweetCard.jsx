import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Card, CardBody, CardText } from "reactstrap";

/**
 * @param {object} props Component props
 * @returns {jsx} Component markup
 */
const TweetCard = ({ image, username, timeStamp, text }) => (
  <Card className="border-0 shadow-sm">
    <CardBody>
      <header className="d-flex">
        <img
          className="rounded-circle"
          src={image}
          alt={username}
          width={40}
          height={40}
        />
        <div className="ml-3">
          <div className="h6">{username}</div>
          <div className="text-muted">{moment(timeStamp).fromNow()}</div>
        </div>
      </header>
      <CardText className="mt-3 text-muted">{text}</CardText>
    </CardBody>
  </Card>
);

TweetCard.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  timeStamp: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default TweetCard;
