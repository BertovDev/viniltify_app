import DiskPlane from "../components/DiskPlane";

export let musicTracks = [
  {
    id: 0,
    name: "Have you ever",
    artist: "The Offspring",
    img: "sm.jpg",
    song: "music/have-you-ever.mp3",
  },
  {
    id: 1,
    name: "Hey",
    artist: "Red Hot Chilli Peppers",
    img: "sa.jpg",
    song: "music/Hey.mp3",
  },
  {
    id: 2,
    name: "The dream",
    artist: "Turnstile",
    img: "pts.jpg",
    song: "music/TheDream.mp3",
  },
  {
    id: 3,
    name: "Juicy Ones",
    artist: "Sticky Fingers",
    img: "ep.jpg",
    song: "music/JuicyOnes.mp3",
  },
  {
    id: 4,
    name: "Pigs",
    artist: "Pink Floyd",
    img: "pf.jpg",
    song: "music/Pigs.mp3",
  },
];

export function createDiskCollection() {
  let array = [];

  musicTracks.forEach((el, index) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.5 + Math.random() * 4.5;
    let x = Math.cos(angle) * radius;
    let z = (0.3 + Math.abs(Math.sin(angle) * radius)) * -1;
    let y = Math.random() * (0.38 - 0.4) + 0.38;
    let rotation = (Math.random() - 0.5) * 4;

    if (index == musicTracks.length - 1) {
      x = 3;
      y = 0.38;
      z = -2;
      rotation = -0.8;
    }

    console.log(el);

    array.push(
      <DiskPlane
        key={el.id}
        playingTrack={el.img}
        position={[x, -y, z]}
        rotation={[-Math.PI / 2, 0, rotation]}
      />
    );
  });
  return array;
}
