import { useStep } from '@/app/providers/StepProvider'
import Brands from '@/app/components/Brands';

const Result = () => {
  const { step } = useStep()

  return (
    <div>

      {
        (step.refId !== '' && step.typeId !== '' && step.modelId === '') && <Brands />

        
      }
    </div>
  );
};

export default Result;
