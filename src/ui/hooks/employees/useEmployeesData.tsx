// hooks/useEmployeesData.ts
import { useMemo } from "react";
import type { EmployeeForm, EmployeeTableRow } from "./employees.model";
import {
   GenericDataReturn,
   useGenericData,
} from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Employees> en la page

export type extraStates = {
   directors: EmployeeTableRow[];
};
export type extraStatesMethods = {
   getDirectors: () => void;
   changeDirectorAssignment: (
      assignment_id: number,
      new_employee_id: number,
      new_position_uuid: string,
   ) => void;
};

export type EmployeesDataReturn = GenericDataReturn<
   EmployeeForm,
   extraStatesMethods,
   {},
   extraStates
>;

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

         employee_id: 0,
      }),
      [],
   );

   return useGenericData<EmployeeForm, extraStatesMethods, {}, extraStates>({
      initialState: initialState,
      prefix: "employees",
      autoFetch: true,
      // persistKey: "employee-persist",
      extraState: {
         directors: [],
      },
      extension: (set, get) => ({
         getDirectors: async () => {
            const data = await get().request({
               url: `${get().prefix}/directors`,
               method: "GET",
            });
            set({ directors: data as EmployeeTableRow[] });
         },
         changeDirectorAssignment: async (
            assignment_id: number,
            new_employee_id: number,
            new_position_uuid: string,
         ) => {
            const res: any = await get().request({
               url: `${get().prefix}/change-director-assignment`,
               data: {
                  assignment_id,
                  new_employee_id,
                  new_position_uuid,
                  start_date: new Date(),
               },
               method: "POST",
            });
            return res;
         },
      }),
      hooks: {
         onError: (msg) => console.error("[Employees]", msg),
      },
   });
};

export default useEmployeesData;
