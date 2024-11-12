import React, { useState, useEffect } from "react";
import CampaignCreation from "./CampaignCreation";
import CampaignsDisplay from "./CampaignsDisplay";
import Donate from "./Donate";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../App.css";

function CampaignCard(props) {
  
  // const {contract} = props.state;
  // console.log(contract);
  return (
      <div className="category flex">
        <div>
            <h3 className="mt-5 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-500"><p>{props.cause}</p></h3>
              <Donate 
                state = {props.state}
                campaignNumber = {props.campaignNumber}
              />
        </div>
      </div>
  );
}

export default CampaignCard;