//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract DappFundX  {
    uint256 private _totalCharities;
    uint256 private _totalDonation;
    address public owner;

    uint256 public charityTax;

    mapping(uint256 => CharityStruct) charities;
    mapping(uint256 => SupportsStruct[]) supportersOf;
    mapping(address => UserStruct) cid;

    struct CharityStruct {
        string cid;
        uint256 id;
        address owner;
        uint256 amount;
        uint256 donations;
    }

    struct SupportsStruct {
        uint256 id;
        uint256 amount;
        address supporter;
    }

    struct UserStruct {
        string cid;
        bool verified;
    }

    constructor(uint256 _charityTax){
        charityTax = _charityTax;
    }

    function createCharity(
        string memory _cid,
        uint256 amount
    ) public {
        require(cid[msg.sender].verified == true, 'Please Verify your personhood before creating a charity'); 
        require(amount > 0 ether, 'Amount cannot be zero');

        _totalCharities++;
        CharityStruct memory charity;
        charity.id = _totalCharities;
        charity.owner = msg.sender;
        charity.cid = _cid;
        charity.amount = amount;

        charities[charity.id] = charity;
    }

    function createUser(
        string memory _cid
    ) public {
        cid[msg.sender] = UserStruct({
            cid: _cid,
            verified: false
        });
    }

    function updateCharity(
        uint256 id,
        string memory _cid,
        uint256 amount
    ) public {
        require(charities[id].owner != address(0), 'Charity Not Found');
        require(msg.sender == charities[id].owner, 'Unauthorized Entity');
        require(amount > 0 ether, 'Amount cannot be zero');

        charities[id].amount = amount;
        charities[id].cid = _cid;
    }


    function getCharity(uint256 id) public view returns (CharityStruct memory) {
        return charities[id];
    }

    function getCharities() public view returns (CharityStruct[] memory Charities) {

        Charities = new CharityStruct[](_totalCharities);

        uint256 index;
        for(uint i=1; i<= _totalCharities; i++) {
            Charities[index++] = charities[i];
        }
    }

    function getMyCharities() public view returns (CharityStruct[] memory Charities) {
        uint256 available;
        for(uint i=1; i<= _totalCharities; i++){
            if(charities[i].owner == msg.sender) {
                available++;
            }
        }

        Charities = new CharityStruct[](available);

        uint256 index;
        for(uint i = 1; i <= _totalCharities; i++){
            if(charities[i].owner == msg.sender) {
                Charities[index++] = charities[i];
            }
        }
    }

    function donate(uint256 id) public payable {
        require(charities[id].owner != address(0), 'Charity Not Found');
        require(msg.value > 0 ether, 'Donation cannot be zero');
        require(charities[id].donations < charities[id].amount, 'Charity budget fulfilled');

        _totalDonation++;
        SupportsStruct memory support;
        support.id = _totalDonation;
        support.supporter = msg.sender;
        support.amount = msg.value;

        supportersOf[id].push(support);
        charities[id].donations += msg.value;

        uint256 fee = (msg.value * charityTax) / 100;
        uint256 payment = msg.value - fee;

        payTo(charities[id].owner, payment);
        payTo(owner, fee);
    }

    function getSupporters(uint256 id) public view returns (SupportsStruct[] memory){
        return supportersOf[id];
    }

    function changeTax(uint256 _taxPct) public {
        require(_taxPct > 0 && _taxPct <= 100, 'Percent must be between 1 - 100');
        charityTax = _taxPct;
    }

    function currentTime() internal view returns(uint256) {
        return (block.timestamp * 1000) + 1000;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}('');
        require(success);
    }

    function getUser() external view returns (UserStruct memory) {
        return cid[msg.sender];
    }
}