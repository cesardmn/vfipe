import { useFipe } from '../../store/fipeStore'
import { fetchAndCacheData } from '../../services/FetchData'
const ModelYear = () => {

  const {
    refId,
    typeId,
    brandId,
    modelId,
    modelList,
    modelYearsList
  } = useFipe()

  // const dormatedModelYears = modelYearsList.map((year) => ({
  //   id: year.Value, description: year.Label

  // }))

  console.log(modelYearsList)


  return (
    <h3>Ano Modelo</h3>
  )
}

export default ModelYear