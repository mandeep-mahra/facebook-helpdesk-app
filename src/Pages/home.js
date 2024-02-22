import Signup from "./signup";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home(){
    const location = useLocation();
    const navigate = useNavigate();

    if(location.state == null)
        return(
            <Signup/>
        )
    function resolveConnect(){
        navigate('/pageOptions');
    }
    return (
        <>
            <div className = "bg-primary min-vh-100 d-flex justify-content-center align-items-center">
                <div className="rounded-4 bg-light p-5">
                    <div className = "d-flex justify-content-center ">
                        <h4>Facebook Page Integration</h4>
                    </div>
                    <div className="d-grid gap-2">
                        <button onClick={() => resolveConnect()} class="btn btn-primary mt-5">Connect Page</button>
                    </div>
                </div>
            </div>
        </>    
    )
}