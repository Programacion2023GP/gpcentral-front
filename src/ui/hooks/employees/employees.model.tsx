// config/employees.crud.ts
import { env } from "../../../constant";
import { ConfigCrud } from "../../../models/genericmodels.model";
import { formatDatetime, formatPhone } from "../../../utils/helpers";
import PhotoZoom from "../../components/images/images";
import useDepartmentsData from "../departaments/useDepartamentsData";
import usePositionsData from "../positions/usePositionsData";
import icons from "./../../../constant/icons";

// 1. Interfaz del formulario (lo que se guarda en BD)
export interface EmployeeForm {
   id: number;
   employee_code: number | null;
   hire_date: string;
   email: string | null;
   active: boolean;

   name: string | null;
   plast_name: string | null;
   mlast_name: string | null;
   full_name: string | null;
   full_name_reverse: string | null;
   rfc: string | null;
   curp: string | null;
   gender: "M" | "F" | null;
   phone: string | null;
   avatar: string | null;
   signature_image: string | null;
   start_date: Date | string | null;
   end_date: Date | string | null;

   position_uuid: string | null;

   department_uuid: string | null;

   //  metadata: {
   //     department_id?: number;
   //     position?: string;
   //     hire_date?: string;
   //  } | null;
   created_at?: string | null;
   updated_at?: string | null;
   deleted_at?: string | null;
}

// 2. Interfaz para la tabla (datos enriquecidos)
export interface EmployeeTableRow extends EmployeeForm {
   employee_active: boolean;
   position_name: string | null;
   department_name: string | null;
   organization_id: number | null;
   organization_name: string | null;
   administration_id: number | null;
   administration_name: string | null;
   president_name: string | null;
   administration_logo: string | null;
   user_id: string;
   username: string;
   email: string;
   password?: string;
}

