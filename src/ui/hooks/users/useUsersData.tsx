// hooks/useUsersData.ts
import { useMemo } from "react";
import type { UserForm } from "./users.model";
import { GenericDataReturn, useGenericData } from "../../../library/reactztore/hook/usegenericdata";

// ✅ Exportado — necesario para SuperCrud<Users> en la page

export type UsersDataReturn = GenericDataReturn<UserForm>;

const useUsersData = (): UsersDataReturn => {
   const initialState = useMemo<UserForm>(
      () => ({
         id: 0,
         employee_id: 0,
         username: "",
         email: "",
         password: "123456",
         active: true,
      }),
      [],
   );

   return useGenericData<UserForm>({
      initialState: initialState,
      prefix: "users",
      autoFetch: true,
      // persistKey: "user-persist",
      hooks: {
         onError: (msg) => console.error("[Users]", msg),
      },
   });
};

export default useUsersData;
