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
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.4 + Math.random() * 3;
    let x = Math.sin(angle) * radius;
    let z = Math.cos(angle) * radius;

    let y = Math.random() * (0.38 - 0.4) + 0.38;
    let rotation = (Math.random() - 0.5) * 4;

    if (index == musicTracks.length - 1) {
      x = 3;
      y = 0.38;
      z = -2;
      rotation = -0.8;
    }

    array.push(
      <DiskPlane
        key={el.id}
        playingTrack={el.album.images[0].url}
        position={[x, -y, z]}
        rotation={[-Math.PI / 2, 0, rotation]}
        song={el.uri}
        artist={el.artists[0].name}
        name={el.name}
      />
    );
  });
  return array;
}
