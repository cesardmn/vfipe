import { useFipe } from '../../store/fipeStore'
const Breadcrumbs = () => {
  const { refId, type } = useFipe()

  return (
    <div className="flex items-center space-x-2 bg-bk-1 p-3 rounded-lg shadow border border-bk-3 font-bold cursor-pointer">
      {!!refId && (
        <div className="flex items-center">
          <button className="ml-2 text-sm text-wt-3  cursor-pointer hover:text-or-2">
            tabela referência
          </button>
        </div>
      )}

      {!!type && (
        <div className="flex items-center">
          <button className="ml-2 text-sm text-wt-3  cursor-pointer hover:text-or-2">
            {type.description}
          </button>
        </div>
      )}
    </div>
  )
}

export default Breadcrumbs
