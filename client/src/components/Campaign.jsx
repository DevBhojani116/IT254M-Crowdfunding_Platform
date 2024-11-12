import React, { useState, useEffect } from "react";
import CampaignCreation from "./CampaignCreation";
import CampaignsDisplay from "./CampaignsDisplay";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../App.css";

function Campaign(props) {
  return (
      <div className="category flex">
        <div>
            <h3 className="mt-5 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-500"><p>{props.cause}</p></h3>
            {/* <p>ID: {props.id}</p> */}
            {/* <Link to={`/${props.campaignNumber}`}>
              <button type="button" class="text-white my-2 bg-[#E65F5C] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:[#E65F5C] dark:hover:bg-green-700 dark:focus:ring-green-800">
                Donate
              </button>
            </Link> */}
        </div>
      </div>
  );
}

export default Campaign;