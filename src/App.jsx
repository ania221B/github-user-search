import { useEffect } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import User from './User'
import { useAppGlobalContext } from './context'

function App () {
  const { userName, user, getUser, setPreferredTheme } = useAppGlobalContext()

  useEffect(() => {
    setPreferredTheme()
    getUser(userName)
  }, [])
  return (
    <main>
      <section className='section'>
        <div className='container flow'>
          <Header></Header>
          <SearchBar></SearchBar>
          <User user={user}></User>
        </div>
      </section>
    </main>
  )
}

export default App
