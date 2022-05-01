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

        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
       
                await ethereum.enable()
               
                web3.eth.sendTransaction({/* ... */ })
            } catch (error) {

            }
        }
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)

            web3.eth.sendTransaction({/* ... */ })
        }

        else {
            console.log('Please connect to Metamask')
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
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        App.account = accounts[0];
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        $('#account').html(landlordAccount)
        console.log(tenantAccount);
        console.log(landlordAccount);
        $('#account2').html(tenantAccount)
        const contract = await App.contracts.MyContract.deployed()
        console.log(App);
        App.contractInstance = contract

        console.log(contract);

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

        const newMobileNumber = $('#newMobileNumber').val()
        const newOwnerName = $('#newOwnerName').val()
        const newPropertyAddress = $('#newPropertyAddress').val()
        const newWeeklyRent = $('#newWeeklyRent').val()
        const newDeposit = $('#newDeposit').val()
        const newStartDate = $('#newStartDate').val()
        const newEndDate = $('#newEndDate').val()
        const newSuppliedServices = $('#newSuppliedServices').val()
        const newPetsAllowed = $('#newPetsAllowed').val()

        await App.contractInstance.set(newOwnerName, newMobileNumber, newPropertyAddress, newWeeklyRent, newDeposit, newStartDate, newEndDate, newSuppliedServices, newPetsAllowed, {from: '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c'});
        
        
        window.alert('Successfully updated. Please refresh the page to view details.')
        App.setLoading(false)
    },

    setTenant: async () => {
        
        console.log(App.contractInstance);
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()
        const newTenantName = $('#newTenantName').val()
        const newTenantNumber = $('#newTenantNumber').val()
        const newTenantStartDate = $('#newTenantStartDate').val()
        const newTenantEndDate = $('#newTenantEndDate').val()
        const depositeToPay = await contract.getDeposit();

        console.log(parseInt(depositeToPay), newTenantName, newTenantNumber, newTenantStartDate, newTenantEndDate);
        console.log(contract.address);
        await App.contractInstance.setTenant(newTenantName, newTenantNumber, newTenantStartDate, newTenantEndDate, {from: '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6'});
        web3.eth.sendTransaction({
            from: '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6', // ********************** Edit this ******************* Tenant
            to: contract.address,
            value: parseInt(depositeToPay)*10**18 + 21000,
            gas: 100000
        }, function(err, transactionHash) {
            if (!err)
                console.log(transactionHash + "Deposite Received"); 
            });
        window.alert('Successfully updated. Please refresh the page to view details.')
        App.setLoading(false)
    },

    requestDeposit: async () => {
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()
        // const depositeToRequest = await contract.getDeposit();
        // const depositeToRequestString = $('#depositRequested').val()
        const depositeToRequest = $('#depositRequested').val()
        await App.contractInstance.requestDeposit('0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c', depositeToRequest, {from: '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c'})
        App.setLoading(false)

    },

    payRent: async () => {
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()

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


$(document).ready(function () {
    App.init()
});


