// config/users.crud.ts
import { ConfigCrud } from "../../../models/genericmodels.model";
import { generateUsername } from "../../../utils/helpers";
import PhotoZoom from "../../components/images/images";
import useEmployeesData from "../employees/useEmployeesData";
import icons from "./../../../constant/icons";

// 1. Interfaz del formulario (lo que se guarda en BD)
export interface UserForm {
   id: number;
   employee_id: number | null;
   username: string;
   email: string | null;
   password: string;
   active: boolean;

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
export interface UserTableRow extends UserForm {
   employee_code: string | null;
   hire_date: Date | null;
   employee_active: boolean;
   name: string | null;
   plast_name: string | null;
   mlast_name: string | null;
   full_name: string | null;
   full_name_reverse: string | null;
   rfc: string | null;
   curp: string | null;
   phone: string | null;
   avatar: string | null;
   signature_image: string | null;
   position_uuid: string | null;
   position_name: string | null;
   department_uuid: string | null;
   department_name: string | null;
   organization_id: number | null;
   organization_name: string | null;
   administration_id: number | null;
   administration_name: string | null;
   president_name: string | null;
   administration_logo: string | null;
}

// 3. Configuración CORREGIDA
export const userCrudConfig = ConfigCrud<UserForm, UserTableRow>()
   .fields({
      text: ["username", "email", "password", "created_at"],
      select: ["employee_id"],
      toggle: ["active"],
   })
   .text({
      username: {
         label: "Nombre de usuario",
         placeholder: "Escribe tu nombre de usuario",
         type: "text",
         responsive: {
            md: 12,
         },
         defaultValue: "yupi",
         validation: ({ yup }) =>
            yup.string().required("Nombre de usuario requerido"),
      },
      email: {
         label: "Correo electrónico",
         placeholder: "Escribe tu correo electrónico",
         type: "email",
         responsive: {
            md: 12,
         },
         validation: ({ yup }) =>
            yup.string().required("Correo electrónico requerido"),
      },
      password: {
         label: "Contraseña",
         placeholder: "Escribe tu contraseña",
         type: "password",
         responsive: {
            md: 12,
         },
         validation: ({ yup }) => yup.string().required("Contraseña requerido"),
      },
   })
   .select({
      employee_id: {
         label: "Empleado",
         keyId: "employee_id",
         keyLabel: "full_name",
         // options: [],
         selectOptionsHook: () => useEmployeesData().items,
         onChange: (value, formik) => {
            formik.setFieldValue("username", generateUsername(value.full_name));
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
   })
   .toggle({
      active: {
         label: "Usuario Activo",
         responsive: {
            md: 12,
         },
      },
   })
   .layout(
      "box",
      "Empleado",
      "Datos de usuario",
   )({
      Empleado: ["employee_id"],
      "Datos de usuario": ["username", "email", "password", "active"],
   })
   .tableHeader({
      title: "Usuarios",
      subtitle: "Gestión de usuarios",
      icon: <icons.Hi.HiUserGroup size={30} />,
   })
   .tableColumns({
      avatar: {
         label: "Foto empleado",
         pinned: "left",
         render: (value, _row) => (
            <div className="flex items-center gap-2">
               <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold ">
                  <PhotoZoom
                     src={value}
                     alt="Foto empleado"
                     title="Foto del empleado"
                  />
               </div>
               <span className="font-medium text-gray-900">{value}</span>
            </div>
         ),
      },
      username: {
         label: "Nombre de usuario",
      },
      employee_code: {
         label: "Número de empleado",
         render: (value) => (
            <a href={`${value}`} className="text-blue-600 hover:text-blue-700">
               {value}
            </a>
         ),
      },
      full_name: {
         label: "Empleado",
         render: (value, _row) => `${value}`,
      },
      department_name: {
         label: "Departamento",
         render: (value, _row) => `${value}`,
      },
      position_name: {
         label: "Puesto",
         render: (value, _row) => `${value}`,
      },
      active: {
         label: "Estado",
         // filterType: "select",
         // filterOptions: [
         //    { value: true, label: "Activo" },
         //    { value: false, label: "Inactivo" },
         // ],
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
   .mobile({
      enabled: true,
      activeViews: true,
      listTile: {
         title: (row) => row.name,
         subtitle: (row) =>
            `${row.employee_code} | ${row.username || "Sin org"}`,
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
            // { dataField: "code", label: "Código", type: "text" },
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
