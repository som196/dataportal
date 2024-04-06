import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const CowinDashboard = () => {
  const [data, setData] = useState(null)
  const [vaccinationByGender, setVaccinationByGender] = useState(null)
  const [vaccinationByAge, setVaccinationByAge] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const getData = async () => {
    setIsLoading(true) // Set loading state to true
    try {
      const vaccinationDataApiUrl =
        'https://apis.ccbp.in/covid-vaccination-data'
      const options = {
        method: 'GET',
      }
      const response = await fetch(vaccinationDataApiUrl, options)
      if (response.ok) {
        const jsonResponse = await response.json()
        console.log(jsonResponse.last_7_days_vaccination)

        setVaccinationByAge(jsonResponse.vaccination_by_age)
        setVaccinationByGender(jsonResponse.vaccination_by_gender)
        setData(jsonResponse.last_7_days_vaccination) // Update state with fetched data
      } else {
        setError(true) // Set error state
      }
    } catch (error1) {
      console.error('Error fetching data:', error1)
      setError(true) // Set error state
    } finally {
      setIsLoading(false) // Set loading state to false (regardless of success/failure)
    }
  }

  useEffect(() => {
    getData() // Call the function on component mount (or when needed)
  }, [])

  return (
    <div className="main-container">
      console.log(data)
      <div className="logo-name-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          className="cowin-logo"
          alt="website logo"
        />
        <p className="cowin-para">Co-WIN</p>
      </div>
      <div className="cowin-heading-container">
        <h1 className="cowin-heading">CoWIN Vaccination in India</h1>
      </div>
      {error ? (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="failure-img"
          />
          <h1>Something went wrong</h1>
        </div>
      ) : (
        <div className="loader-container">
          {isLoading && (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
            </div>
          )}
          {data && (
            <>
              <VaccinationByCoverage data={data} />
              <VaccinationByGender data1={vaccinationByGender} />
              <VaccinationByAge data1={vaccinationByAge} />
            </>
          )}
        </div>
      )}
    </div>
  )
}
export default CowinDashboard
