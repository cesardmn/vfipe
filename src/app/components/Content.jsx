'use client'

import ReferenceDrop from './ReferenceDrop'
import Breadcrumbs from './Breadcrumbs'
import TypeButtons from './TypeButtons'
import Result from './Result'
import Skeleton from './Skeleton'
import { useFipe } from '../../store/fipeStore'

const Content = () => {
  const { referenceTableList, isLoading, typeId } = useFipe()

  const isLoadingReference =
    isLoading.reference || referenceTableList.length === 0

  return (
    <main className="flex-1 min-h-0 overflow-hidden lg:h-full max-h-[40rem] bg-bk-2 rounded-xl shadow-lg border border-bk-3 flex flex-col">
      {/* Optional Breadcrumbs */}
      {/* <div className="px-6 py-4 border-b border-bk-3 shrink-0">
        <Breadcrumbs />
      </div> */}

      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="lg:w-1/4 p-6 bg-bk-1 border-b lg:border-r border-bk-3 flex flex-col min-h-0 gap-6">
          <h2 className="text-lg font-semibold text-wt-1">Filtros</h2>
          {isLoadingReference ? (
            <Skeleton rows={2} />
          ) : (
            <>
              <ReferenceDrop />
              <TypeButtons />
            </>
          )}
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 bg-bk-1 lg:w-3/4 min-h-0 overflow-auto">
          {isLoadingReference ? (
            <Skeleton rows={4} />
          ) : typeId ? (
            <Result />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-wt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-4 text-wt-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-4H5l7-8v4h4l-7 8z"
                />
              </svg>
              <p className="text-base font-medium">
                Selecione um <strong>tipo de veículo</strong> para começar.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Content
