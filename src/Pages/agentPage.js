import { useLocation } from "react-router-dom"
import "../resources/css/agentPage.css";
import inboxLogo from "../resources/images/inbox.svg"
import peopleLogo from "../resources/images/people.svg"
import monitorLogo from "../resources/images/monitor.svg"
import profileLogo from "../resources/images/profile.svg"
import callLogo from "../resources/images/call.svg"
import refreshLogo from "../resources/images/refresh.svg"
import listLogo from "../resources/images/list.svg"
import customerIcon from "../resources/images/user.png"
import { useEffect, useState } from "react";
import { getData, uploadPayload } from "../firebase"


export default function (){
    const [people, setPeople] = useState({});
    const [chatData, setChatData] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [currUserChats, setCurrUserChats] = useState([]);
    const [payload, setPayload] = useState("");
    const [id, setId] = useState("");
    const location = useLocation();
    const page = JSON.parse(location.state.data);
    const myPageId = page.id;
    useEffect(() => {
        getData().then((res) => {
            const logs = Object.keys(res);
            
            logs.map((curr) => {
                const tempData = res[curr];
                const person = tempData.Name;
                if(person !== "@agent"){
                    setPeople((currPerson) => {
                        currPerson[person] = true;
                        return currPerson;
                    })
                }
            })
            Object.keys(people).map((customer) => {
                setCustomers((currCustomer) => {
                    return ([
                        ...currCustomer,
                        customer,
                    ])
                })
            })
            setChatData((currData) => {
                currData = res;
                return currData;
            });
            
        });
    },[refresh])

    useEffect(() => {
        getData().then((res) => {
            if(selectedCustomer !== ""){
                const logs = Object.keys(res);
                setCurrUserChats([]);
                setChatData((currData) => {
                    currData = res;
                    return currData;
                });
                logs.map((chat) => {
                    if(res[chat].Name == selectedCustomer || 
                        res[chat].senderID == selectedCustomer){
                    const data = {
                            time : chat,
                            chatInfo : chatData[chat], 
                    }
                    if(chatData[chat].senderID!== selectedCustomer)
                    setId(chatData[chat].senderID);
                    setCurrUserChats((tempChat) => {
                            tempChat =  ([
                                ...tempChat,
                                data
                            ])
                            tempChat.sort((a, b) => a.time - b.time);
                            return tempChat;
                            
                    })
                    }
                })
            }
        })

    }, [selectedCustomer])

    function handleClick(customerName){
        setSelectedCustomer((currName) => {
            currName = customerName;
            return currName;
        });
    }

    async function handleSubmit(e){
        if(e.key === 'Enter'){
            
            e.preventDefault();
            e.target.value = "";
            if(payload !== ""){
                //console.log(payload, ,);
                const myChat = {
                    mesTime : Date.now(),
                    message : payload,
                    pageId : myPageId,
                    senderID : selectedCustomer,
                    Name : "@agent"
                }
                uploadPayload(myChat);
                setCurrUserChats((tempChat) => {
                    return ([
                        ...tempChat,
                        {
                            time : Date.now(),
                            chatInfo : myChat,
                        }
                    ])
                })
                const res = await fetch("/hooks/catch/18008447/3effc99/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        'text': payload,
                        'id': id,
                    })
                });
                setSelectedCustomer(selectedCustomer);

            }
        }
    }

    function handleRefresh(){
        setCustomers([]);
        setRefresh((curr) => {
            return curr+1;
        });
    }

    return (
        <>
             <div className = "bg-light min-vh-100 d-flex flex-row">
               <div className = "taskbar align-items-center gap-4 d-flex flex-column d-inline-flex  min-vh-100 bg-primary">
                    
                    <img className = "icons mt-4"  src = {require('../resources/images/logo.png')} />
                    <img className = "icons"  src = {inboxLogo} />
                    <img className = "icons"  src = {peopleLogo} />
                    <img className = "icons"  src = {monitorLogo} />

               </div >
               <div className = "w-50 min-vh-100 ">
                    <div className="w-100 p-3 convtab shadow-sm d-flex flex-row justify-content-between">
                        <div className="convtab d-flex flex-row">
                            <div>
                                <img className = "conLogo"  src = {listLogo} />
                            </div>
                            <div className="ms-1">Conversations</div>
                        </div>
                        <div className="d-flex align-self-end">
                            <img onClick={() => handleRefresh()} className = "conLogo" src = {refreshLogo} />      
                        </div>
                    </div>
                    <div>
                        {
                            customers.map((customer) => (
                                (customer !== "undefined")? 
                                <div onClick={()=>handleClick(customer)} className="customer shadow-sm w-100 p-3 d-flex flex-column">
                                    <div className = "d-flex flex-row justify-content-between">
                                        <div className = "d-flex flex-row">
                                            <input type="checkbox"></input>
                                            <div className = "ms-3 d-flex flex-column">
                                                <span className="strong"><b>{customer}</b></span>
                                                <span className = "">Facebook DM</span>
                                            </div>
                                        </div>
                                        <div className="font-weight-light">1 min</div>
                                    </div>
                                    <div>Information about the Latest posts...</div>
                                </div>:<></>
                            ))
                        }
                    </div>
               </div>
               <div className = "msgArea w-100  min-vh-100 flex-column justify-content-between">
                    <div className = "w-100 p-3 convtab shadow-sm d-flex flex-row">
                        {selectedCustomer}
                    </div>
                    <div className = "textarea w-100 position-relative d-flex flex-column ">
                        {
                            currUserChats.map((chat) => (
                                (chat.chatInfo.Name !== "@agent")?
                                <div className="align-items-start textLeft d-flex m-1 ms-2 p-2 d-block-flex rounded bg-light ">
                                    {chat.chatInfo.message}
                                </div>
                                :
                                <div className="textRight m-1 me-2 p-2 rounded bg-light ">
                                    {chat.chatInfo.message}
                                </div>
                                
                            ))
                        }
                    </div>
                    <div className = "textbar mb-auto">
                        <form>
                            <div class="form-group m-2">
                                <input onChange={(e) => setPayload(e.target.value)} onKeyDown={(e) => handleSubmit(e)} type="text" class="inputbar p-2 border form-control" placeholder={"Message " + selectedCustomer}/>
                            </div>
                        </form>  
                    </div>
               </div>
               <div className = "ctlArea d-flex flex-column  w-50">
                    {
                        (selectedCustomer !== "")?
                        <div className="bg-light sidepanel w-100 d-flex flex-column justify-content-center align-items-center">
                            <img className = "user"  src = {customerIcon} />  
                            <span>{selectedCustomer}</span>
                            <span className = "small mt-2">online</span>
                            <div className = "w-100 p-3 gap-4 small d-flex justify-content-center flex-row align-items-center">
                                <div className = "smBut p-1 w-25 shadow-sm">
                                    <img className = ""  src = {callLogo} />  
                                    Call
                                </div>
                                <div className = "smBut p-1 w-25 shadow-sm">
                                    <img className = ""  src = {profileLogo} />  
                                    Profile
                                </div>
                            </div>
                        </div>
                        :<></>
                    }
                    
                    {}
                    <div className="small p-2 bg-light m-3 h-25 rounded-3 shadow-sm">
                        <div className="m-2"><b>Customer details</b></div>
                        <div className="m-2 d-flex justify-content-between">
                            <span className="text-secondary">Email</span>
                            <span>{
                                    (selectedCustomer !== "")?
                                    (
                                        selectedCustomer.split(" ")[0]+
                                        selectedCustomer.split(" ")[1]+
                                        "@gmail.com"
                                    ).toLowerCase()
                                    :
                                    ("")
                                }
                            </span>
                        </div>
                        <div className="m-2 d-flex justify-content-between">
                            <span className="text-secondary">First Name</span>
                            <span>{selectedCustomer.split(" ")[0]}</span>
                        </div>
                        <div className="m-2 d-flex justify-content-between">
                            <span className="text-secondary">Last Name</span>
                            <span>{selectedCustomer.split(" ")[1]}</span>
                        </div>
                        <div className="small ms-3 text-primary">View more details</div>
                    </div>
               </div>
            </div>
        </>
    )
}