import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { administrationCrudConfig } from "../../../hooks/administrations/administrations.model";
import useAdministrationsData from "../../../hooks/administrations/useAdministrationsData";

const PageAdministrations = ({}) => {
   // const contextAdministrations = useAdministrationsData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Administración",
               modalTitleUpdate: "Editar Administración",
            }}
            hook={useAdministrationsData()}
            crudConfig={administrationCrudConfig}
         />
      </>
   );
};

export default PageAdministrations;
