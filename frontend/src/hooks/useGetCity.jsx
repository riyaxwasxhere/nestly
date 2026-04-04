import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCity } from '../redux/userSlice'

function useGetCity() {
    const apiKey = import.meta.env.GEOAPIFY_APIKEY
    const dispatch = useDispatch()
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords
            const response = axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
            dispatch(setCity(response?.data?.results[0].city))
        })
    })
}

export default useGetCity
