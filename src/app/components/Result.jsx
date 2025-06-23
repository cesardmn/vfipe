import { useFipe } from '../../store/fipeStore'
import Brands from './Brands'
import Models from './Models'
import Vehicles from './Vehicles'

const Result = () => {

  const { brandList, resultShow } = useFipe()

  return (
    <div className="">
      {
        resultShow ===  'brands' &&
        <Brands />
      }

      {
        resultShow ===  'models' &&
        <Models />
      }

      {
        resultShow ===  'vehicles' &&
        <Vehicles />
      }
    </div>
  )
}

export default Result
