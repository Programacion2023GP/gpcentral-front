import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { employeeCrudConfig } from "../../../hooks/employees/employees.model";
import useDepartamentsData from "../../../hooks/departaments/useDepartamentsData";
import useOrganizationsData from "../../../hooks/organization/useOrganizationsData";

const PageDepartments = ({}) => {
   const contextOrganizations = useOrganizationsData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Departamento",
               modalTitleUpdate: "Editar Departamento",
            }}
            hook={useDepartamentsData()}
            crudConfig={employeeCrudConfig}
         />
      </>
   );
};

export default PageDepartments;
