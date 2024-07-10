import { useEffect } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import User from './User'

import { useAppGlobalContext } from './context'

function App () {
  const {
    user,
    getUser,
    setPreferredTheme,
    loadBtnRef,
    getMoreSuggestions,
    startId
  } = useAppGlobalContext()

  useEffect(() => {
    setPreferredTheme()
    getUser()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            getMoreSuggestions()
          }
        })
      },
      {
        threshold: 0.25
      }
    )

    if (loadBtnRef.current) {
      observer.observe(loadBtnRef.current)
    }

    return () => {
      if (loadBtnRef.current) {
        observer.unobserve(loadBtnRef.current)
      }
      observer.disconnect()
    }
  }, [loadBtnRef, startId, getMoreSuggestions])

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
