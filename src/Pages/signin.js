import { Link } from "react-router-dom";

export default function Signin(){
    return (
    <div className = "bg-primary min-vh-100 d-flex justify-content-center align-items-center">
        <div className="rounded-4 bg-light p-5">
            <div className = "d-flex justify-content-center ">
                <h4>Log in to your account</h4>
            </div>
            <form>
            <div class="form-group mt-3">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email"  placeholder="Enter email"/>
            </div>
            <div class="form-group mt-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-group mt-3">
                <input id="remember" type="checkbox"/> 
                <label for="remember" className="ms-2">Remember me</label>
            </div>
            <div className="d-grid gap-2">
                <button type="submit" class="btn btn-primary mt-5">Submit</button>
            </div>
            </form> 
            <div className="rederict mt-3 d-flex justify-content-center">
                New to hemldesk? <Link className = "ms-2" to={"/signup"}> SignUp</Link>
            </div>
        </div>   
    </div>
    )
}