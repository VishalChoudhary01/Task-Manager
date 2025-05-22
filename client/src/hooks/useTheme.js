import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toggleDarkMode} from '../redux/featuresSlice/themeSlice'

const useTheme = () => {
    const dispatch=useDispatch()

    const darkMode=useSelector((state)=>state.theme.darkMode)

    useEffect(()=>{
        document.documentElement.classList.toggle("dark",darkMode);
    },[darkMode])


    const handleToggle=()=>{
        dispatch(toggleDarkMode())
    }

  return {handleToggle,darkMode}
}

export default useTheme