// 3. Configuración CORREGIDA
export const employeeCrudConfig = ConfigCrud<EmployeeForm, EmployeeTableRow>()
   .fields({
      text: [
         "employee_code",
         "hire_date", //fecha de contratación
         // "emplooye_id",
         "name",
         "plast_name",
         "mlast_name",
         "rfc",
         "curp",
         "phone",
         "start_date",
         "end_date",
         "created_at",
      ],
      select: ["department_uuid", "position_uuid"],
      radio: ["gender"],
      // toggle: ["active"],
      file: ["avatar", "signature_image"],
   })
   .text({
      name: {
         label: "Nombre",
         placeholder: "Escribe tu nombre o nombres",
         responsive: {
            md: 6,
         },
         validation: ({ yup }) => yup.string().required("Nombre requerido"),
      },
      plast_name: {
         label: "Apellido Paterno",
         placeholder: "Escribe tu primer apellido",
         responsive: {
            md: 3,
         },
         validation: ({ yup }) =>
            yup.string().required("Apellido Paterno requerido"),
      },
      mlast_name: {
         label: "Apellido Materno",
         placeholder: "Escribe tu segundo apellido",
         responsive: {
            md: 3,
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
      rfc: {
         label: "RFC",
         placeholder: "Escribe tu rfc",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().required("RFC requerido"),
      },
      curp: {
         label: "CURP",
         placeholder: "Escribe tu curp",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().required("CURP requerido"),
      },
      phone: {
         label: "Número celular",
         placeholder: "Escribe tu celular a 10 digitos",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) =>
            yup.string().required("Número celular requerido"),
      },
      start_date: {
         label: "Fecha Inicial",
         placeholder: "DD/MM/AAAA",
         type: "datetime",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
      end_date: {
         label: "Fecha Final",
         placeholder: "DD/MM/AAAA",
         type: "datetime",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
      hire_date: {
         label: "Fecha de ingreso",
         placeholder: "DD/MM/AAAA",
         type: "date",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) =>
            yup.string().required("Fecha de ingreso Requerido"),
      },
      employee_code: {
         label: "Numero de Nomina",
         placeholder: "Escribe tu numero de nomina",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) =>
            yup.string().required("Número de nomina requerido"),
      },
   })
   .select({
      department_uuid: {
         label: "Departamento",
         keyId: "uuid",
         keyLabel: "name",
         responsive: {
            md: 6,
         },
         selectOptionsHook: () => useDepartmentsData().items,
         validation: ({ yup }) =>
            yup.string().required("Departamento requerido"),
      },
      position_uuid: {
         label: "Puesto",
         keyId: "uuid",
         keyLabel: "name",
         responsive: {
            md: 6,
         },
         selectOptionsHook: () => usePositionsData().items,
         validation: ({ yup }) => yup.string().required("Puesto requerido"),
      },
   })
   .radio({
      gender: {
         label: "Genero",
         optionIdKey: "id",
         optionLabelKey: "label",
         options: [
            { id: "M", label: "Masculino" },
            { id: "F", label: "Femenino" },
         ],
         responsive: {
            md: 4,
         },
      },
   })
   .file({
      avatar: {
         label: "Imagen del trabajador",
         showPreviews: true,
         responsive: {
            md: 6,
         },
      },
      signature_image: {
         label: "Firma",
         showPreviews: true,
         responsive: {
            md: 6,
         },
      },
   })
   .toggle({
      active: {
         label: "Empleado Activo",
      },
   })
   .layout(
      "box",
      "Información Personal",
      "Información de Empleado",
   )({
      "Información Personal": [
         "avatar",
         "signature_image",
         "name",
         "plast_name",
         "mlast_name",
         "rfc",
         "curp",
         "gender",
         "phone",
         "start_date",
         "end_date",
      ],
      "Información de Empleado": [
         "employee_code",
         "hire_date",
         "department_uuid",
         "position_uuid",
      ],
   })
   .tableHeader({
      title: "Empleados",
      subtitle: "Gestión de empleados",
      icon: <icons.Hi.HiUserGroup size={30} />,
   })
   .tableActions({
      isEditing: true,
      isDelete: true,
      moreButtons: [
         {
            label: "Ver perfil",
            icon: <icons.Hi.HiUser />,

            handleOnClick: (row) => console.log(row),
            color: "blue",
            permission: true,
         },
         {
            label: "Ver perfil",
            icon: <icons.Pi.PiAcorn />,
            handleOnClick: (row) => console.log(row),
            color: "red",
            permission: true,
         },
      ],
   })
   .tableColumns({
      avatar: {
         label: "Avatar",
         render: (value, _row) => (
            <div className="flex items-center gap-2">
               <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold ">
                  <PhotoZoom
                     src={`${env.API_URL_IMG}/${value}`}
                     alt="Avatar"
                     title="Imagen del empleado"
                  />
               </div>
               {/* <span className="font-medium text-gray-900">{`${env.API_URL_IMG}/${value}`}</span> */}
            </div>
         ),
      },
      signature_image: {
         label: "Firma",
         render: (value, _row) => (
            <div className="flex items-center gap-2">
               <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold ">
                  <PhotoZoom
                     src={`${env.API_URL_IMG}/${value}`}
                     alt="Firma"
                     title="Firma del empleado"
                  />
               </div>
               {/* <span className="font-medium text-gray-900">{`${env.API_URL_IMG}/${value}`}</span> */}
            </div>
         ),
      },
      employee_code: {
         label: "Número de nomina",
         render: (value) => (
            <a
               href={`mailto:${value}`}
               className="text-blue-600 hover:text-blue-700">
               {value}
            </a>
         ),
      },
      full_name: {
         label: "Nombre completo",
      },
      rfc: {
         label: "RFC",
      },
      curp: {
         label: "CURP",
      },
      phone: {
         label: "Número celular",
         render: (value) => (
            <a
               href={`tel:${value}`}
               className="text-blue-600 hover:text-blue-700">
               {formatPhone(value)}
            </a>
         ),
      },
      gender: {
         label: "Género",
         render: (value, _row) =>
            `${value === "M" ? `Masculino` : value === "F" ? `Femenino` : "Sin asignar"}`,
      },
      department_name: {
         label: "Departamento",
      },
      position_name: {
         label: "Puesto",
      },
      start_date: {
         label: "Fecha Inicio",
         render: (value, _row) => `${formatDatetime(value, true)}`,
      },
      end_date: {
         label: "Fecha Fin",
         render: (value, _row) => `${formatDatetime(value, true)}`,
      },
      active: {
         label: "Estado",
         render: (value) => {
            const statusConfig: Record<
               string,
               { bg: string; text: string; dot: string; label: string }
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
               suspended: {
                  bg: "bg-red-100",
                  text: "text-red-800",
                  dot: "bg-red-500",
                  label: "Suspendido",
               },
               pending: {
                  bg: "bg-yellow-100",
                  text: "text-yellow-800",
                  dot: "bg-yellow-500",
                  label: "Pendiente",
               },
            };
            const config =
               statusConfig[value ? "true" : "false"] || statusConfig.false;
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
   })
   .mobile({
      enabled: true,
      activeViews: true,
      listTile: {
         title: (row) => row.full_name,
         subtitle: (row) =>
            `${row.employee_code} | ${row.position_name || "Sin asignar"}`,
         leading: (row) => (
            <div className="w-10 h-10 rounded-full bg-[#9B2242] text-white flex items-center justify-center font-bold">
               {row.name?.charAt(0)?.toUpperCase() || "D"}
            </div>
         ),
         trailing: (row) => (
            <span
               className={`w-2.5 h-2.5 rounded-full ${row.active ? "bg-green-500" : "bg-gray-400"}`}
            />
         ),
      },
      quickFilters: {
         enabled: true,
         filters: [
            { dataField: "name", label: "Nombre", type: "text" },
            { dataField: "employee_code", label: "Núm. Nomina", type: "text" },
            {
               dataField: "active",
               label: "Estado",
               type: "select",
               options: [
                  { label: "Activo", value: "true" },
                  { label: "Inactivo", value: "false" },
               ],
            },
         ],
      },
   })
   .build();
