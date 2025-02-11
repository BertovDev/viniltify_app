import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Player from "./Player";
export default function PlayerHeader({ currentPlaying, token }) {
  return (
    <Container
      className="d-flex flex-row gap-2 justify-content-between py-2"
      style={{ width: "100%", cursor: "auto" }}
    >
      <Row
        xs={1}
        sm={1}
        md={2}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Col
          style={{
            padding: "5px 12px",
            color: "white",
            fontSize: "16px",
            fontFamily: "monospace",
          }}
        >
          Playing:{" "}
          <span style={{ color: "#fab14e", fontSize: "14px" }}>
            {currentPlaying.text}
          </span>
        </Col>
        <Col
          style={{
            padding: "5px 12px",
            color: "gray",
            fontSize: "15px",
            fontFamily: "monospace",
          }}
        >
          ☝️🤓 Interact with the vinyl or the turntable!
        </Col>
        <Col style={{ display: "none" }}>
          <Player accessToken={token} currentPlaying={currentPlaying} />
        </Col>
      </Row>
    </Container>
  );
}
