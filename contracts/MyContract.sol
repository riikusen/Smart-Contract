// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract MyContract {

    string mobileNumber;
    // string ownerName;
    string ownerName;
    string propertyAddress;
    string weeklyRent;
    string deposit;
    string startDate;
    string endDate;
    string suppliedServices;
    string petsAllowed;

    string tenantName;
    string tenantNumber;
    string tenantStartDate;
    string tenantEndDate;

    // string landlordAddress;
    // string tenantAddress;
    address landlordAddress = 0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c;  // ********************** edit this
    address tenantAddress = 0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6; // ************************ edit this 
    address payable landlordAddressPayable = payable(landlordAddress);
    address payable tenantAddressPayable = payable(tenantAddress);


    constructor() {
        // value = "myValue";
        ownerName = "Ren";
        deposit = "1";
        
    }
    fallback() external payable {}

    function stringToUint(string memory s) public pure returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(uint8(b[i]));
            // uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

    function set(string memory _ownerName, string memory _mobileNumber, string memory _propertyAddress, string memory _weeklyRent, string memory _deposit, string memory _startDate,
                string memory _endDate, string memory _suppliedServices, string memory _petsAllowed) public {
        ownerName = _ownerName;
        mobileNumber = _mobileNumber;
        propertyAddress = _propertyAddress;
        weeklyRent = _weeklyRent;
        deposit = _deposit;
        startDate = _startDate;
        endDate = _endDate;
        suppliedServices = _suppliedServices;
        petsAllowed = _petsAllowed;
    }

    function setTenant(string memory newName, string memory newNumber, string memory newStart, string memory newEnd) public {
        tenantName = newName;
        tenantNumber = newNumber;
        tenantStartDate = newStart;
        tenantEndDate = newEnd;
        //call send deposit here 
        // string memory depositSet = getDeposit();
        // uint depositUint = stringToUint(depositSet);
        // sendDeposit(landlordAddressPayable, depositUint);
    }


    function getMobileNumber() public view returns(string memory) {
        return mobileNumber;
    }


    function getOwnerName() public view returns (string memory) {
        return ownerName;	
    }


    function getPropertyAddress() public view returns (string memory) {
        return propertyAddress;	
    }
    
    function getWeeklyRent() public view returns(string memory) {
        return weeklyRent;
    }
    function getDeposit() public view returns(string memory) {
        return deposit;
    }
    function getStartDate() public view returns(string memory) {
        return startDate;
    }
        function getEndDate() public view returns(string memory) {
        return endDate;
    }

    function getSuppliedServices() public view returns (string memory) {
        return suppliedServices;
    }

    function getPetsAllowed() public view returns (string memory) {
        return petsAllowed;
    }

    function getTenantName() public view returns (string memory) {
        return tenantName;
    }

    function getTenantNumber() public view returns (string memory) {
        return tenantNumber;
    }

    function getTenantStartDate() public view returns (string memory) {
        return tenantStartDate;
    }

        function getTenantEndDate() public view returns (string memory) {
        return tenantEndDate;
    }

        uint256 public balance;



// Tenant functions

    // function () public payable {}

    function sendDeposit(address payable _receiver, uint amount) payable public {
         _receiver.transfer(amount);
    }

    function getLandlordBalance(address payable _landlordAddress) public view returns (uint) {
        return _landlordAddress.balance;
    }

    function getTenantBalance(address payable _tenantAddress) public view returns (uint) {
        return _tenantAddress.balance;
    }



// testing 

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function transferAmount(address payable _recipient, uint _amount) external payable {
        _recipient.transfer(_amount);
    }



//   fallback() external payable {
//     emit seeSender(msg.sender, msg.value);
//     emit showNum(num);
//     num += 1;
//   }







}