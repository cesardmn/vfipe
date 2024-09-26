import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider'
import { useStep } from '@/app/providers/StepProvider'
import { useEffect, useState } from 'react'

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs()
  const { step } = useStep()
  const [crumbs, setCrumbs] = useState([])

  useEffect(() => {
    setCrumbs(breadcrumbs)
  }, [step, breadcrumbs])

  return (
    <div >
      {
        crumbs.map((crumb, index) => (
          <>
            <span key={crumb} >{crumb}</span>
            {index < crumbs.length - 1 && <span>»</span>}
          </>
        ))
      }
    </div>
  )
}

export default Breadcrumbs
