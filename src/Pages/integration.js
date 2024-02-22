import { useLocation, useNavigate } from "react-router-dom";

export default function Integration(){
    const location = useLocation();
    const navigate = useNavigate();
    const page = JSON.parse(location.state.pageData);
    function handleDelete(){
        location.state = null;
        navigate("/pageOptions");
    }
    function handleChat(){
        navigate("/agentPage", {state:{data : JSON.stringify(page)}});
    }
    return(
        <>
            <div className = "bg-primary min-vh-100 d-flex justify-content-center align-items-center">
                <div className="rounded-4 bg-light p-5">
                    <div className = "d-flex justify-content-center ">
                        <h6>Facebook Page Integration</h6>
                    </div>
                    <div className = "d-flex justify-content-center ">
                        <h6>Integrated Page: <b>{page.name}</b></h6>
                    </div>
                    <div className="d-grid gap-2">
                        <button onClick={()=>handleDelete()} class="btn btn-danger mt-3">Delete Integration</button>
                    </div>
                    <div className="d-grid gap-2">
                        <button onClick={() => handleChat()} class="btn btn-primary mt-2">Reply To Messages</button>
                    </div>
                </div>
            </div>
        </>
    )
}