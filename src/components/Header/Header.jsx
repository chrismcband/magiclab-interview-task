import React from "react";
import { Container } from "reactstrap";
import { FaTwitter } from "react-icons/fa";

/**
 * @returns {jsx} Component markup
 */
const Header = () => (
  <header className="py-3 shadow-sm">
    <Container>
      <FaTwitter className="text-primary" size={32} />
    </Container>
  </header>
);

export default Header;
