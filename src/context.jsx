import { useContext, useState, useRef } from 'react'
import { createContext } from 'react'
import axios from 'axios'

const AppGlobalContext = createContext()

function AppContext ({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [startId, setStartId] = useState(0)
  const [userName, setUserName] = useState('octocat')
  const [searchedUser, setSearchedUser] = useState('')
  const [user, setUser] = useState({})
  const [suggestionList, setSuggestionList] = useState([])
  const loadBtnRef = useRef(null)
  const inputValueRef = useRef(null)

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
    setIsLoading(true)
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
      setIsLoading(false)
      setIsError(true)
    }
    setIsLoading(false)
  }

  async function getUserSuggestions (inputString) {
    if (!inputString) {
      setSuggestionList([])
      return
    }
    try {
      const response = await axios.get(`${url}/users?per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

      const githubUserList = response.data.filter(user =>
        user.login.includes(inputString)
      )
      setSuggestionList(githubUserList)
    } catch (error) {
      setIsError(true)
    }
  }

  async function getMoreSuggestions () {
    try {
      const response = await axios.get(
        `${url}/users?per_page=100&since=${startId}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      )

      const inputValue = inputValueRef.current.value
      const additionalSuggestions = response.data.filter(user =>
        user.login.includes(inputValue)
      )

      if (!inputValue) {
        setSuggestionList([])
      } else {
        setSuggestionList(previousList => {
          const currentList = previousList.map(user => user.login)
          const additionsList = additionalSuggestions.filter(
            user => !currentList.includes(user.login)
          )

          return [...previousList, ...additionsList]
        })
      }
      setStartId(prevId => {
        return prevId + 100
      })
    } catch (error) {
      setIsError(true)
    }
  }

  function selectUserItem (event, item) {
    if (event.target.closest('.suggestion-list__item')) {
      getUser(item.name ? item.name : item.login)
    }
  }

  function enableDarkMode () {
    setIsDarkMode(true)
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
    window.localStorage.setItem('theme', 'dark')
  }

  function enableLightMode () {
    setIsDarkMode(false)
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
    window.localStorage.setItem('theme', 'light')
  }

  function setPreferredTheme () {
    const currentTheme = window.localStorage.getItem('theme')

    if (!currentTheme) {
      if (isDarkMode) {
        enableDarkMode()
      } else {
        enableLightMode()
      }
    } else if (currentTheme === 'dark') {
      enableDarkMode()
    } else {
      enableLightMode()
    }
  }

  function toggleTheme () {
    document.body.classList.contains('theme-dark')
      ? enableLightMode()
      : enableDarkMode()
  }

  return (
    <AppGlobalContext.Provider
      value={{
        isLoading,
        isError,
        setIsError,
        userName,
        setUserName,
        searchedUser,
        setSearchedUser,
        user,
        setUser,
        getUser,
        getUserSuggestions,
        suggestionList,
        setSuggestionList,
        loadBtnRef,
        inputValueRef,
        getMoreSuggestions,
        setStartId,
        selectUserItem,
        setIsDarkMode,
        setPreferredTheme,
        toggleTheme
      }}
    >
      {children}
    </AppGlobalContext.Provider>
  )
}
export default AppContext

export const useAppGlobalContext = () => useContext(AppGlobalContext)
