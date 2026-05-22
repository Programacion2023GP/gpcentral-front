import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { organizationCrudConfig } from "../../../hooks/organizations/organizations.model";
import useOrganizationsData from "../../../hooks/organizations/useOrganizationsData";

const PageOrganizations = ({}) => {
   // const contextOrganizations = useOrganizationsData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Organización",
               modalTitleUpdate: "Editar Organización",
            }}
            hook={useOrganizationsData()}
            crudConfig={organizationCrudConfig}
         />
      </>
   );
};

export default PageOrganizations;
