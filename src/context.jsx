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
  const [searchedUser, setSearchedUser] = useState('')
  const [user, setUser] = useState({})
  const [suggestionList, setSuggestionList] = useState([])
  const loadBtnRef = useRef(null)
  const inputValueRef = useRef(null)

  const url = 'https://api.github.com'

  /**
   * Formats the date
   * @param {String} date a date string
   * @returns String with date in DD MMM YYYY format
   */
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

  /**
   * Fetches user info and displays their profile
   * @param {String} searchedName user name entered in the search bar,
   */
  async function getUser (searchedName = 'octocat') {
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

  /**
   * Gets a list of suggested users based on entered text
   * @param {String} inputString text entered into search bar
   * @returns a list of suggested users
   */
  async function getUserSuggestions (inputString) {
    setIsError(false)
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

  /**
   * Fetches more suggested items from subsequent pages of results
   */
  async function getMoreSuggestions () {
    // setIsItemLoading(true)
    setIsError(false)
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
    // setIsItemLoading(false)
  }

  /**
   * Gets info about the user selected from suggestions list
   * @param {Object} event event object
   * @param {Object} item Object containing selected user info
   */
  function selectUserItem (event, item) {
    if (event.target.closest('.suggestion-list__item')) {
      getUser(item.name ? item.name : item.login)
    }
  }

  /**
   * Enables dark mode and stores info about mode selection
   */
  function enableDarkMode () {
    setIsDarkMode(true)
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
    window.localStorage.setItem('theme', 'dark')
  }

  /**
   * Enables light mode and stores info about mode selection
   */
  function enableLightMode () {
    setIsDarkMode(false)
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
    window.localStorage.setItem('theme', 'light')
  }

  /**
   * Sets the theme based on user preference
   */
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

  /**
   * Switches between available themes
   */
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
