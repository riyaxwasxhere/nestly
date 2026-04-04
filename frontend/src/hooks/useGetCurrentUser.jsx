import { useEffect, useRef } from 'react'
import {useDispatch} from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'
import axios from 'axios'

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    const hasFetchedUser = useRef(false)
    useEffect(()=> {
        if (hasFetchedUser.current) return;
        hasFetchedUser.current = true;

        const getCurrentUser = async () =>{
            try{
                const response= await axios.get(`${serverUrl}/api/user/current`,{withCredentials: true})
                dispatch(setUserData(response.data))
                console.log("Current user:", response.data)
            }catch(error){
                console.error("Error fetching current user:", error)
            }
        }
        getCurrentUser()
    },[])
}

export default useGetCurrentUser