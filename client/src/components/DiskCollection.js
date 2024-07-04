import React, { useEffect, useState } from "react";
import { createDiskCollection } from "../three/CreateDiskCollection";
import { musicTracks } from "../three/CreateDiskCollection";

export default function DiskCollection() {
  const [diskArray, setDiskArray] = useState([]);

  useEffect(() => {
    setDiskArray(createDiskCollection());
  }, []);

  return (
    <group>
      {diskArray.map((el) => {
        return <group key={musicTracks[el.key].id}>{el}</group>;
      })}
    </group>
  );
}
