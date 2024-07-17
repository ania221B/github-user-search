import { useAppGlobalContext } from './context'
import SuggestionItem from './SuggestionItem'
import { nanoid } from 'nanoid'

function SuggestionList ({ suggestions }) {
  const { loadBtnRef, isError } = useAppGlobalContext()

  return (
    <div className='suggestion-list-wrapper'>
      <ul className='suggestion-list' role='list'>
        {suggestions.map(suggestion => {
          return (
            <SuggestionItem
              suggestion={suggestion}
              key={nanoid()}
            ></SuggestionItem>
          )
        })}
      </ul>
      {isError ? (
        <button type='button' className='button loading-btn' ref={loadBtnRef}>
          Cannot get results
        </button>
      ) : (
        <button type='button' className='button loading-btn' ref={loadBtnRef}>
          Loading more
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 12'
            >
              <circle cx='4' cy='12' r='3' fill='currentColor'>
                <animate
                  id='svgSpinners3DotsBounce0'
                  attributeName='cy'
                  begin='0;svgSpinners3DotsBounce1.end+0.25s'
                  calcMode='spline'
                  dur='0.6s'
                  keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  values='12;6;12'
                />
              </circle>
              <circle cx='12' cy='12' r='3' fill='currentColor'>
                <animate
                  attributeName='cy'
                  begin='svgSpinners3DotsBounce0.begin+0.1s'
                  calcMode='spline'
                  dur='0.6s'
                  keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  values='12;6;12'
                />
              </circle>
              <circle cx='20' cy='12' r='3' fill='currentColor'>
                <animate
                  id='svgSpinners3DotsBounce1'
                  attributeName='cy'
                  begin='svgSpinners3DotsBounce0.begin+0.2s'
                  calcMode='spline'
                  dur='0.6s'
                  keySplines='.33,.66,.66,1;.33,0,.66,.33'
                  values='12;6;12'
                />
              </circle>
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

export default SuggestionList
