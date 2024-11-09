// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.x;

contract Crowdfunding
{

    struct Campaign
    {
        address payable creator;
        uint campaignNumber;
        string cause;
        string futurePlans;
        uint startDate;
        uint endDate;
        uint requiredAmount;
        uint raisedAmount;
    }

    struct Funder
    {
        address funderAddress;
        mapping(uint=>uint) donatedInThis;
        //campaignID => amount donated in this campaign
    }

    
    uint campaignID = 0;
    Campaign[] public allCampaigns; // Array to store all campaigns
    mapping(address=>Funder) funders; //this mapping is to track each funder using their address

    //this event will be emitted when a new campaign is created
    event campaignCreation
    (
        address _creator,
        string _cause,
        string _futurePlans,
        uint _startDate,
        uint _endDate, 
        uint _requiredAmount
    );

    //this event will be emitted when a funder donates to a campaign
    event donation 
    (
        address _funder,
        uint _campaignID,
        uint _donationAmount,
        uint _donationTime
    );

    
    function createCampaign(string memory _cause, string memory _futurePlans, uint _endDate, uint _requiredAmount) external
    {
        require(_requiredAmount>0, "Required amount must be positive");
        require(_endDate>block.timestamp, "Campaign should end after its creation");

        allCampaigns.push( 
        Campaign
        ({
            creator: payable(msg.sender),
            campaignNumber: campaignID,
            cause: _cause,
            futurePlans: _futurePlans,
            startDate: block.timestamp,
            endDate: _endDate,
            requiredAmount: _requiredAmount,
            raisedAmount: 0
        }));
        campaignID++;

        emit campaignCreation(msg.sender, _cause, _futurePlans, block.timestamp, _endDate, _requiredAmount);
    }

    //checks whether the time stated by the creator has passed or can anyone still donate in it
    modifier notEnded(uint campaignId) 
    {
        require(block.timestamp < allCampaigns[campaignId].endDate, "The campaign has ended");
        _;
    }

    //checks whether the amount required for the campaign has already been raised or can anyone still donate to raise the amount
    modifier requiredAmountFulfilled(uint _campaignID)
    {
        require(allCampaigns[_campaignID].raisedAmount<allCampaigns[_campaignID].requiredAmount, "Creator's amount requirement already fulfilled");
        _;
    }

    //Donor should enter positive amount
    modifier positiveAmount(uint amount)
    {
        require(amount>0, "Amount must be postive");
        _;
    }

    //checks whether the any campaign exists with the entered campaign ID or not
    modifier validity(uint _campaignID)
    {
        require(_campaignID<campaignID, "Invalid Campaign ID");
        _;
    }

    //donate in Wei
    function donate(uint _campaignID) external payable notEnded(_campaignID) positiveAmount(msg.value) validity(_campaignID) requiredAmountFulfilled(_campaignID) returns(string memory)
    {
        require(address(msg.sender).balance>=msg.value, "Insufficient balance in your wallet");

        Funder storage funder = funders[msg.sender];

        require(funder.donatedInThis[_campaignID]==0, "You have already donated to this campaign");

        //if the donor is trying to send more money than required then this "if" block will be executed
        if(msg.value+allCampaigns[_campaignID].raisedAmount>allCampaigns[_campaignID].requiredAmount)
        {
            uint amountToBeTransferred = allCampaigns[_campaignID].requiredAmount-allCampaigns[_campaignID].raisedAmount;
            allCampaigns[_campaignID].creator.transfer(amountToBeTransferred);
            allCampaigns[_campaignID].raisedAmount = allCampaigns[_campaignID].requiredAmount;
            funder.donatedInThis[_campaignID] += amountToBeTransferred;
            emit donation(msg.sender, _campaignID, amountToBeTransferred, block.timestamp);
            return ("Creator's amount requirement already fulfilled so transferred only the remaining amount");
        }
        else
        {
            uint amountToBeTransferred = msg.value;
            allCampaigns[_campaignID].raisedAmount += amountToBeTransferred;
            allCampaigns[_campaignID].creator.transfer(amountToBeTransferred);
            funder.donatedInThis[_campaignID] += amountToBeTransferred;
            emit donation(msg.sender, _campaignID, amountToBeTransferred, block.timestamp);
            return ("Donated");
        }
    }

    function viewCampaigns() public view returns(Campaign[] memory)
    {
        return allCampaigns;
    }
}