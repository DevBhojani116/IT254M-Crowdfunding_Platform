import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Await } from "react-router-dom";
import "./App.css";
import abi from "./contractJson/Crowdfunding.json";
import { ethers } from "ethers";
import Home from "./pages/Home";
import CampaignCreation from "./components/CampaignCreation";
import CampaignsDisplay from "./components/CampaignsDisplay";

//0xA91dD1Ba3C27436540c8D6E8f69E71C5a3A517bA
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected to account");
  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x9b7591873c7278D3Aad67AD159d180ee57c261b1";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(account);

        const provider = new ethers.BrowserProvider(window.ethereum); // to read the blockchain
        const signer = await provider.getSigner(); // to write on the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        // console.log(await provider.getBlockNumber());
        setState({ provider, signer, contract });
      }
      catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);

//   const [campaigns, setCampaigns] = useState([]);
// const getCampaigns = async() =>
// {
//   const campaigns = await contract.viewCampaigns();
//   setCampaigns(campaigns)
// }
// useEffect(() =>
// {
//     getCampaigns();
// },[])
  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home state = {state} />} />
          {/* {campaigns.map((campaign) => (
            <Route key = {`/${campaign.campaignNumber}`} path={`/${campaign.campaignNumber}`} element={<CampaignsDisplay data={campaign}/>} />
          ))} */}
        </Routes>
    </BrowserRouter>
    {/* <CampaignCreation state = {state}/> */}
  </div>
  );
}

export default App;
