import { FormikTouched, FormikErrors } from "formik";
import SuperCrud from "../../../components/compositecustoms/compositeCrud";
import CustomModal from "../../../components/modal/modal";
import FormikForm from "../../../formik/Formik";
import { departmentCrudConfig } from "../../../hooks/departaments/departaments.model";
import useDepartmentsData from "../../../hooks/departaments/useDepartamentsData";
import CustomTable from "../../../components/table/customtable";
import PhotoZoom from "./../../../components/images/images";
import { env } from "../../../../constant";
import { formatDatetime } from "../../../../utils/helpers";
import {
   FormikAutocomplete,
   FormikInput,
} from "../../../formik/FormikInputs/FormikInput";
import useEmployeesData from "../../../hooks/employees/useEmployeesData";
import { useEffect } from "react";
import useDepartmentDirectorData from "../../../hooks/departaments/useDepartamentDirectorData";

const PageDepartments = ({}) => {
   const useHook = useDepartmentsData();
   const useHookEmployees = useEmployeesData();
   const useHookDepartmentDirector = useDepartmentDirectorData();
   // const contextOrganizations = useOrganizationsData();

   useEffect(() => {
      useHookEmployees.getDirectors();
   }, []);

   return (
      <>
         <SuperCrud
            formTitles={{
               modalTitleAdd: "Agregar Departamento",
               modalTitleUpdate: "Editar Departamento",
            }}
            hook={useHook}
            crudConfig={departmentCrudConfig}
            actionsDispatch={{
               useDepartmentDirector: useHookDepartmentDirector,
            }}
         />
         <CustomModal
            isOpen={useHookDepartmentDirector.toggleModalLinkDepartmentDirector}
            onClose={useHookDepartmentDirector.toggleModal}
            title={"Vincular Departamento - Director"}>
            <>
               <FormikForm
                  key={useHookDepartmentDirector.initialValues.assignment_id}
                  initialValues={useHookDepartmentDirector.initialValues}
                  onSubmit={async (values) => {
                     // console.log("🚀 ~ PageDepartments ~ values:", values);
                     const res: any =
                        await useHookEmployees.changeDirectorAssignment(
                           values.assignment_id,
                           values.director_employee_id,
                           values.position_uuid,
                        );
                     // useHookDepartmentDirector.setField(
                     //    "assignment_id",
                     //    res.id,
                     // );
                     useHookDepartmentDirector.handleChangeItem({
                        ...values,
                        assignment_id: res.id,
                     });
                     useHookDepartmentDirector.getDirectorsHistory(
                        values.department_uuid,
                     );
                  }}
                  buttonMessage="VINCULAR DIRECTOR"
                  children={(values) => (
                     <>
                        <FormikInput
                           name={"organization_name"}
                           label={"Organización"}
                           disabled={true}
                           responsive={{ md: 6 }}
                        />
                        <FormikInput
                           name={"name"}
                           label={"Departamento"}
                           disabled={true}
                           responsive={{ md: 6 }}
                        />
                        <FormikAutocomplete
                           name={"director_employee_id"}
                           label={"Director a asignar"}
                           options={useHookEmployees.directors}
                           idKey={"employee_id"}
                           labelKey={"full_name"}
                           onRefresh={() => useHookEmployees.getDirectors()}
                        />
                     </>
                  )}
               />
               <div className="w-full h-5"></div>

               <CustomTable
                  data={useHookDepartmentDirector.directorsHistory}
                  paginate={[10, 5, 20, 50, 100, 500, 1000]}
                  title="Historial de Directores"
                  refreshData={() =>
                     useHookDepartmentDirector.getDirectorsHistory(
                        useHookDepartmentDirector.initialValues.department_uuid,
                     )
                  }
                  columns={[
                     {
                        field: "director_avatar",
                        headerName: "Foto",
                        renderField: (value, row) => (
                           <PhotoZoom alt={""} src={value} />
                        ),
                     },
                     {
                        field: "director_signature_image",
                        headerName: "Firma",
                        renderField: (value, row) => (
                           <PhotoZoom alt={""} src={value} />
                        ),
                     },
                     {
                        field: "director_employee_code",
                        headerName: "No. Nomina",
                        renderField: (value, row) => <b>{value}</b>,
                     },
                     { field: "director_name", headerName: "Director" },
                     { field: "position_name", headerName: "Puesto" },
                     {
                        field: "assignment_start",
                        headerName: "Fecha Inicio",
                        renderField: (value, row) => (
                           <>{formatDatetime(value, false)}</>
                        ),
                     },
                     {
                        field: "assignment_end",
                        headerName: "Fecha Fin",
                        renderField: (value, row) => (
                           <>{formatDatetime(value, false)}</>
                        ),
                     },
                     {
                        field: "assignment_active",
                        headerName: "Vigente",
                        renderField: (value) => {
                           const statusConfig: Record<
                              string,
                              {
                                 bg: string;
                                 text: string;
                                 dot: string;
                                 label: string;
                              }
                           > = {
                              true: {
                                 bg: "bg-green-100",
                                 text: "text-green-800",
                                 dot: "bg-green-500",
                                 label: "Activo",
                              },
                              false: {
                                 bg: "bg-gray-100",
                                 text: "text-gray-800",
                                 dot: "bg-gray-500",
                                 label: "Inactivo",
                              },
                           };
                           const config =
                              statusConfig[value ? "true" : "false"] ||
                              statusConfig.false;
                           return (
                              <span
                                 className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                                 <span
                                    className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
                                 {config.label}
                              </span>
                           );
                        },
                     },
                  ]}
               />
            </>
         </CustomModal>
      </>
   );
};

export default PageDepartments;
