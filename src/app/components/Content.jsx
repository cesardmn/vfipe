'use client'

import ReferenceDrop from './ReferenceDrop'
import Breadcrumbs from './Breadcrumbs'
import TypeButtons from './TypeButtons'
import Result from './Result'
import Skeleton from './Skeleton'
import { useFipe } from '../../store/fipeStore'


const Content = () => {
  const { referenceTableList, isLoading } = useFipe()


  return (
    <main className="flex-1 min-h-0 overflow-hidden lg:h-full max-h-[40rem] bg-bk-2 rounded-xl shadow-lg border border-bk-3 flex flex-col">

      <div className="px-6 py-4 border-b border-bk-3 shrink-0">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">

        <div className="lg:w-1/4 p-6 bg-bk-1 border-b lg:border-r border-bk-3 flex flex-col min-h-0 gap-6">
          {isLoading.reference || referenceTableList.length === 0 ? (
            <div className="flex items-center gap-3 w-[180px]">
              <Skeleton rows={4} />
            </div>
          ) : (
            <>
              <ReferenceDrop />
              <TypeButtons />
            </>
          )}
        </div>

        <div className="flex-1 p-6 bg-bk-1 lg:w-3/4 min-h-0 overflow-auto">
          <Result />
        </div>

      </div>
    </main>
  )
}

export default Content