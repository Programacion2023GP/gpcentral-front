// hooks/useDepartmentsData.ts
import { useMemo } from "react";
import type { PositionForm } from "./positions.model";
import { GenericDataReturn, useGenericData } from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Positions> en la page

export type PositionsDataReturn = GenericDataReturn<PositionForm>;

const usePositionsData = (): PositionsDataReturn => {
   const initialState = useMemo<PositionForm>(
      () => ({
         id: 0,
         uuid: "",
         // department_uuid: "",
         name: "",
         parent_position_uuid: "",
         start_date: new Date().toString(),
         end_date: "",
         active: true,
         updated_at: "",
      }),
      [],
   );

   return useGenericData<PositionForm>({
      initialState: initialState,
      prefix: "positions",
      autoFetch: true,
      // persistKey: "position-persist",
      hooks: {
         onError: (msg) => console.error("[Positions]", msg),
      },
   });
};

export default usePositionsData;
