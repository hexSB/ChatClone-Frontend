
import { useAuth0 } from '@auth0/auth0-react'
const Log = () => {
    const{loginWithRedirect, logout, isAuthenticated} = useAuth0();
    return(
        <div>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in"}</h3> 
        </div>)
  
};

export default Log;