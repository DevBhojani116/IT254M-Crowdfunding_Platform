import {ethers} from "ethers"
import Campaign from "./Campaign";
import CampaignsDisplay from "./CampaignsDisplay";
const CampaignCreation=({state})=>{

    const createCampaign = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      const amount = document.querySelector("#amount").value;
      const endDate = document.querySelector("#endDate").value;
      const transaction = await contract.createCampaign(name,message,endDate,amount)
      await transaction.wait();
      alert("Campaign Creation is successul");
      window.location.reload();
    }
    return  (
      <div className="center">
        <form onSubmit={createCampaign}>
          <div className="inputbox">
            <input type="text" required="required" id="name" />
            <span>Cause</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="message" />
            <span>Future Plans</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="endDate" />
            <span>End Date</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="amount" />
            <span>Required Amount (in Wei)</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Create Campaign"  disabled={!state.contract}/>
          </div>
        </form>

        </div>
      );
}
export default CampaignCreation;