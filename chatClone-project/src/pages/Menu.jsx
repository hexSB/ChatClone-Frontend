import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react';


const Welcome = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState({
      GroupName: ""
    })


    function callApi() {
      axios.get("https://localhost:44306/api/Chat").then(response => {console.log(response.data)})
    }

    async function callUserApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/private", {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,token)
    }


    async function callProtectedApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/private-scoped", {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
    }

    async function callGroup() {
      const token = await getAccessTokenSilently(); 
      const response = await axios.post("https://localhost:44306/api/Group", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      console.log(response.data);
    }
    

    async function GroupGetTest() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/Group", {
        headers:{
          authorization: `Bearer ${token}`,
          
        }
      })
      console.log(response.data)
    }


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted data:", data);
    };


    
    return(
      <div>
        <div>
            <h1>Welcome</h1>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <button onClick={callApi}>Get chat</button>
            <button onClick={callProtectedApi}>Get protected</button>
            <button onClick={callUserApi}>Get Auth</button>
            <button onClick={callGroup}>Create Group</button>
            <button onClick={GroupGetTest}>Get Groups</button>

        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Group Name:
              <input
                type="text"
                name="GroupName"
                value={data.GroupName}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" onClick={callGroup}>Submit Group</button>
          </form>
        </div>
      </div>
        )
  
};

export default Welcome;