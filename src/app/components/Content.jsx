'use client'

import Skeleton from './Skeleton'
import ReferenceDrop from './ReferenceDrop'
import { useLoading } from '@/app/providers/LoadingProvider'
import { useEffect } from 'react'
import { useFipe } from '../../store/fipeStore'
import { fetchAndCacheData } from '../../services/FetchData'
import Breadcrumbs from './Breadcrumbs'
import TypeButtons from './TypeButtons'
import Result  from './Result'

const Content = () => {
  const { setreferenceTableList, setRefId, refId } = useFipe()

  useEffect(() => {


    const fetchReference = async () => {
      const response = await fetchAndCacheData('/api/referencia')
      const { ok, data, status, statusText } = response

      if (ok) {
        const formatedData = data.map(item => ({
          id: item.Codigo,
          description: item.Mes.trim()
        }));
        setreferenceTableList(formatedData)
        setRefId(formatedData[0].id)
        console.log(statusText)
      }

      return response
    }

    fetchReference()

  }, [])


  return (
    <main className="flex-1 min-h-0 overflow-hidden lg:h-full max-h-[40rem] bg-bk-2 rounded-xl shadow-lg border border-bk-3 flex flex-col">

      <div className="px-6 py-4 border-b border-bk-3 shrink-0">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">

        <div className="lg:w-1/4 p-6 bg-bk-1 border-b lg:border-r border-bk-3 flex flex-col min-h-0 gap-6">
          <ReferenceDrop />
          <TypeButtons />
        </div>

        <div className="flex-1 p-6 bg-bk-1 lg:w-3/4 min-h-0 overflow-auto">
          <Result />
        </div>

      </div>
    </main>
  )
}

export default Content