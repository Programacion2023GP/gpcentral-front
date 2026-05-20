import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { userCrudConfig } from "../../../hooks/users/users.model";
import useUsersData from "../../../hooks/users/useUsersdata";

const PageUsers = ({}) => {
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Usuario",
               modalTitleUpdate: "Editar Usuario",
            }}
            hook={useUsersData()}
            crudConfig={userCrudConfig}
         />
      </>
   );
};

export default PageUsers;
