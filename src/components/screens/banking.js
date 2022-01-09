import React from "react";
import AnalyticsBlock from "../analyticsBlock";
import BlockHeader from "../blockHeader";
import {apiGet, apiPost} from "../api";
import ProfilePicture from "../profilePicture";


const defaultStatDataUser = [
    {'title': 'USERS', 'value': '176,252', 'format' : '24h'},
    {'title': 'JOINED THIS MONTH', 'value': '13,401', 'format' : '3mo'},
    {'title': 'LOGINS TODAY', 'value': '9,219', 'format' : '24h'},
    {'title': 'online now', 'value': '676', 'format' : '24h'},
];



const getDrawerData = async (token) => {
    return await apiGet('/api/prolink/drawer/self/', token);
}

const getAllOpenDrawers = async (token) => {
    return await apiGet('/api/prolink/drawer/all-open/', token);
}
const makeDrawerTransaction = async (userId, amount, token) => {
    const formData = FormData();
    formData.append('user_id', userId);
    formData.append('amount', amount);
    return await apiPost('/api/prolink/drawer/transaction/', formData, token);
}


const BankingInput = ({onUserFound, userToken}) => {
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false);

    const performLookup = async (userId) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('user_id', userId);
        const jsonData = await apiPost('/api/prolink/drawer/view-user/', formData, userToken);
        if(jsonData && jsonData.user && jsonData.user.id) {
            onUserFound(jsonData.user);
            setInputValue('');
        }else{
            console.log(jsonData);
            setError(true);
        }
        setLoading(false);
    }

    const validateUUID = (value) => {
        setInputValue(value);
        if(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value)){
            performLookup(value);
        }
        else{
            setError(false)
        }
    }

    return(
        <div className='mini-block banking-input'>
            <input id='banking-scanner-input' autoFocus className={'input' +(loading?' loading':'') + (error?' error':'')} type="text" placeholder='Enter bowler UUID or scan app QR Code...' value={inputValue} onChange={(data) => { validateUUID(data.target.value);}}/>
        </div>
    );
}
const TransactionHistory = ({transactions}) => {

    const Transaction = ({value}) => {
        const amount = ((value.amount  || 0)/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        const dateString = new Date(value.datetime).toLocaleString();
        //const dateString = (new Date(value.datetime)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

        return (
            <div className='transaction'>
                <a className='id'>{value.id}</a>
                <a className='name'>{dateString}</a>
                <a className={'amount' + (value.amount < 0?' negative':'') + (value.amount > 0?' positive':'')}>{amount}</a>
            </div>
        );
    }

    return (
        <div className='mini-block transactions'>
            <BlockHeader title='Transactions' viewMoreTitle='View All'/>
            {transactions?(
                <div className='transaction-list'>
                    {transactions.map((item) => <Transaction key={item.id} value={item} />)}
                </div>
            ):(
                <a className='empty'>RECENT TRANSACTIONS WILL SHOW UP HERE.</a>
            )}
        </div>
    );
}
const DrawerStatus = ({drawer, onDrawerChange}) => {
    const [drawerOpened, setDrawerOpened] = React.useState(false);
    const [requested, setRequested] = React.useState(false);
    const [drawerAmount, setDrawerAmount] = React.useState(null);


    const requestToClose = () => {
        setRequested(true);
        setTimeout(()=>{
            setDrawerOpened(false)
            setRequested(false);
        },2000);
    }
    const requestToOpen = () => {
        setRequested(true);
        setTimeout(()=>{
            setDrawerOpened(true);
            setRequested(false);
        },2000);
    }



    React.useEffect(()=>{
        if(drawer){
            const amount = ((drawer.amount  || 0)/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            setDrawerAmount(amount);
            setDrawerOpened(drawer.opened);
            if(drawer.opened){
                setDrawerOpened(true)
            }
        }
    },[drawer])
    if (!drawerOpened){
        return(
            <div className='mini-block scanner-status'>
                <div className='button-bar'>
                    <i className={'fa fa-circle indicator'}></i>
                    <a className='status'>DRAWER CLOSED</a>
                    {requested?(
                        <a className='button'>OPEN REQUESTED</a>
                    ):(
                        <a className='button' onClick={requestToOpen}>REQUEST TO OPEN</a>
                    )}
                </div>
            </div>
        );
    }

    return(
        <div className='mini-block scanner-status'>
            <div className='button-bar'>
                <i className={'fa fa-circle indicator ' + (drawerOpened?'connected':'')}></i>
                <a className='status'>DRAWER OPEN <span className='amount'>${drawerAmount}</span></a>
                {requested?(
                    <a className='button'>CLOSE REQUESTED</a>
                ):(
                    <a className='button' onClick={requestToClose}>REQUEST TO CLOSE</a>
                )}
            </div>
        </div>
    );
}
const BankingLookup = ({lookupUser, onUserDataChanged, userToken}) => {
    const [visible, setVisible] = React.useState(false);

    const [userBalance, setUserBalance] = React.useState(null);
    const [pendingBalance, setPendingBalance] = React.useState(null);

    const [loadingAction, setLoadingAction] = React.useState(false);
    const [inputAmount, setInputAmount] = React.useState('');
    const [error, setError] = React.useState(false);

    const performTransaction = async (deposit) => {
        let amount = inputAmount * 100;
        if(!deposit){
            amount *= -1;
        }
        setLoadingAction(true);
        const formData = new FormData();
        formData.append('user_id', lookupUser.id);
        formData.append('amount', amount);
        const jsonData = await apiPost('/api/prolink/drawer/transaction/', formData, userToken);
        if(jsonData && jsonData.success && jsonData.user) {
            onUserDataChanged(jsonData.user);
            setInputAmount('');
        }else{
            console.log(jsonData);
            setError(true);
        }

        setLoadingAction(false);
    }

    const closeLookup = () => {
        setVisible(false);
        document.getElementById('banking-scanner-input').focus();
    }

    React.useEffect(()=>{
        if(lookupUser){
            const balance = ((lookupUser.balance  || 0)/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            const pending = ((lookupUser.pending_balance  || 0)/100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            setPendingBalance(pending);
            setUserBalance(balance);
            setVisible(true);
            console.log(lookupUser)
        }
        else{
            setVisible(false);
        }
    },[lookupUser]);

    if (!visible) {
        return null;
    }
    if(lookupUser){
        return (
            <div className='popup center-vertical banking-lookup'>
                <div className='mini-block'>
                    <BlockHeader title='BANKING LOOKUP' viewMoreTitle='Close' onViewMore={()=> {closeLookup()}}/>
                    <div className='lookup-top'>
                        <ProfilePicture url={lookupUser.picture}/>
                        <div className='lookup-details'>
                            <a className='lookup-name'>{lookupUser.first_name} {lookupUser.last_name}</a>
                            <a className='lookup-location'>{lookupUser.city?lookupUser.city+', ':''} {lookupUser.state?lookupUser.state:'Location Unknown'}</a>
                            <a className='lookup-id'>UUID: {lookupUser.id}</a>
                        </div>
                    </div>
                </div>
                <div className='mini-block'>
                    <div className='button-bar banking-action'>
                        <a className={'balance positive'}>${userBalance}</a><a className='pending'>(${pendingBalance} PENDING)</a>
                        <input autoFocus className={'input' + (loadingAction?' loading':'')} type="text" placeholder='Amount' value={inputAmount} onChange={(e)=>{setInputAmount(e.target.value)}}/>
                        <a className='button withdrawal' onClick={()=>{performTransaction(false)}}>WITHDRAWAL</a>
                        <a className='button deposit' onClick={()=>{performTransaction(true)}}>DEPOSIT</a>
                    </div>
                </div>
                <TransactionHistory transactions={lookupUser.recent_transactions}/>
            </div>
        );
    }
    else{
        return (
            <div className='popup center-vertical banking-lookup'>
                <div className='mini-block'>
                    <BlockHeader title='BANKING LOOKUP'/>
                    <a className='lookup-loading'>LOADING USER...</a>
                </div>
            </div>
        );
    }
}

const Banking = ({userData, userToken}) =>{
    const [lookupUser, setLookupUser] = React.useState(null);
    const [drawer, setDrawer] = React.useState(null);

    const refreshWalletTransactions = async () => {
        const jsonData = await getDrawerData(userToken);
        console.log(jsonData);
        if(jsonData && jsonData.drawer){
            setDrawer(jsonData.drawer);
        }
    }

    React.useEffect(()=>{
        if(userToken){
            refreshWalletTransactions();
        }
    }, [lookupUser]);

    return (
        <div className='page center-vertical banking'>
            <BankingInput userToken={userToken} onUserFound={(user)=> {setLookupUser(user)}}/>
            <TransactionHistory transactions={drawer?drawer.recent_transactions:null}/>
            <DrawerStatus drawer={drawer}/>
            <BankingLookup lookupUser={lookupUser} onUserDataChanged={(user)=>{setLookupUser(user)}} userToken={userToken}/>
        </div>
    );
}

export default Banking;