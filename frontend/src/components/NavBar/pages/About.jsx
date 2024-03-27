import React from "react";

function About() {
  return (
    <>
      <div className="flex justify-center items-center text-left text-justify mt-10 mb-12">
        <div className="ml-36">
          <p className="font-bold text-4xl mb-8 text-yellow">OUR STORY</p>
          Welcome to Appetive, where our love for cooking meets the joy of
          sharing. Our journey began with a simple idea: to create a space where
          food enthusiasts from all walks of life could come together to
          exchange recipes, culinary tips, and heartwarming stories. From
          delectable dishes to cherished family recipes, our platform celebrates
          the diversity and creativity of home cooking. As food lovers
          ourselves, we understand the power of a shared meal and the memories
          it creates. That's why we built Appetive as a hub for connecting,
          inspiring, and celebrating the art of cooking. 
        </div>
        <img
          src={require("../../../Images/About page/about1.png")}
          alt="Header Image"
          className="h-auto w-1/3 mr-24"
        />
      </div>
      <div className="flex justify-center items-center bg-black pb-8 pt-5">
        <img
          src={require("../../../Images/About page/about2.png")}
          alt="Header Image"
          className="h-auto w-1/3 ml-24"
        />

        <div className="flex flex-col mt-10 mb-10">
          <p className="font-bold text-darker-white text-4xl mb-8 text-yellow">
            OUR VALUES
          </p>
          <div className="flex flex-cols">
            <div className="mr-10 text-darker-white text-left text-justify">
              <p className="font-bold text-lg">1. Inspire Creativity:</p>
              We believe that everyone has a chef within them waiting to create
              culinary masterpieces. Our platform aims to inspire creativity by
              providing a diverse collection of recipes, cooking tips, and
              food-related content that encourages experimentation and
              innovation in the kitchen.
            </div>
            <p className="mr-32 text-darker-white text-left text-justify">
              <p className="font-bold text-lg ">2. Foster Community:</p>
              Food has a remarkable ability to bring people together. We strive
              to foster a vibrant and inclusive community of food enthusiasts,
              home cooks, and culinary experts where members can connect, share
              experiences, and support each other's culinary journeys.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-4xl mt-16 font-bold text-yellow">
        OUR TEAM
      </div>

      <div className="flex justify-center items-center mb-36">
        <div className="flex flex-col justify-center items-center">
          <img
            src={require("../../../Images/About page/Hisban.png")}
            alt="Header Image"
            className="h-40 w-40 mx-5 mt-16 mb-3"
          />
          <p className="font-bold">Hisban Shiraz</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img
            src={require("../../../Images/About page/Maddie.png")}
            alt="Header Image"
            className="h-40 w-40 mx-5 mt-16 mb-3"
          />
          <p className="font-bold">Maddie Lee</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img
            src={require("../../../Images/About page/Rosemary.png")}
            alt="Header Image"
            className="h-40 w-40 mx-5 mt-16 mb-3"
          />
          <p className="font-bold">Rosemary Okere</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img
            src={require("../../../Images/About page/Mia.png")}
            alt="Header Image"
            className="h-40 w-40 mx-5 mt-16 mb-3"
          />
          <p className="font-bold">Mia Dinh</p>
        </div>
      </div>
    </>
  );
}

export default About;
