App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    account2: '0x0',
    loading: false,
    contractInstance: null,


    init: async () => {
        await App.loadWeb3()
        await App.loadContract()
        await App.render()
    },


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
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        

        if (App.loading) {
            return
        }

        App.setLoading(true)

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        // const accounts = await ethereum.enable()
        console.log(accounts);
        // const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        // const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.account = accounts[0];
        // const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
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
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
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

        await App.contractInstance.set(newOwnerName, newMobileNumber, newPropertyAddress, newWeeklyRent, newDeposit, newStartDate, newEndDate, newSuppliedServices, newPetsAllowed, {from: landlordAccount});
        
        
        window.alert('Successfully updated. Please refresh the page to view details.')
        App.setLoading(false)
    },

    setTenant: async () => {
        
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
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
        await App.contractInstance.setTenant(newTenantName, newTenantNumber, newTenantStartDate, newTenantEndDate, {from: tenantAccount}); 
        web3.eth.sendTransaction({
            from: tenantAccount, // ********************** Edit this ******************* Tenant
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
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()
        const depositToRequest = $('#depositRequested').val()
        await contract.requestDeposit(landlordAccount, depositToRequest, {from: landlordAccount})
        App.setLoading(false)
    },

    payRent: async () => {
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()
        const rent = await contract.getWeeklyRent();
        console.log(rent);
        web3.eth.sendTransaction({
            from: tenantAccount, // ********************** Edit this ******************* Tenant
            to: contract.address,
            value: parseInt(rent)*10**18 + 21000,
            gas: 100000
        }, function(err, transactionHash) {
            if (!err)
                console.log(transactionHash + "Deposite Received"); 
            });
         App.setLoading(false)
    },

    receiveRent: async () => {
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.setLoading(true)
        const contract = await App.contracts.MyContract.deployed()
        const balance = await contract.getBalance();
        console.log(balance);
        await contract.receiveRent(landlordAccount, {from: landlordAccount})
        App.setLoading(false)
    },

    landlordEndLease: async () => {
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.setLoading(true)
        window.alert('You will have to pay the tenant the same amount as the deposit to end the lease early.')
        const contract = await App.contracts.MyContract.deployed()
        const landlordFine = await contract.getDeposit();
        web3.eth.sendTransaction({
            from: landlordAccount, // ********************** Edit this ******************* Tenant
            to: contract.address,
            value: parseInt(landlordFine)*10**18 + 21000,
            gas: 100000
        }, function(err, transactionHash) {
            if (!err)
                console.log(transactionHash + "Deposite Received"); 
            });
        await contract.endLease(tenantAccount, landlordFine, {from: landlordAccount})
         App.setLoading(false)
    },

    tenantEndLease: async () => {
        const tenantAccount = '0xdF5d173d48cE72d3AF0AB5c614BF7e25B36Af6a6';
        const landlordAccount = '0x31248Ef67b5a5AFd0623B54dBfA467901818Fc2c';
        App.setLoading(true)
        window.alert('Your deposit will be paid to the landlord if you wish to end the lease early.')
        const contract = await App.contracts.MyContract.deployed()
        const depositToRequest = await contract.getDeposit();
        await contract.requestDeposit(landlordAccount, depositToRequest, {from: tenantAccount})
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


