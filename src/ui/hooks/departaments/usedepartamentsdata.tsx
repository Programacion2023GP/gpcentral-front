// hooks/useDepartmentsData.ts
import { useMemo } from "react";
import type { DepartmentForm } from "./departaments.model";
import {
   GenericDataReturn,
   useGenericData,
} from "../../../library/reactztore/hook/usegenericdata";
import { EmployeeTableRow } from "../employees/employees.model";

// ✅ Exportado — necesario para SuperCrud<Departments> en la page
// export type DirectorHistory = Pick<
//    EmployeeTableRow,
//    | "assignment_id"
//    | "avatar"
//    | "signature_image"
//    | "employee_code"
//    | "full_name"
//    | "position_start"
//    | "position_end"
//    | "position_active"
// >;
// type LinkDirector = {
//    toggleModalLinkDepartmentDirector: boolean;
//    directorsHistory: DirectorHistory[];
// };
// interface ILinkDirector {
//    toggleModal: () => void;
//    getDirectorsHistory: (department_uuid: string) => void;
// }

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

         assignment_id: 0,
         director_employee_id: 0,
         organization_name: "",
      }),
      [],
   );

   return useGenericData<DepartmentForm>({
      initialState: initialState,
      prefix: "departments",
      autoFetch: true,
      // persistKey: "departments-persist",
      extraState: {
         // toggleModalLinkDepartmentDirector: false,
         // directorsHistory: [],
      },
      extension: (set, get) => ({
         // toggleModal: () => {
         //    set({
         //       toggleModalLinkDepartmentDirector:
         //          !get().toggleModalLinkDepartmentDirector,
         //    });
         // },
         // getDirectorsHistory: async (department_uuid: string) => {
         //    const data = await get().request({
         //       url: `${get().prefix}/directors`,
         //       data: { uuid: department_uuid },
         //       method: "POST",
         //    });
         //    // console.log("🚀 ~ useDepartmentsData ~ data:", data);
         //    set({
         //       directorsHistory: data as any,
         //    });
         // },
      }),
      hooks: {
         onError: (msg) => console.error("[Departments]", msg),
      },
   });
};

export default useDepartmentsData;
