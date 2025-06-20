// page.jsx
'use client'

import ReferenceDrop from './components/ReferenceDrop'
import TypeButtons from './components/TypeButtons'
import Result from './components/Result'
import Breadcrumbs from './components/Breadcrumbs'
import { useStep } from '@/app/providers/StepProvider'

const Consulta = () => {
  const { step } = useStep()
  const { typeId } = step

  return (
    <div className="h-full bg-bk-2 rounded-xl shadow-lg overflow-hidden border border-bk-3 flex flex-col">
      {/* Breadcrumbs */}
      <div className="px-6 py-4 border-b border-bk-3 shrink-0">
        <Breadcrumbs />
      </div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        {/* Sidebar */}
        <div
          className={`lg:w-1/4 p-6 bg-bk-1 border-b lg:border-r border-bk-3 ${typeId ? 'hidden lg:block' : ''} flex flex-col min-h-0`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex flex-col gap-4 flex-1">
              <ReferenceDrop />
              {typeId === '' && (
                <>
                  <h3 className="text-xs font-medium text-gr-1 uppercase tracking-wider shrink-0 mt-8">
                    Tipo de Veículo
                  </h3>
                  <TypeButtons />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-6 bg-bk-1 ${typeId ? 'lg:w-full' : 'lg:w-3/4'} min-h-0 overflow-auto`}
        >
          <Result />
        </div>
      </div>
    </div>
  )
}

export default Consulta
