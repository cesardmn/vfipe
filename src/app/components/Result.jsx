import { useFipe } from '../../store/fipeStore'
import Brands from './Brands'

const Result = () => {

  const { brandList } = useFipe()

  return (
    <div className="">
      {
        brandList.length > 0 ?
        <Brands />:
        <></>
      }
    </div>
  )
}

export default Result
