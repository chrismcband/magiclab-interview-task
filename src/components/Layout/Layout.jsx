import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import Header from "../Header";

/**
 * @param {object} props Component props
 * @returns {jsx} Component markup
 */
const Layout = ({ main }) => (
  <>
    <Header />
    {main && (
      <main className="py-4 bg-light">
        <Container>{main}</Container>
      </main>
    )}
  </>
);

Layout.propTypes = {
  main: PropTypes.node
};

Layout.defaultProps = {
  main: null
};

export default Layout;
