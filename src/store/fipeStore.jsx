import { create } from 'zustand';

export const useFipe = create((set) => ({
  referenceTableList: [],
  setreferenceTableList: (reference) => set({ referenceTableList: reference }),
  
  refId: '',
  setRefId: (id) => set({ refId: id }),
  
  typeId: '',
  setTypeId: (id) => set({ typeId: id }),
  
  type: {},
  setType: (obj) => set({ type: obj }),
  
  brandList: {},
  setBrandList: (obj) => set({ brandList: obj }),

}));

