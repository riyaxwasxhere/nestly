import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'
import axios from 'axios'

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        const getCurrentUser = async () =>{
            try{
                const response= await axios.get(`${serverUrl}/api/user/current`,{withCredentials: true})
                dispatch(setUserData(response.data))
                console.log("Current user:", response.data.user)
            }catch(error){
                console.error("Error fetching current user:", error)
            }
        }
        getCurrentUser()
    },[dispatch])
}

export default useGetCurrentUser