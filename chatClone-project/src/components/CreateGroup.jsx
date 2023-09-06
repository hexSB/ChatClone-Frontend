
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import {useState } from 'react';
const CreateGroup = ({updateGroups}) => {
    const {getAccessTokenSilently } = useAuth0();
    const [NoNameError, setNoNameError] = useState("")
    const Group_URL = import.meta.env.VITE_API_Group_URL
    

    

    const [data, setData] = useState({
        GroupName: ""
      })

    const handleInputChange = (event) => {
      const value = event.target.value;
      setData({ GroupName: value });
    };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data logged:", data)
        setData({ GroupName: "" })
        createGroup()
      };

      async function createGroup() {
        const token = await getAccessTokenSilently(); 
        
        if (data.GroupName !== ""){
            const response = await axios.post(Group_URL, data, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            
              console.log(response.data);
              setNoNameError("")
              updateGroups(data.GroupName)
            }
            else{
                setNoNameError("A Group Name is required")
            }
            

        }




    return(
        <div>
            <div className='-mt-20 '>
                <form onSubmit={handleSubmit} className=' bg-gray-800 ' >
                Enter Group Name:
                    <label className='px-2'>
                    <input
                        type="text"
                        name="GroupName"
                        value={data.GroupName}
                        onChange={handleInputChange}
                    />
                    </label>
                    <button type="submit" className='bg-green-700 rounded-full '>Create New Group 
                    <svg className="w-5 h-5 text-gray-800 dark:text-white inline  ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                    </svg>
                    </button>
                </form>
                <div className='text-red-600 text-lg'>{NoNameError}</div>
            </div>       
        </div>)
  
};

export default CreateGroup;