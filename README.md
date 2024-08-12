
# Vinyltify :musical_note:
> "Version 1" :coffee:

## Play your favorite songs on a turntable! :sunglasses: 

### Installation
You need **Node.js**, **Bun** and a Spotify account in order to run this application.
The local server run in the port 3001 and the application runs in the port 3000, both can be changed.

- Run `bun install` in the server directory to download server dependencies
- Run `npm i` inside the **/client** folder to download the client depencenies
- Create a .env file in the server directory with your spotify credentials ( you should create a spotify integration ) [spotify-dashboard](https://developer.spotify.com/dashboard/login "spotify dashboard")
- Run `bun run dev` in the server directory to start the server
- Run `npm run start` in the **/client** folder to start the development app

### Aclarations

Your redirect URI created in the [spotify-dashboard](https://developer.spotify.com/dashboard/login "spotify dashboard") must match your REDIRECT_URI in the .env file!


![Screenshot_2024-08-11_22-19-47](https://github.com/user-attachments/assets/b91f1134-c9ab-4d24-a6bb-0a5b3623e5ba)
