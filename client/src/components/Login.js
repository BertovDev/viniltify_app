import React from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Github, Linkedin, Twitter } from "react-bootstrap-icons";
import "../index.css";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3001/auth/callback"
    : "https://viniltify.onrender.com";

export default function Login() {
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        color: "white",
      }}
    >
      <div className="main">
        <h1>JUST ENJOY ANY SONG IN A 3D TURNTABLE</h1>
        <div className="buttons">
          <Button className="button">
            <a href={"http://localhost:3001/auth/login"}>Login with Spotify</a>
          </Button>
          <div className="button-and-input">
            <Button className="button">
              <a href={"http://localhost:3001/auth/login"}>Request access</a>
            </Button>
            <input
              type="text"
              placeholder="Your spotify email"
              className="input-email"
            />
          </div>
        </div>
      </div>
      <img src="images/Vector.png" alt="vector" className="vinylVector" />

      <div className="header">
        <div className="icons">
          <a
            href="https://github.com/BertovDev"
            target="_blank"
            className="p-2"
          >
            <Github color="white" size={35} />
          </a>
          <a
            href="https://www.linkedin.com/in/bautista-berto/"
            target="_blank"
            className="p-2"
          >
            <Linkedin color="white" size={35} />
          </a>
          <a
            href="https://twitter.com/tongenjs"
            target="_blank"
            className="p-2"
          >
            <Twitter color="white" size={35} />
          </a>
        </div>
        <img src="/images/LOGO.svg" alt="logo" />
      </div>
      {/* <h1 className="mb-2" style={{ fontSize: "100px" }}>
        Viniltify
      </h1>
      <h3 className="text-center">Play your favorite songs in a turntable!</h3>
      <a
        href={"http://localhost:3001/auth/login"}
        className="btn btn-success btn-lg mt-4"
      >
        Login with Spotify
      </a>
      <Row>
        <Col className="mt-3">
          <a
            href="https://github.com/BertovDev"
            target="_blank"
            className="p-2"
          >
            <Github color="white" size={35} />
          </a>
          <a
            href="https://www.linkedin.com/in/bautista-berto/"
            target="_blank"
            className="p-2"
          >
            <Linkedin color="white" size={35} />
          </a>
          <a
            href="https://twitter.com/tongenjs"
            target="_blank"
            className="p-2"
          >
            <Twitter color="white" size={35} />
          </a>
        </Col>
      </Row> */}
    </div>
  );
}
