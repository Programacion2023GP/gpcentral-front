// hooks/useDepartmentsData.ts
import { useMemo } from "react";
import { useGenericData, type GenericDataReturn } from "react-zustore";
import type { OrganizationForm } from "./organizations.model";

// ✅ Exportado — necesario para SuperCrud<Organizations> en la page

export type OrganizationsDataReturn = GenericDataReturn<OrganizationForm>;

const useOrganizationsData = (): OrganizationsDataReturn => {
   const initialState = useMemo<OrganizationForm>(
      () => ({
         id: 0,
         code: null,
         name: null,
         active: true,
         created_at: null,
         updated_at: null,
         deleted_at: null,
      }),
      [],
   );

   return useGenericData<OrganizationForm>({
      defaultValues: initialState,
      prefix: "organizations",
      autoFetch: true,
      // persistKey: "organization-persist",
      hooks: {
         onError: (msg) => console.error("[Organizations]", msg),
      },
   });
};

export default useOrganizationsData;
