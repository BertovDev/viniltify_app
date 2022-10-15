import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c9833a3d046f479f9d742874913f4428&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{minHeight:"100vh"}}>
        <h1>Welcome to Viniltify</h1>
        <a href={AUTH_URL} className="btn btn-success btn-lg">Login with Spotify</a>
    </Container>
  )
}
