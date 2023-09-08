// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, setActiveLanguageFilteredId} = props
  const {id, language} = languageDetails
  const isActiveButton = isActive ? 'button is-active' : 'button'

  const onClickLanguage = () => {
    setActiveLanguageFilteredId(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        onClick={onClickLanguage}
        className={isActiveButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
