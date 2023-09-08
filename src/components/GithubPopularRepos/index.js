import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusValue.initial,
    repositoriesData: [],
    activeLanguageFilteredId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilteredId} = this.state
    this.setState({
      apiStatus: apiStatusValue.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilteredId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
        name: eachItem.name,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusValue.failure,
      })
    }
  }

  renderInprogressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderRepositoriesListView()
      case apiStatusValue.failure:
        return this.renderFailureView()
      case apiStatusValue.inProgress:
        return this.renderInprogressView()
      default:
        return null
    }
  }

  setActiveLanguageFilteredId = newLanguageId => {
    this.setState(
      {activeLanguageFilteredId: newLanguageId},
      this.getRepositories,
    )
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilteredId} = this.state
    return (
      <ul className="languages-list">
        {languageFiltersData.map(eachLanguageItem => (
          <LanguageFilterItem
            key={eachLanguageItem.id}
            setActiveLanguageFilteredId={this.setActiveLanguageFilteredId}
            languageDetails={eachLanguageItem}
            isActive={eachLanguageItem.id === activeLanguageFilteredId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
