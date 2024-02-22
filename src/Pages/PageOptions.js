import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageOptions(){
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);

    useEffect(()=>{
        const access_token = "EAAVbwKKUZCzkBO1do0ygZCMZAqSCde0QfjcjZAAEbvRNAdHr6ZAdqET1gau4HMGXBHteAsuNXn1SytzghknDcsBMy3sjEksIuu5bze5xwBbaXPEQSYKNmthI5IRIgM9uUYgPLHRZADnAkEEFlJyw7tHwXPDfUQJvPE7jYlQhZAR78IvccZARYHQPWpyw";
        const url = "https://graph.facebook.com/v19.0/me/accounts?access_token="+access_token;
        fetch(url).then((res) => res.json())
        .then(res => {     
            setPages(res.data);
        })
        
    }, [])

    function handleClick(page){
        
        navigate("/integration", {state : {pageData : JSON.stringify(page)}});      
    }

    return (
        <>
            <div className = "bg-primary min-vh-100 d-flex justify-content-center align-items-center">
                <div className="rounded-4 bg-light p-5">
                    <div className="md-4 bg-primary rounded-3 bg-light p-3">
                        <h4>Select a page</h4>
                    </div>
                    {
                    pages.map((page) => (
                        <>
                            <h5 onClick={() => handleClick(page)} className="user-select-none rounded-2 bg-secondary p-2">{page.name}</h5>
                        </>
                    ))
                    }
                </div>
            </div>
        </>
    )
}