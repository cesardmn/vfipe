import styles from './styles.module.css'
import { useStep } from '@/app/providers/StepProvider'
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider';


const TypeButtons = () => {
  
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()
  const { step, setStep } = useStep()

  const types = {
    1: "carros",
    2: "motos",
    3: "pesados"
  }


  const handleType = (id) => {
    const newStep = { ...step }
    newStep.typeId = id
    newStep.brandId = ''
    newStep.modelId = ''
    setStep(newStep)
    const newCrumbs = [breadcrumbs[0], types[id]]
    setBreadcrumbs(newCrumbs)

  }

  return (
    <div className={styles.buttonGroup}>
      {
        !!step.refId &&
        <>
          <button onClick={(e) => handleType(2)}>motos</button>
          <button onClick={(e) => handleType(1)}>carros</button>
          <button onClick={(e) => handleType(3)}>pesados</button>
        </>
      }
    </div>
  )
}

export default TypeButtons