import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../config/supabase.js'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [koperasi, setKoperasi] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      if (data.session?.user) fetchProfile(data.session.user.id)
      else setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (session?.user) await fetchProfile(session.user.id)
      else { setProfile(null); setKoperasi(null); setLoading(false) }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (prof) {
        setProfile(prof)
        const { data: kop } = await supabase.from('koperasi').select('*').eq('id', prof.koperasi_id).single()
        setKoperasi(kop || null)
      }
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null); setProfile(null); setKoperasi(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, koperasi, loading, logout, role: profile?.role || 'anggota' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
