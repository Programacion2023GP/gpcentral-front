import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { departmentCrudConfig } from "../../../hooks/departaments/departaments.model";
import useDepartamentsData from "../../../hooks/departaments/useDepartamentsData";
import useEmployeesData from "../../../hooks/employees/useEmployeesData";

const PageEmployees = ({}) => {
   const contextEmployees = useEmployeesData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Empleado",
               modalTitleUpdate: "Editar Empleado",
            }}
            hook={useDepartamentsData()}
            crudConfig={departmentCrudConfig}
         />
      </>
   );
};

export default PageEmployees;
