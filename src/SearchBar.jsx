import { useAppGlobalContext } from './context'
import SuggestionList from './SuggestionList'

function SearchBar () {
  const {
    isError,
    isIssue,
    errorMessage,
    searchedUser,
    suggestionList,
    setSearchedUser,
    setStartId,
    submitSearch,
    getUserSuggestions,
    inputValueRef
  } = useAppGlobalContext()
  const searchBarClasses = []
  if (isError) {
    searchBarClasses.push('error')
  } else if (isIssue) {
    searchBarClasses.push('error')
  } else {
    const indexOfError = searchBarClasses.indexOf('error')
    searchBarClasses.splice(indexOfError - 1, 1)
  }
  return (
    <form
      onSubmit={e => {
        submitSearch(e)
      }}
    >
      <div
        className={`search-bar br-medium` + ' ' + searchBarClasses.join(' ')}
      >
        <div className='icon'>
          <svg height='24' width='25' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.609 0c5.85 0 10.608 4.746 10.608 10.58 0 2.609-.952 5-2.527 6.847l5.112 5.087a.87.87 0 01-1.227 1.233l-5.118-5.093a10.58 10.58 0 01-6.848 2.505C4.759 21.16 0 16.413 0 10.58 0 4.747 4.76 0 10.609 0zm0 1.74c-4.891 0-8.87 3.965-8.87 8.84 0 4.874 3.979 8.84 8.87 8.84a8.855 8.855 0 006.213-2.537l.04-.047a.881.881 0 01.058-.053 8.786 8.786 0 002.558-6.203c0-4.875-3.979-8.84-8.87-8.84z'
              fill='#0079ff'
            />
          </svg>
        </div>
        <input
          type='text'
          value={searchedUser}
          placeholder='Search GitHub username...'
          onChange={e => setSearchedUser(e.target.value)}
          onInput={e => {
            setSearchedUser(e.target.value)
            getUserSuggestions(e.target.value)
          }}
          onBlur={() => setStartId(0)}
          ref={inputValueRef}
        />
        {isError && <div className='info'>{errorMessage}</div>}
        {isIssue && <div className='info'>{errorMessage}</div>}
        <button type='submit' className='button search-button'>
          Search
        </button>
        <SuggestionList suggestions={suggestionList}></SuggestionList>
      </div>
    </form>
  )
}
export default SearchBar
