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
    


    // 合约构造函数，每当将合约部署到网络时都会调用它。
    // 此函数具有public函数修饰符，以确保它对公共接口可用。
    // 在这个函数中，我们将公共变量value的值设置为“myValue”。
    constructor() {
        // value = "myValue";
        ownerName = "Ren";
        
    }

    // 本函数读取值状态变量的值。可见性设置为public，以便外部帐户可以访问它。
    // 它还包含view修饰符并指定一个字符串返回值。
    // function get() public view returns(string memory) {
    //     return value;
    // }

    // 本函数设置值状态变量的值。可见性设置为public，以便外部帐户可以访问它。
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

}