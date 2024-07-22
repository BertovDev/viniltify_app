export default function changePointer(hover) {
  if (hover) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "grab";
  }
}
