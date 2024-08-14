import DiskPlane from "../components/DiskPlane";
export let musicTracks = [
  {
    id: 0,
    name: "Have you ever",
    artist: "The Offspring",
    img: "images/sm.jpg",
    song: "music/have-you-ever.mp3",
  },
  {
    id: 1,
    name: "Hey",
    artist: "Red Hot Chilli Peppers",
    img: "images/sa.jpg",
    song: "music/Hey.mp3",
  },
  {
    id: 2,
    name: "The dream",
    artist: "Turnstile",
    img: "images/pts.jpg",
    song: "music/TheDream.mp3",
  },
  {
    id: 3,
    name: "Juicy Ones",
    artist: "Sticky Fingers",
    img: "images/ep.jpg",
    song: "music/JuicyOnes.mp3",
  },
  {
    id: 4,
    name: "Pigs",
    artist: "Pink Floyd",
    img: "images/pf.jpg",
    song: "music/Pigs.mp3",
  },
  {
    id: 5,
    name: "Americana",
    artist: "The offspring",
    img: "images/3318.jpg",
    song: "music/have-you-ever.mp3",
  },
];

export function createDiskCollection(playlist) {
  let array = [];

  playlist.forEach((el, index) => {
    array.push(
      <DiskPlane
        key={el.id}
        playingTrack={el.album.images[0].url}
        song={el.uri}
        artist={el.artists[0].name}
        name={el.name}
      />
    );
  });
  return array;
}
