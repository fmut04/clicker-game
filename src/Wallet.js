import React, { useState, useEffect } from "react";

function Wallet({ clicked, packClick, clickSpeed }) {
  // const [frameNumber, setFrameNumber] = useState(0);
  // const [animate, setAnimate] = useState(false);
  //
  // useEffect(() => {
  //   if (animate) {
  //     const animation = setInterval(() => {
  //       if (frameNumber < 5) setFrameNumber(frameNumber + 1);
  //       else {
  //         setAnimate(false);
  //         setTimeout(() => setFrameNumber(0), clickSpeed + 500);
  //       }
  //     }, clickSpeed / 6);
  //     return () => clearInterval(animation);
  //   }
  // });

  return (
    <>
      <img
        id="wallet"
        src={process.env.PUBLIC_URL + "/wallet/Wallet-0.png"}
        alt="broken img"
        onClick={() => {
          if (clicked === false) {
            packClick();
          }
        }}
      ></img>
    </>
  );
}

export default Wallet;
