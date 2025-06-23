import { useFipe } from '../../store/fipeStore'
import Brands from './Brands'
import Models from './Models'
import Skeleton from './Skeleton'
import Vehicles from './Vehicles'

const Result = () => {
  const { resultShow, isLoading, brandList, modelList, vehicleList } = useFipe()

  // Helper para verificar se os dados necessários ainda não estão prontos
  const isWaiting = () => {
    if (isLoading.result) return true

    if (resultShow === 'brands' && brandList.length === 0) return true
    if (resultShow === 'models' && modelList.length === 0) return true
    if (resultShow === 'vehicles' && vehicleList.length === 0) return true

    return false
  }

  return (
    <div>
      {isWaiting() ? (
        <Skeleton rows={3} />
      ) : resultShow === 'brands' ? (
        <Brands />
      ) : resultShow === 'models' ? (
        <Models />
      ) : resultShow === 'vehicles' ? (
        <Vehicles />
      ) : null}
    </div>
  )
}

export default Result
