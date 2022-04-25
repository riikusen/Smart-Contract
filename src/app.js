App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    account2: '0x0',
    loading: false,
    contractInstance: null,

    init: async () => {
        // 加载web3
        await App.loadWeb3()
        // 加载智能合约
        await App.loadContract()
        // 网页刷新
        await App.render()
    },

    
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask.")
        }
        // MetaMask新版本…
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // 向用户请求帐户访问
                await ethereum.enable()
                // 用户允许使用账户
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {
                // 用户拒绝使用账户
            }
        }
        // MetaMask老版本…
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // 无需向用户请求，可以直接使用账号
            web3.eth.sendTransaction({/* ... */ })
        }
        // 没有安装以太坊钱包插件(MetaMask)...
        else {
            console.log('需要安装以太坊钱包插件(例如MetaMask)才能使用!')
        }
    },

    loadContract: async () => {
        const contract = await $.getJSON('MyContract.json')
        App.contracts.MyContract = TruffleContract(contract)
        App.contracts.MyContract.setProvider(App.web3Provider)
    },

    render: async () => {
        // 如果正在加载，直接返回，避免重复操作
        if (App.loading) {
            return
        }

        // 更新app加载状态
        App.setLoading(true)

        // 设置当前区块链帐户
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        // const accounts = await ethereum.enable()
        console.log(accounts);
        const tenantAccount = '0x4355A350071d1352F647250808DcAe1850ceA72B';
        App.account = accounts[0];
        const landlordAccount = '0xe31934c4161f87585DdBb2433645e7823F13b3dC';
        $('#account').html(landlordAccount)
        console.log(tenantAccount);
        console.log(landlordAccount);
        // console.log(tenantAccount);
        $('#account2').html(tenantAccount)

        // 加载智能合约
        const contract = await App.contracts.MyContract.deployed()
        console.log(App);
        // const tenantContract = await App.contracts.TenantContract.deployed()
        App.contractInstance = contract
        // console.log(tenantContract);
        console.log(contract);
        // const value = await contract.get()
        const mobileNumber = await contract.getMobileNumber()
        const ownerName = await contract.getOwnerName()
        const propertyAddress = await contract.getPropertyAddress()
        const weeklyRent = await contract.getWeeklyRent()
        const deposit = await contract.getDeposit()
        const startDate = await contract.getStartDate()
        const endDade = await contract.getEndDate()
        const suppliedServices = await contract.getSuppliedServices()
        const petsAllowed = await contract.getPetsAllowed()
        const tenantName = await contract.getTenantName()
        const tenantNumber = await contract.getTenantNumber()
        const tenantStartDate = await contract.getTenantStartDate()
        const tenantEndDate = await contract.getTenantEndDate()
        // console.log(value);
        console.log(mobileNumber);
        console.log(ownerName);
        // $('#value').html(value)
        $('#ownerName').html(ownerName);
        $('#mobileNumber').html(mobileNumber);
        $('#propertyAddress').html(propertyAddress);
        $('#weeklyRent').html(weeklyRent);
        $('#deposit').html(deposit);
        $('#startDate').html(startDate);
        $('#endDate').html(endDade);
        $('#suppliedServices').html(suppliedServices);
        $('#petsAllowed').html(petsAllowed);
        $('#tenantName').html(tenantName);
        $('#tenantNumber').html(tenantNumber);
        $('#tenantStartDate').html(tenantStartDate);
        $('#tenantEndDate').html(tenantEndDate);

        App.setLoading(false)
    },
    

    set: async () => {
        console.log(App.contractInstance);
        App.setLoading(true)

        // const newValue = $('#newValue').val()
        // const landlordAccount = '0x12f38F0d6069AF8cEE15B3EB046FB3Fa76413325';
        const newMobileNumber = $('#newMobileNumber').val()
        const newOwnerName = $('#newOwnerName').val()
        const newPropertyAddress = $('#newPropertyAddress').val()
        const newWeeklyRent = $('#newWeeklyRent').val()
        const newDeposit = $('#newDeposit').val()
        const newStartDate = $('#newStartDate').val()
        const newEndDate = $('#newEndDate').val()
        const newSuppliedServices = $('#newSuppliedServices').val()
        const newPetsAllowed = $('#newPetsAllowed').val()

        // const newTenantName = $('#newTenantName').val()
        // const newTenantNumber = $('#newTenantNumber').val()
        // const newTenantStartDate = $('#newTenantStartDate').val()
        // const newTenantEndDate = $('newTenantEndDate').val()

        await App.contractInstance.set(newOwnerName, newMobileNumber, newPropertyAddress, newWeeklyRent, newDeposit, newStartDate, newEndDate, newSuppliedServices, newPetsAllowed, {from: App.account});
        // await App.contractInstance.setTenant(newTenantName, newTenantNumber, newTenantStartDate, newTenantEndDate, {from: tenantAccount});
        window.alert('Successfully updated. Please refresh the page to view details.')
        App.setLoading(false)
    },

    setTenant: async () => {
        App.setLoading(true)
        const newTenantName = $('#newTenantName').val()
        const newTenantNumber = $('#newTenantNumber').val()
        const newTenantStartDate = $('#newTenantStartDate').val()
        const newTenantEndDate = $('newTenantEndDate').val()
        console.log(App.contractInstance);
        // const tenantAccount = '0xe31934c4161f87585DdBb2433645e7823F13b3dC';
        await App.contractInstance.setTenant(newTenantName, newTenantNumber, newTenantStartDate, newTenantEndDate, {from: App.account});
        window.alert('Successfully updated. Please refresh the page to view details.')
        App.setLoading(false)
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}

// function showContractDetails() {
//     var x = document.getElementById("contractDetails");
//     if (x.style.display == "none") {
//         x.style.display == "block";
//     }
// }

$(document).ready(function () {
    App.init()
});

// console.log(111);


// function myFunction() {
//     var x = document.getElementById("myDIV");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }
