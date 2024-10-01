import { useStep } from '@/app/providers/StepProvider'
import { fetchData } from '@/services/FetchData'
import { useEffect, useState } from 'react'
import Skeleton from '../Skeleton'
import styles from './styles.module.css'

const Vehicles = () => {
  const { step } = useStep()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const vehiclesPerPage = 5
  const [years, setYears] = useState([])

  const fetchVehiclesForPage = async (page) => {
    const { refId, typeId, brandId, modelId } = step
    setLoading(true)

    try {
      const startYearIndex = (page - 1) * vehiclesPerPage
      const endYearIndex = startYearIndex + vehiclesPerPage

      const fetchedYears = years.slice(startYearIndex, endYearIndex)

      const vehiclesData = await Promise.all(
        fetchedYears.map(async (year) => {
          const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`
          try {
            return await fetchData(url)
          } catch (error) {
            console.error(`Error fetching vehicle for year ${year.id}:`, error)
            return null
          }
        })
      )

      const validVehicles = vehiclesData.filter((vehicle) => vehicle !== null)
      setVehicles(validVehicles)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleYears = async () => {
    const { refId, typeId, brandId, modelId } = step

    try {
      const fetchedYears = await fetchData(
        `/api/anomodelo/${refId}/${typeId}/${brandId}/${modelId}`
      )
      setYears(fetchedYears)

      fetchVehiclesForPage(1)
    } catch (error) {
      console.error('Error fetching years:', error)
    }
  }

  useEffect(() => {
    if (step.refId && step.typeId && step.brandId && step.modelId) {
      handleYears()
    }
  }, [step])

  useEffect(() => {
    if (years.length > 0) {
      fetchVehiclesForPage(currentPage)
    }
  }, [currentPage, years])

  const totalPages = Math.ceil(years.length / vehiclesPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <caption>
            {`Código FIPE: ${vehicles.length > 0 && vehicles[0].fipe}`}
          </caption>
          <thead>
            <tr>
              <th>ano</th>
              <th>combustível</th>
              <th>valor</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.authentication}>
                <td>{vehicle.year == '32000' ? 'Zero Km' : vehicle.year}</td>
                <td>{vehicle.fuel}</td>
                <td>{vehicle.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default Vehicles
