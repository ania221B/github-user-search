import { useAppGlobalContext } from './context'
import ItemSkeleton from './ItemSkeleton'

function SuggestionItem ({ suggestion }) {
  const { selectUserItem, isItemLoading } = useAppGlobalContext()

  if (isItemLoading) {
    return <ItemSkeleton></ItemSkeleton>
  }

  return (
    <li
      className='suggestion-list__item'
      onClick={e => selectUserItem(e, suggestion)}
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
