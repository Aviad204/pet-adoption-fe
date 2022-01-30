import { Text } from "@chakra-ui/react";
import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Footer() {
  return (
    <Navbar fixed="bottom" className="footer">
      <Container className="d-flex justify-content-center align-items-end mt-3">
        <Text as="b" className="text-black h6 text-center">
          © Pet-AhTikva by Aviad Shmuel
        </Text>
      </Container>
    </Navbar>
  );
}

export default Footer;
