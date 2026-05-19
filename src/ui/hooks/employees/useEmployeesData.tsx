// hooks/useEmployeesData.ts
import { useMemo } from "react";
import { useGenericData, type GenericDataReturn } from "react-zustore";
import type { EmployeeForm } from "./employees.model";

// ✅ Exportado — necesario para SuperCrud<Employees> en la page

export type EmployeesDataReturn = GenericDataReturn<EmployeeForm>;

const useEmployeesData = (): EmployeesDataReturn => {
   const initialState = useMemo<EmployeeForm>(
      () => ({
         
      }),
      [],
   );

   return useGenericData<EmployeeForm>({
      defaultValues: initialState,
      prefix: "employees",
      autoFetch: true,
      // persistKey: "employee-persist",
      hooks: {
         onError: (msg) => console.error("[Employees]", msg),
      },
   });
};

export default useEmployeesData;
