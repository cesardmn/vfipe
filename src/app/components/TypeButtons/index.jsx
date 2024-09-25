import styles from './styles.module.css'
import { useStep } from '@/app/providers/StepProvider'

const TypeButtons = () => {

  const { step, setStep } = useStep()

  const handleType = (id) => {
    const newStep = {...step}
    newStep.typeId = id
    setStep(newStep)
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