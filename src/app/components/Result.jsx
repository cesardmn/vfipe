import { useStep } from '@/app/providers/StepProvider'
import Brands from '@/app/components/Brands'
import Models from '@/app/components/Models'
import Vehicles from '@/app/components/Vehicles'

const Result = () => {
  const { step } = useStep()

  return (
    <div className="">
      {step.refId !== '' && step.typeId !== '' && step.brandId === '' && (
        <Brands />
      )}
      {step.refId !== '' &&
        step.typeId !== '' &&
        step.brandId !== '' &&
        step.modelId === '' && <Models />}
      {step.refId !== '' &&
        step.typeId !== '' &&
        step.brandId !== '' &&
        step.modelId !== '' && <Vehicles />}
    </div>
  )
}

export default Result
