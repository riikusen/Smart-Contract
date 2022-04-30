// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// 声明智能合约MyContract，合约的所有代码都包含在花括号中。
contract MyContract {

    // 声明一个名为value的状态变量
    // string value;
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
    address landlordAddress = 0x12f38F0d6069AF8cEE15B3EB046FB3Fa76413325;
    address tenantAddress = 0xe31934c4161f87585DdBb2433645e7823F13b3dC;
    address payable landlordAddressPayable = payable(landlordAddress);
    address payable tenantAddressPayable = payable(tenantAddress);


    // constructor() {
    //     // value = "myValue";
    //     ownerName = "Ren";
        
    // }

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
        string memory depositSet = getDeposit();
        uint depositUint = stringToUint(depositSet);
        sendDeposit(landlordAddressPayable, depositUint);
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


    function sendDeposit(address payable _receiver, uint amount) payable public {
        // msg.sender.transfer(msg.value);
        
         _receiver.transfer(amount);
    }

    function returnDeposit(address payable _sender, uint amount) payable public {
        _sender.transfer(amount);
    }



    function payDeposit(uint256 amount) payable public {
        require(msg.value == amount);
        // nothing else to do!
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

//     function send(address payable _receiver) external payable {
//         require(msg.value == 0.5 ether);
//         _receiver.send(msg.value);
//   }
    function blc() public view returns (uint256) {
        uint balanceInEth = address(0xe31934c4161f87585DdBb2433645e7823F13b3dC).balance;
        return balanceInEth;
        // return 1.then(function(bn) { return bn.toString() });
        
    }

    function blc2() public view returns (uint256) {
        // uint balanceInEth = address(this).balance;
        // return balanceInEth;
        // return 1.then(function(bn) { return bn.toString() });
        return 10**18;
        
    }

    function blc3() public view returns (uint256) {
        uint256 bl1 = blc();
        uint256 bl2 = blc2();
        uint256 sub = bl1 - bl2;
        return sub;
        
    }

    function blc4() public view returns (uint256) {
        uint balanceInEth = address(this).balance;
        return balanceInEth;
        
    }
      uint num;
  uint value;
    
  constructor() {
      num = 69;
      value = 0;
  }
  
  event showNum(uint num);
  event seeSender(address addy, uint value);

  fallback() external payable {
    emit seeSender(msg.sender, msg.value);
    emit showNum(num);
    num += 1;
  }

  function printNum() public returns (uint y){
    emit showNum(num);
    return num;
  }

  function printValue() public returns (uint y){
    return value;
  }






}