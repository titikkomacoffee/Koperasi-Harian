import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../config/supabase.js'
const AuthContext = createContext()
export function AuthProvider({ children }){
  const [user,setUser]=useState(null)
  const [profile,setProfile]=useState({nama:'Koperasi Tri Putra Abadi', email:'koperasitriputraabadi@gmail.com', role:'admin'})
  const [role,setRole]=useState('admin')
  const [koperasi,setKoperasi]=useState({id:'1', nama:'Koperasi Tri Putra Abadi'})
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>setUser(data.user))
    const {data:listener}=supabase.auth.onAuthStateChange((_,[STRIPPED]null))
    return ()=>listener.subscription.unsubscribe()
  },[])
  const logout=async()=>{ await supabase.auth.signOut(); setUser(null) }
  return <AuthContext.Provider value={{user,profile,role,koperasi,logout}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
