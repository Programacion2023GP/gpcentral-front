// hooks/useDepartmentDirectorData.ts
import { useMemo } from "react";
import {
   DepartmentDirectorForm,
   DepartmentDirectorTableRow,
} from "./departamentDirector.model";
import {
   GenericDataReturn,
   useGenericData,
} from "../../../library/reactztore/hook/usegenericdata";
import { EmployeeTableRow } from "../employees/employees.model";

// ✅ Exportado — necesario para SuperCrud<DepartmentDirector> en la page
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
type LinkDirector = {
   toggleModalLinkDepartmentDirector: boolean;
   directorsHistory: DepartmentDirectorTableRow[]; // DirectorHistory[];
};
interface ILinkDirector {
   toggleModal: () => void;
   getDirectorsHistory: (department_uuid: string) => void;
}

export type DepartmentDirectorDataReturn = GenericDataReturn<
   DepartmentDirectorForm,
   ILinkDirector,
   {},
   LinkDirector
>;

const useDepartmentDirectorData = (): DepartmentDirectorDataReturn => {
   const initialState = useMemo<DepartmentDirectorForm>(
      () => ({
         id: 0,
         employee_id: 0,
         department_uuid: "",
         position_uuid: "",
         start_date: new Date(),
         end_date: null,
         active: true,
         created_at: "",
         updated_at: "",
         deleted_at: "",
         // solo para el DepartmentDirector-Director
         assignment_id: 0,
         director_employee_id: 0,
         organization_name: "",
      }),
      [],
   );

   return useGenericData<
      DepartmentDirectorForm,
      ILinkDirector,
      {},
      LinkDirector
   >({
      initialState: initialState,
      prefix: "departments",
      autoFetch: true,
      // persistKey: "departments-persist",
      extraState: {
         toggleModalLinkDepartmentDirector: false,
         directorsHistory: [],
      },
      extension: (set, get) => ({
         toggleModal: () => {
            set({
               toggleModalLinkDepartmentDirector:
                  !get().toggleModalLinkDepartmentDirector,
            });
         },
         getDirectorsHistory: async (department_uuid: string) => {
            const data = await get().request({
               url: `${get().prefix}/directors`,
               data: { department_uuid: department_uuid },
               method: "POST",
            });
            set({
               directorsHistory: data as any,
            });
         },
      }),
      hooks: {
         onError: (msg) => console.error("[DepartmentDirector]", msg),
      },
   });
};

export default useDepartmentDirectorData;
