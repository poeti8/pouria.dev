import React from "react";

const OG = (props?) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "linear-gradient(#bcdeff, #e5cbff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "0px",
        margin: "0px",
        borderRadius: 30,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "transparent",
          backgroundImage:
            "linear-gradient(0deg, rgba(255, 255, 255, 0) 49%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.16) 51%, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0) ), linear-gradient( 90deg, rgba(255, 255, 255, 0) 49%, rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.16) 51%, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0))",
          backgroundSize: "50px 50px",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={`data:image/png;base64,${props.davidBustBubbleGumImage}`}
          width={68}
          height={68}
          style={{ margin: "-32px 0 40px 0" }}
        />
        <h1
          style={{
            fontFamily: "Odibee Sans",
            color: "rgba(250, 103, 255, 0.8)",
            letterSpacing: "0.03em",
            fontWeight: 700,
            textShadow: "2px 3px 3px rgba(84, 249, 255, 0.6)",
            fontSize: 68,
            margin: "-18px 0 0 0",
            padding: 0,
          }}
        >
          {props.title}
        </h1>
        <p
          style={{
            fontFamily: "Public Sans",
            color: "#005675",
            fontSize: 21,
            margin: "16px 0 0 0",
            padding: 0,
          }}
        >
          {props.subtitle}
        </p>
      </div>
    </div>
  );
};

export default OG;
