import { useStep } from '@/app/providers/StepProvider';
import Brands from '@/app/components/Brands';
import Models from '@/app/components/Models';

const Result = () => {
  const { step } = useStep();

  return (
    <div>
      {step.refId !== '' && step.typeId !== '' && step.brandId === '' && <Brands />}
      {step.refId !== '' && step.typeId !== '' && step.brandId !== '' && step.modelId === '' && <Models />}
    </div>
  );
};

export default Result;
