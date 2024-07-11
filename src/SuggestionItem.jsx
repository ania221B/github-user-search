import { nanoid } from 'nanoid'
import { useAppGlobalContext } from './context'

function SuggestionItem ({ suggestion }) {
  const { isItemLoading, selectUserItem } = useAppGlobalContext()

  if (isItemLoading) {
    return <li className='item-skeleton br-small'></li>
  }

  return (
    <li
      className='suggestion-list__item'
      onClick={e => selectUserItem(e, suggestion)}
      key={nanoid()}
      role='option'
      aria-selected='false'
    >
      <article>
        <div className='suggestion-list__item__img'>
          <img
            src={suggestion.avatar_url}
            alt={suggestion.name}
            className='br-circle'
          />
        </div>
        <h2 className='suggestion-list__item__name'>
          {suggestion.name ? suggestion.name : suggestion.login}
        </h2>
      </article>
    </li>
  )
}
export default SuggestionItem
