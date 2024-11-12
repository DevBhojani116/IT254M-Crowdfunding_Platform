import { useState, useEffect } from "react";
import CampaignCreation from "./CampaignCreation.jsx";
import CampaignCard from "./CampaignCard.jsx";
const CampaignsDisplay = ({ state }) => {

  const [campaigns, setCampaigns] = useState([]);
  const { contract } = state;

  const campaignLoad= async () => {
    // event.preventDefault();
    
    const campaigns = await contract.viewCampaigns();
    // await campaigns.wait();
    setCampaigns(campaigns);
    console.log(campaigns.length);
    // window.location.reload();
  };
  useEffect(() => {
    campaignLoad();
  }, [contract]);
  return (
    <>
      {campaigns.map((campaign) => (
        <CampaignCard
          campaignNumber={campaign.campaignNumber}
          cause={campaign.cause}
          futurePlans={campaign.futurePlans}
          startDate={campaign.startDate}
          endDate={campaign.endDate}
          requiredAmount={campaign.requiredAmount}
          raisedAmount={campaign.raisedAmount}
          state = {state}
        />
      ))}
    </>
  );
};
export default CampaignsDisplay;
