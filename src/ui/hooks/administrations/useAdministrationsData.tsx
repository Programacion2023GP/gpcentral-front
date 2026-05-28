// hooks/useDepartmentsData.ts
import { useMemo } from "react";
import type { AdministrationForm } from "./administrations.model";
import { GenericDataReturn, useGenericData } from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Administrations> en la page

export type AdministrationsDataReturn = GenericDataReturn<AdministrationForm>;

const useAdministrationsData = (): AdministrationsDataReturn => {
   const initialState = useMemo<AdministrationForm>(
      () => ({
         id: 0,
         name: "",
         president_name: "",
         political_party: "",
         logo: null,
         logo_2: null,
         logo_3: null,
         primary_color: null,
         secondary_color: null,
         start_date: null,
         end_date: null,

         active: true,
         created_at: null,
         updated_at: null,
         deleted_at: null,
      }),
      [],
   );

   return useGenericData<AdministrationForm>({
      initialState: initialState,
      prefix: "administrations",
      autoFetch: true,
      // persistKey: "administration-persist",
      hooks: {
         onError: (msg) => console.error("[Administrations]", msg),
      },
   });
};

export default useAdministrationsData;
