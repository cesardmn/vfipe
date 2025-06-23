import { create } from 'zustand';

export const useFipe = create((set) => ({
  referenceTableList: [],
  setReferenceTableList: (reference) => set({ referenceTableList: reference }),

  refId: '',
  setRefId: (id) => set({ refId: id }),

  type: {},
  setType: (obj) => set({ type: obj }),

  typeId: '',
  setTypeId: (id) => set({ typeId: id }),

  brandList: {},
  setBrandList: (obj) => set({ brandList: obj }),

  brandId: '',
  setBrandId: (id) => set({ brandId: id }),

  modelList: {},
  setModelList: (obj) => set({ modelList: obj }),

  modelId: '',
  setModelId: (id) => set({ modelId: id }),

  modelYearsList: {},
  setModelYearsList: (obj) => set({ modelYearsList: obj }),

  modelYearsId: '',
  setModelYearsId: (id) => set({ modelYearsId: id }),


  resultShow: '',
  setResultShow: (id) => set({ resultShow: id }),

}));

