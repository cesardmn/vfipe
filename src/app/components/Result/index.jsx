import { useStep } from '@/app/providers/StepProvider';
import Brands from '@/app/components/Brands';
import Models from '@/app/components/Models';
import Vehicles from '@/app/components/Vehicles';
import styles from './styles.module.css'

const Result = () => {
  const { step } = useStep();

  return (
    <div className={styles.result}>
      {step.refId !== '' && step.typeId !== '' && step.brandId === '' && <Brands />}
      {step.refId !== '' && step.typeId !== '' && step.brandId !== '' && step.modelId === '' && <Models />}
      {step.refId !== '' && step.typeId !== '' && step.brandId !== '' && step.modelId !== '' && <Vehicles />}
    </div>
  );
};

export default Result;
