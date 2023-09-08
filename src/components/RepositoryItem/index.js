// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    starsCount,
    name,
  } = repositoryDetails
  return (
    <li className="repo-item">
      <div className="image-name-container">
        <img src={avatarUrl} alt={name} className="avatar-image" />
        <h1 className="name">{name}</h1>
      </div>

      <div className="status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="status-image"
        />
        <p className="status-count">{starsCount} stars</p>
      </div>
      <div className="status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="status-image"
        />
        <p className="status-count">{forksCount} forks</p>
      </div>
      <div className="status-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="status-image"
        />
        <p className="status-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
