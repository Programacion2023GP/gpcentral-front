// hooks/useDepartmentsData.ts
import { useMemo } from "react";
import type { DepartmentForm } from "./departaments.model";
import { GenericDataReturn, useGenericData } from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Departments> en la page

export type DepartmentsDataReturn = GenericDataReturn<DepartmentForm>;

const useDepartmentsData = (): DepartmentsDataReturn => {
   const initialState = useMemo<DepartmentForm>(
      () => ({
         id: 0,
         uuid: "",
         organization_id: 0,
         code: "",
         name: "",
         seal_image: "",
         start_date: null,
         end_date: null,
         active: true,
      }),
      [],
   );

   return useGenericData<DepartmentForm>({
      initialState: initialState,
      prefix: "departments",
      autoFetch: true,
      // persistKey: "departments-persist",
      hooks: {
         onError: (msg) => console.error("[Departments]", msg),
      },
   });
};

export default useDepartmentsData;
