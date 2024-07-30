
import { useAuth0 } from '@auth0/auth0-react'
const Log = () => {
    const{loginWithRedirect, logout, isAuthenticated} = useAuth0();
    return(
        <div className='flex h-screen '>
          <div className="m-auto">
          <h1 className='font-bold tracking-wide text-8xl py-9'>ChatClone</h1>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="z-40 relative">
              Log Out
            </button>
            <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in, Please Login"}</h3>
            </div> 
        </div>)
  
};

export default Log;