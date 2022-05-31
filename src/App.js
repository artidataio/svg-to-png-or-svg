import { useRef } from "react";

function downloadSVG(node) {
  //In case the svg does not include xmlns
  const clone = node.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const a = document.createElement("a");
  a.download = "download.svg";
  a.href = `data:text/html;base64,${btoa(clone.outerHTML)}`;
  a.click();
}

function downloadPNG(node) {
  //In case the svg does not include xmlns
  const clone = node.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = 1000; //arbitrary or img.width
    canvas.height = 1000; //arbitrary or img.height
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = "download.png";
    a.href = `${pngFile}`;
    a.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(clone.outerHTML)}`;
}

export default function App() {
  const svgRef = useRef(null);
  return (
    <>
      <button onClick={() => downloadSVG(svgRef.current)}>Download SVG</button>
      <button onClick={() => downloadPNG(svgRef.current)}>Download PNG</button>
      <svg ref={svgRef} viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="8"
          strokeWidth="4"
          stroke="tomato"
          fill="none"
        />
      </svg>
    </>
  );
}
