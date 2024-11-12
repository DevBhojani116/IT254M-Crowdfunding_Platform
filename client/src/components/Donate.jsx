import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CampaignCreation from "./CampaignCreation";
import CampaignsDisplay from "./CampaignsDisplay";
import CampaignCard from "./CampaignCard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../App.css";

const Donate = (props) => {
  const { contract } = props.state;
  console.log(contract);
  console.log(props.campaignNumber);
  const donate = async (event) => {
    try {
      console.log(props.campaignNumber);
      const money = document.querySelector("#money").value;
      const amount = { value: ethers.parseEther(money) };
    //   alert("kuch toh kiya 1");
      const transaction = await contract.donate(
        Number(props.campaignNumber),
        amount
      );
    //   alert("kuch toh kiya 2");
      await transaction.wait();
      alert("Campaign Donation is successful");
      window.location.reload();
    } catch (error) {
      alert("Donation failed:", error);
      alert(`Donation failed: ${error.message}`);
    }
  };
  return (
    <>
      <form onSubmit={donate}>
        <div className="inputbox">
          <input type="text" required="required" id="money" />
          <span>Amount to donate (in Wei)</span>
        </div>
        <div>
          <input
            type="submit"
            value="Donate to Campaign"
            disabled={!contract}
          />
        </div>
      </form>
    </>
  );
};

export default Donate;
