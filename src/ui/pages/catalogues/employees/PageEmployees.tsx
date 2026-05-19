import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import { employeeCrudConfig } from "../../../hooks/employees/employees.model";
import useEmployeesData from "../../../hooks/employees/useEmployeesData";

const PageEmployees = ({}) => {
   // const contextEmployees = useEmployeesData();
   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Empleado",
               modalTitleUpdate: "Editar Empleado",
            }}
            hook={useEmployeesData()}
            crudConfig={employeeCrudConfig}
         />
      </>
   );
};

export default PageEmployees;
