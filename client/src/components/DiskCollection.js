import React, { useEffect, useState } from "react";
import { createDiskCollection } from "../three/CreateDiskCollection";
import { musicTracks } from "../three/CreateDiskCollection";

export default function DiskCollection() {
  const [hover, setHover] = useState(false);
  const [diskArray, setDiskArray] = useState([]);

  useEffect(() => {
    setDiskArray(createDiskCollection());
  }, []);

  function changePointer(hover) {
    if (hover) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "grab";
    }
  }

  return (
    <group>
      {diskArray.map((el) => {
        return (
          <group
            key={musicTracks[el.key].id}
            onPointerOver={() => {
              setHover(false);
              changePointer(hover);
            }}
            onPointerLeave={() => {
              setHover(true);
              changePointer(hover);
            }}
          >
            {el}
          </group>
        );
      })}
    </group>
  );
}
