import { createContext, useContext, useState } from 'react';

const StepContext = createContext();

const initial = {
  refId: '',
  typeId: '',
  brandId: '',
  modelId: '',
  yearId: '',
}

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(initial);

  return (
    <StepContext.Provider
      value={{ step, setStep }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);
