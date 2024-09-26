import { useEffect, useState, useRef } from "react"
import { useStep } from "@/app/providers/StepProvider"
import { fetchData } from "@/services/FetchData"
import Skeleton from '@/app/components/Skeleton';

const Models = () => {

  const { step, setStep } = useStep()
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);


  const handleModels = async () => {
    setLoading(true)
    const data = await fetchData(`/api/modelos/${step.refId}/${step.typeId}/${step.brandId}`)
    setModels(data)
    setLoading(false)
  }

  useEffect(() => {
    handleModels()
    setSearchTerm('')
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [step])

  useEffect(() => {
    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
    const filtered = models.filter(item =>
      searchWords.every(word =>
        item.model.toLowerCase().includes(word)
      )
    );
    setResult(filtered);

  }, [searchTerm, models]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVehicle = (e) => {
    const newStep = { ...step }
    newStep.modelId = e.target.value
    setStep(newStep)
  }

  return (
    <>
      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Models..."
      />
      {
        loading ?
          <Skeleton /> :
          (
            <ul>
              {result.map(item => (
                <li
                  key={item.id}
                  value={item.id}
                  onClick={(e) => handleVehicle(e)}
                >
                  {item.model}
                </li>
              ))}
            </ul>
          )
      }
    </>
  )
}

export default Models



// import { useState, useEffect, useRef } from "react";
// import { useStep } from "@/app/providers/StepProvider"
// import Skeleton from '@/app/components/Skeleton';
// import { fetchData } from "@/services/FetchData";


// const Models = () => {
//   const { step, setStep } = useStep()
//   const [loading, setLoading] = useState(false);
//   const [models, setModels] = useState([])
//   const [result, setResult] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const searchInputRef = useRef(null);


//   const handleModels = async () => {
//     setLoading(true);
//     if (step.modelId !== '') {
//       const data = await fetchData(`/api/modelos/${step.refId}/${step.typeId}/${step.modelId}`)
//       console.log(data)
//       setModels(data)
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     handleModels();
//     setSearchTerm('')
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [step]);

//   useEffect(() => {
//     const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
//     const filtered = models.filter(item =>
//       searchWords.every(word =>
//         item.model.toLowerCase().includes(word)
//       )
//     );
//     setResult(filtered);
//   }, [searchTerm, models]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };


//   return (
//     <>
//       {loading ? (
//         <Skeleton />
//       ) : (
//         <>
//           <input
//             type="search"
//             ref={searchInputRef}
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search models..."
//           />
//           <ul>
//             {result.map(item => (
//               <li
//                 key={item.id}
//                 value={item.id}
//                 // onClick={(e) => handleModel(e)}
//                 >
//                 {item.model}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </>
//   );
// };



// export default Models
