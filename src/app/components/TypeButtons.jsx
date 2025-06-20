import { useStep } from '@/app/providers/StepProvider'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'
import { FaMotorcycle, FaCar, FaTruck } from 'react-icons/fa'

const TypeButtons = () => {
  const { step, setStep } = useStep()
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()
  const sizeIcon = 24
  const types = {
    1: { label: 'Carros', icon: <FaCar size={sizeIcon} /> },
    2: { label: 'Motos', icon: <FaMotorcycle size={sizeIcon} /> },
    3: { label: 'Caminhões', icon: <FaTruck size={sizeIcon} /> },
  }

  const handleType = (id) => {
    setStep((prev) => ({
      ...prev,
      typeId: id,
      brandId: '',
      modelId: '',
    }))
    setBreadcrumbs([breadcrumbs[0], types[id].label])
  }

  if (!step.refId) return null

  return (
    <div className="flex flex-col gap-3 w-full">
      {Object.entries(types).map(([id, { label, icon }]) => (
        <button
          key={id}
          onClick={() => handleType(Number(id))}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all border-2 ${
            step.typeId === Number(id)
              ? 'bg-or-2/10 border-or-2 text-or-1'
              : 'bg-bk-1 border-bk-3 text-wt-1 hover:bg-bk-2 hover:border-or-1'
          }`}
        >
          <div
            className={`${
              step.typeId === Number(id) ? 'text-or-1' : 'text-gr-1'
            } transition-colors`}
          >
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default TypeButtons
