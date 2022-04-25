// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// 声明智能合约MyContract，合约的所有代码都包含在花括号中。
contract MyContract {



    string tenantName;
    string tenantNumber;
    string tenantStartDate;
    string tenantEndDate;
    


    // 合约构造函数，每当将合约部署到网络时都会调用它。
    // 此函数具有public函数修饰符，以确保它对公共接口可用。
    // 在这个函数中，我们将公共变量value的值设置为“myValue”。
    constructor() {

        
    }

    // 本函数读取值状态变量的值。可见性设置为public，以便外部帐户可以访问它。
    // 它还包含view修饰符并指定一个字符串返回值。
    // function get() public view returns(string memory) {
    //     return value;
    // }


    function setTenant(string memory newName, string memory newNumber, string memory newStart, string memory newEnd) public {
        tenantName = newName;
        tenantNumber = newNumber;
        tenantStartDate = newStart;
        tenantEndDate = newEnd;
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


}