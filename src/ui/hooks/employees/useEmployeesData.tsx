// hooks/useEmployeesData.ts
import { useMemo } from "react";
import type { EmployeeForm } from "./employees.model";
import { GenericDataReturn, useGenericData } from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Employees> en la page

export type EmployeesDataReturn = GenericDataReturn<EmployeeForm>;

const useEmployeesData = (): EmployeesDataReturn => {
   const initialState = useMemo<EmployeeForm>(
      () => ({
         id: 0,
         employee_code: 0,
         hire_date: "",
         active: true,
         name: "",
         plast_name: "",
         mlast_name: "",
         full_name: "",
         full_name_reverse: "",
         rfc: "",
         curp: "",
         gender: null,
         phone: "",
         avatar: "",
         signature_image: "",
         start_date: "",
         end_date: "",
         position_uuid: "",
         department_uuid: "",
         // created_at: "",
         employee_active: true,
         position_name: "",
         department_name: "",
         organization_id: 0,
         organization_name: "",
         administration_id: 0,
         administration_name: "",
         president_name: "",
         administration_logo: "",
         user_id: "",
         username: "",
         email: "",
         // password: "",
      }),
      [],
   );

   return useGenericData<EmployeeForm>({
      initialState: initialState,
      prefix: "employees",
      autoFetch: true,
      // persistKey: "employee-persist",
      hooks: {
         onError: (msg) => console.error("[Employees]", msg),
      },
   });
};

export default useEmployeesData;
