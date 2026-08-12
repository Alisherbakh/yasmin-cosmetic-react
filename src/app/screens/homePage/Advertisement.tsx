import React from "react";

export default function Advertisement() {
  return (
    <div className="ads-store-frame">
      <video
        className={"ads-video"}
        src="/video/The Cosmetics Company Store at Dalton Park.mp4"
        title="Take a look inside the Yasmin Cosmetics shop"
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    </div>
  );
}
