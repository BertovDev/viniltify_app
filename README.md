
# Vinyltify :musical_note:
> "Version 1" :coffee:

## Play your favorite songs in spotify on a turntable! :sunglasses: 

### Features
- Display any spotify playlist as a collection of vinyls records.
- Select any of the songs and play it in a turntable.
- Play around with the 3D models.

### Stack
- Created with Node.js, React, threeJS, Bun, Hono 

### Installation
You need **Node.js**, **Bun** and a Spotify account in order to run this application.
The local server run in the port 3001 and the application runs in the port 3000, both can be changed.

- Create .env file in the root of server directory with
  ```
  SPOTIFY_CLIENT_ID=""
  SPOTIFY_CLIENT_SECRET=""
  REDIRECT_URI=""
  ```
- Run `bun install` in the server directory to download server dependencies
- Run `npm i` inside the **/client** folder to download the client depencenies
- Create a .env file in the server directory with your spotify credentials ( you should create a spotify integration ) [spotify-dashboard](https://developer.spotify.com/dashboard/login "spotify dashboard")
- Run `bun run dev in the server directory to start the server
- Run `npm run start` in the **/client** folder to start the development app

### Aclarations

Your redirect URI created in the [spotify-dashboard](https://developer.spotify.com/dashboard/login "spotify dashboard") must match your REDIRECT_URI in the .env file!


![Screenshot_2024-08-11_22-19-47](https://github.com/user-attachments/assets/b91f1134-c9ab-4d24-a6bb-0a5b3623e5ba)
![Screenshot_2024-08-11_23-02-01](https://github.com/user-attachments/assets/fcf407a4-8837-42d3-9a7a-59252053d4a3)


