import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider';
import { useStep } from '@/app/providers/StepProvider';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
  const { step, setStep } = useStep();
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    setCrumbs(breadcrumbs);
  }, [step, breadcrumbs]);

  const handleClick = (e) => {
    const index = e.target.id

    if (index == 0) {
      const newStep = {
        refId: step.refId,
        typeId: '',
        brandId: '',
        modelId: ''
      }
      setStep(newStep)
    }

    if (index == 1) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: '',
        modelId: ''
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 2)
      setBreadcrumbs(newCrumbs)
    }

    if (index == 2) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: step.brandId,
        modelId: ''
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 3)
      setBreadcrumbs(newCrumbs)
    }

  };

  return (
    <div>
      {crumbs.map((crumb, index) => (
        <span key={index} id={index} onClick={handleClick}>
          {crumb}
          {index < crumbs.length - 1 && <span> » </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
