import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'
import { useStep } from '@/app/providers/StepProvider'
import { useEffect, useState } from 'react'

const Breadcrumbs = () => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()
  const { step, setStep } = useStep()
  const [crumbs, setCrumbs] = useState([])

  useEffect(() => {
    setCrumbs(breadcrumbs)
  }, [step, breadcrumbs])

  const handleClick = (e) => {
    const index = Number(e.target.id)

    if (index === 0) {
      const newStep = {
        refId: step.refId,
        typeId: '',
        brandId: '',
        modelId: '',
      }
      setStep(newStep)
    }

    if (index === 1) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: '',
        modelId: '',
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 2)
      setBreadcrumbs(newCrumbs)
    }

    if (index === 2) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: step.brandId,
        modelId: '',
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 3)
      setBreadcrumbs(newCrumbs)
    }
  }

  return (
    <div className="flex items-center space-x-2 bg-bk-1 p-3 rounded-lg shadow border border-bk-3">
      {crumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          <button
            id={index}
            className={`text-sm ${
              index === crumbs.length - 1
                ? 'text-or-1 font-semibold cursor-default'
                : 'text-gr-1 hover:text-or-2 transition-colors'
            }`}
            onClick={handleClick}
          >
            {crumb}
          </button>
          {index < crumbs.length - 1 && (
            <span className="mx-2 text-gr-2">/</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
