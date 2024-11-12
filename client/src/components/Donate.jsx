import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CampaignCreation from "./CampaignCreation";
import CampaignsDisplay from "./CampaignsDisplay";
import CampaignCard from "./CampaignCard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../App.css";

const Donate = (props) => {

    const {contract}=props.state;
    console.log(contract);
    console.log(props.campaignNumber);
    const donate = async(event)=>{
        try {
            console.log(props.campaignNumber);
            const amount = { value: ethers.utils.parseEther("0.001","ether") };
            alert("kuch toh kiya")
            const transaction = await contract.donate(props.campaignNumber, amount);
            await transaction.wait();
            alert("Campaign Donation is successful");
            window.location.reload();
          } catch (error) {
            alert("Donation failed:", error);
            alert(`Donation failed: ${error.message}`);
          }
      }
    return(
        <>
            <form onSubmit={donate}>
                <div>
                    <input type="submit" value="Donate to Campaign"  disabled={!contract}/>
                </div>
            </form>
        </>
    )

}

export default Donate;