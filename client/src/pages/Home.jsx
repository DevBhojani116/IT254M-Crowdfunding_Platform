import React from "react";
import { Link } from "react-router-dom";
// import "../App.css";
import CampaignsDisplay from "../components/CampaignsDisplay.jsx";
import CampaignCreation from "../components/CampaignCreation.jsx";
const Home = ({state}) => {
    // event.preventDefault();
    // const {contract}=state;
    const createCampaign = () => {
        return (<CampaignCreation state = {state}/>)
    }
  return (
    <div className = "app">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Bit<span class="text-[#E65F5C] dark:text-[#E65F5C]">Fund</span></h1>
      <div className="container">
        <CampaignsDisplay state = {state} />
      </div>
      {/* <button onClick={createCampaign}></button> */}
      <CampaignCreation state = {state}/>
    </div>
  );
}

export default Home;