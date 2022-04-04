// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// 声明智能合约MyContract，合约的所有代码都包含在花括号中。
contract MyContract {

    // 声明一个名为value的状态变量
    string value;
    int mobileNumber;
    // string ownerName;
    string ownerName;
    string peropertyAddress;
    int weeklyRent;
    int deposit;
    int startDate;
    int endDate;
    string suppliedServices;
    bool petsAllowed;
    


    // 合约构造函数，每当将合约部署到网络时都会调用它。
    // 此函数具有public函数修饰符，以确保它对公共接口可用。
    // 在这个函数中，我们将公共变量value的值设置为“myValue”。
    constructor() {
        value = "myValue";
        ownerName = "Ren";
        mobileNumber = 123;
        
    }

    // 本函数读取值状态变量的值。可见性设置为public，以便外部帐户可以访问它。
    // 它还包含view修饰符并指定一个字符串返回值。
    function get() public view returns(string memory ) {
        return value;
    }

    // 本函数设置值状态变量的值。可见性设置为public，以便外部帐户可以访问它。
    function set(string memory _value) public {
        value = _value;
    }


    function getMobileNumber() public view returns(int) {
        return mobileNumber;
    }

    function setMobileNumber(int _mobileNumber) public {
        mobileNumber = _mobileNumber;
    }

    function getOwnerName() public view returns (string memory) {
        return ownerName;	
    }

    function setOwnerName(string memory _ownerName) public {
        ownerName = _ownerName;
    }

    function getPropertyAddress() public view returns (string memory) {
        return peropertyAddress;	
    }
    
    function getWeeklyRent() public view returns(int) {
        return weeklyRent;
    }
    function getDeposit() public view returns(int) {
        return deposit;
    }
    function getStartDate() public view returns(int) {
        return startDate;
    }
        function getEndDate() public view returns(int) {
        return endDate;
    }

    // function setDetails(string memory setOwnerName, int setMobileNumber, string memory setPropertyAddress, int setWeeklyRent, int setDeposit, uint setStartDate, uint setEndDate, string memory setSuppliedServices, bool setPetsAllowed) public payable {
    //     ownerName = setOwnerName;
    //     mobileNumber = setMobileNumber;
    //     peropertyAddress = setPropertyAddress;
    //     weeklyRent = setWeeklyRent;
    //     deposit = setDeposit;
    //     startDate = setStartDate;
    //     endDate = setEndDate;
    //     suppliedServices = setSuppliedServices;
    //     petsAllowed = setPetsAllowed;

    // }
}