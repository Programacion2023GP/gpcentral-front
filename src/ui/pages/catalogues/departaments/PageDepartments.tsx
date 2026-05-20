import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { departmentCrudConfig } from "../../../hooks/departaments/departaments.model";
import useDepartmentsData from "../../../hooks/departaments/useDepartamentsData";

const PageDepartments = ({}) => {
   // const contextOrganizations = useOrganizationsData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Departamento",
               modalTitleUpdate: "Editar Departamento",
            }}
            hook={useDepartmentsData()}
            crudConfig={departmentCrudConfig}
         />
      </>
   );
};

export default PageDepartments;
