import { useStep } from "@/app/providers/StepProvider";
import { fetchData } from "@/services/FetchData";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";

import styles from './styles.module.css'

const Vehicles = () => {
  const { step } = useStep();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVehicles = async () => {
    const { refId, typeId, brandId, modelId } = step;
    setLoading(true);
  
    try {
      const years = await fetchData(`/api/anomodelo/${refId}/${typeId}/${brandId}/${modelId}`);
      
      const vehiclesData = await years.reduce(async (acc, year) => {
        const accumulatedVehicles = await acc; // Aguarda o acumulador
        const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`;
        
        try {
          const vehicleData = await fetchData(url);
          return [...accumulatedVehicles, vehicleData]; // Adiciona o veículo ao acumulador
        } catch (error) {
          console.error(`Error fetching vehicle for year ${year.id}:`, error);
          return accumulatedVehicles; // Retorna o acumulador mesmo em caso de erro
        }
  
      }, Promise.resolve([])); // Começa com uma promessa resolvida que contém um array vazio
  
      setVehicles(vehiclesData);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (step.refId && step.typeId && step.brandId && step.modelId) {
      handleVehicles();
    }
  }, [step]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.tableContainer} >
      <table className={styles.table} >
        <caption>
          {`Código FIPE: ${(vehicles.length > 0) && vehicles[0].fipe}`}
        </caption>
        <thead>
          <tr>
            <th>ano</th>
            <th>combustível</th>
            <th>valor</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.authentication}>
              <td>{vehicle.year == '32000' ? 'Zero Km' : vehicle.year}</td>
              <td>{vehicle.fuel}</td>
              <td>{vehicle.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
