import { useContext, useState } from 'react'
import { useAppGlobalContext } from '../context'
import SuggestionList from './SuggestionList'
import { useUser } from '../hooks/useUser'

function SearchBar () {
  const {
    isError,
    errorMessage,
    searchedName,
    suggestionList,
    setIsError,
    setErrorMessage,
    setStartId,
    setSearchedName,
    getUserSuggestions,
    inputValueRef
  } = useAppGlobalContext()
  const [input, setInput] = useState('')

  const { isPending, error, friendlyError } = useUser(searchedName)

  const searchBarClasses = isError ? ['error'] : []
  // if (isError) {
  //   searchBarClasses.push('error')
  // } else {
  //   const indexOfError = searchBarClasses.indexOf('error')
  //   searchBarClasses.splice(indexOfError - 1, 1)
  // }

  /**
   * Gets information about searched user
   * @param {Object} event event object
   */
  function submitSearch (event) {
    event.preventDefault()
    if (!input.trim()) {
      // setIsIssue(true)
      setIsError(true)
      setErrorMessage('Enter a name')
    } else {
      setIsError(false)
      setErrorMessage('')
      setSearchedName(input.trim())
      setInput('')
    }
  }
  return (
    <search>
      <form
        onSubmit={e => {
          submitSearch(e)
        }}
      >
        <div
          className={`search-bar br-medium` + ' ' + searchBarClasses.join(' ')}
        >
          <div className='icon' aria-hidden='true'>
            <svg height='24' width='25' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z'
                fill='#0079ff'
              />
            </svg>
          </div>
          <label htmlFor='username' className='sr-only'>
            Enter GitHub username to find
          </label>
          <input
            id='username'
            type='search'
            value={input}
            placeholder='Search GitHub username...'
            onChange={e => setInput(e.target.value)}
            onInput={e => {
              setInput(e.target.value)
              getUserSuggestions(e.target.value)
            }}
            onBlur={() => setStartId(0)}
            ref={inputValueRef}
          />
          {error && <div className='info'>{friendlyError}</div>}

          {isPending ? (
            <button type='submit' className='button search-button' disabled>
              Searching...
            </button>
          ) : (
            <button type='submit' className='button search-button'>
              Search
            </button>
          )}
          <SuggestionList suggestions={suggestionList}></SuggestionList>
        </div>
      </form>
    </search>
  )
}
export default SearchBar
