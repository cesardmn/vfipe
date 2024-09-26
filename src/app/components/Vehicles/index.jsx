import { useStep } from "@/app/providers/StepProvider";
import { fetchData } from "@/services/FetchData";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton";

const Vehicles = () => {
  const { step } = useStep();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVehicles = async () => {
    const { refId, typeId, brandId, modelId } = step;
    setLoading(true);

    try {
      const years = await fetchData(`/api/anomodelo/${refId}/${typeId}/${brandId}/${modelId}`);
      const vehiclePromises = years.map(async (year) => {
        const url = `/api/vehicle/${refId}/${typeId}/${brandId}/${modelId}/${year.id}`;
        return fetchData(url);
      });

      const vehiclesData = await Promise.all(vehiclePromises);
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
    <>
      {
        vehicles.length > 0 &&
        <span>{`${vehicles[0].brand} - ${vehicles[0].model}`}</span>}
      <table>
        <thead>
          <tr>
            <th>ano</th>
            <th>combustivel</th>
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
    </>
  );
};

export default Vehicles;
