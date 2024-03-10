import { useContext, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'

const AppGlobalContext = createContext()

function AppContext ({ children }) {
  const [isError, setIsError] = useState(false)
  const [userName, setUserName] = useState('octocat')
  const [searchedUser, setSearchedUser] = useState('')
  const [user, setUser] = useState({})
  const url = 'https://api.github.com'

  function formatDate (date) {
    const monthsInAYear = [
      { longname: 'January', shortName: 'Jan' },
      { longname: 'February', shortName: 'Feb' },
      { longname: 'March', shortName: 'Mar' },
      { longname: 'April', shortName: 'Apr' },
      { longname: 'May', shortName: 'May' },
      { longname: 'June', shortName: 'Jun' },
      { longname: 'July', shortName: 'Jul' },
      { longname: 'August', shortName: 'Aug' },
      { longname: 'Spetember', shortName: 'Sep' },
      { longname: 'October', shortName: 'Oct' },
      { longname: 'Novermber', shortName: 'Nov' },
      { longname: 'December', shortName: 'Dec' }
    ]
    const unformattedDate = new Date(date)
    const year = unformattedDate.getFullYear()
    const month = monthsInAYear[unformattedDate.getMonth()].shortName
    const day = unformattedDate.getDate()

    return `${day} ${month} ${year}`
  }

  async function getUser (searchedName) {
    setIsError(false)
    try {
      const response = await axios.get(`${url}/users/${searchedName}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      const githubUser = response.data

      setUser({
        image: githubUser.avatar_url,
        name: githubUser.name,
        username: githubUser.login,
        joinDate: formatDate(githubUser.created_at),
        bio: githubUser.bio,
        repos: githubUser.public_repos,
        followers: githubUser.followers,
        following: githubUser.following,
        location: githubUser.location,
        blog: githubUser.blog,
        twitter: githubUser.twitter_username,
        company: githubUser.company
      })
    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <AppGlobalContext.Provider
      value={{
        isError,
        setIsError,
        userName,
        setUserName,
        searchedUser,
        setSearchedUser,
        user,
        setUser,
        getUser
      }}
    >
      {children}
    </AppGlobalContext.Provider>
  )
}
export default AppContext

export const useAppGlobalContext = () => useContext(AppGlobalContext)
