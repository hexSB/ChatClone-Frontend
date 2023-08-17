
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const CreateGroup = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [NoNameError, setNoNameError] = useState("Enter a name")
    

    const [data, setData] = useState({
        GroupName: ""
      })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data logged:", data)
      };

      async function createGroup() {
        const token = await getAccessTokenSilently(); 
        
        if (data.GroupName !== ""){
            const response = await axios.post("https://localhost:44306/api/Group", data, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            
              console.log(response.data);
              setNoNameError("Group Created")
            }
            else{
                setNoNameError("A Group Name is required")
            }
            

        }


    return(
        <div>

            <div className='fixed top-10 left-20 z-50'>
                <form onSubmit={handleSubmit}>
                Group Name:
                    <label className='px-2'>
                    <input
                        type="text"
                        name="GroupName"
                        value={data.GroupName}
                        onChange={handleInputChange}
                    />
                    </label>
                    <button type="submit" onClick={createGroup} className='bg-green-700 rounded-full'>Submit Group</button>
                </form>
                <div>{NoNameError}</div>
            </div>       
        </div>)
  
};

export default CreateGroup;