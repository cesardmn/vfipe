import { useFipe } from '../../store/fipeStore'

const ReferenceDrop = () => {
  const { referenceTableList, setRefId } = useFipe()

  const handleChange = (e) => {
    const id = e.target.value
    setRefId(id)
  }

  return (
    <div className="w-full">
      <label
        htmlFor="referenceSelect"
        className="block mb-2 text-xs font-medium text-gr-2  uppercase"
      >
        tabela de referência
      </label>
      <select
        id="referenceSelect"
        onChange={handleChange}
        className="w-full h-12 px-4 py-2 rounded-lg bg-bk-1 text-wt-2 border border-bk-3 shadow-md focus:outline-none focus:ring-2 focus:ring-or-2 transition-colors"
      >
        {referenceTableList?.map((ref) => (
          <option key={ref.id} value={ref.id} className="bg-bk-1 text-wt-">
            {ref.description}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ReferenceDrop
