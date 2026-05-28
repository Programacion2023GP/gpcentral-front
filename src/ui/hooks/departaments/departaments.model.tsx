// config/users.crud.ts
import { env } from "../../../constant";
import { ConfigCrud } from "../../../models/genericmodels.model";
import { formatDatetime } from "../../../utils/helpers";
import PhotoZoom from "../../components/images/images";
import useOrganizationsData from "../organizations/useOrganizationsData";
import icons from "./../../../constant/icons";

// 1. Interfaz del formulario (lo que se guarda en BD)
export interface DepartmentForm {
   id: number;
   uuid: string;
   organization_id: number | null;
   code: string | null;
   name: string | null;
   seal_image: string | null;
   start_date: Date | null;
   end_date: Date | null;
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
export interface DepartmentTableRow extends DepartmentForm {
   organization_name: string;
   organization_code: string;
   director_name: string;
   director_employee_id: number;
   director_employee_code: number;
   director_position: string;
   director_since?: Date;
}

// 3. Configuración CORREGIDA
export const departmentCrudConfig = ConfigCrud<
   DepartmentForm,
   DepartmentTableRow
>()
   .fields({
      text: ["uuid", "code", "name", "start_date", "end_date"],
      select: ["organization_id"],
      file: ["seal_image"],
      toggle: ["active"],
   })
   .text({
      uuid: {
         label: "UUID",
         placeholder: "9X9999XX9X9XX9",
         disabled: true,
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
      code: {
         label: "Código",
         placeholder: "",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().required("Código Requerido"),
      },
      name: {
         label: "Departamento",
         placeholder: "Nombre del departamento",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) =>
            yup.string().required("Departamento requerido"),
      },
      start_date: {
         label: "Fecha Inicial",
         placeholder: "DD/MM/AAAA",
         type: "date",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) =>
            yup.string().required("Fecha Inicial Requerido"),
      },
      end_date: {
         label: "Fecha Final",
         placeholder: "DD/MM/AAAA",
         type: "date",
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().notRequired(),
      },
   })
   .select({
      organization_id: {
         label: "Organización",
         keyId: "id",
         keyLabel: "name",
         // options: [],
         selectOptionsHook: () => useOrganizationsData().items,
         responsive: {
            md: 4,
         },
         validation: ({ yup }) => yup.string().required("Rol requerido"),
      },
   })
   .file({
      seal_image: {
         label: "Sello",
         showPreviews: true,
         responsive: {
            md: 6,
         },
      },
   })
   .toggle({
      active: {
         label: "Departamento Activo",
         responsive: {
            md: 6,
         },
      },
   })
   // .layout({
   //    mode: "box",
   //    sections: ["Información General", "Estado y Manager"],
   //    fieldsPerSection: {
   //       "Información General": ["uuid", "name"],
   //       "Estado y Manager": ["active", "organization_id"],
   //    },
   // })
   .tableColumns({
      seal_image: {
         label: "Sello",
         render: (value, row) => (
            <div className="flex items-center justify-center gap-2">
               <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold ">
                  <PhotoZoom
                     src={value}
                     alt="Sello"
                     title="Sello del departamento"
                  />
               </div>
               {/* <span className="font-medium text-gray-900">{value}</span> */}
            </div>
         ),
      },
      uuid: {
         label: "UUID",
      },
      organization_name: {
         label: "organización",
         render: (value, row) => {
            const colors: Record<string, string> = {
               PRESIDENCIA: "bg-red-100 text-red-800",
               SIDEAPA: "bg-blue-100 text-blue-800",
               SIDEAPAAR: "bg-gray-100 text-gray-800",
               DIF: "bg-purple-100 text-purple-800",
            };
            return (
               <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[value?.toUpperCase()] || "bg-gray-100 text-gray-800"}`}>
                  <b>({row.organization_code})</b> {value}
               </span>
            );
         },
      },
      code: {
         label: "Codigo",
         render: (value) => (
            <a
               href={`mailto:${value}`}
               className="text-blue-600 hover:text-blue-700">
               {value}
            </a>
         ),
      },
      name: {
         label: "Departamento",
         render: (value, _row) => `${value}`,
      },
      director_name: {
         label: "Director Actual",
         render: (value, row) =>
            !row.director_employee_code ? (
               <div className="w-full text-center">
                  <i className="text-center">Director no asignado</i>
               </div>
            ) : (
               <div className="w-full text-center">
                  <b>({row.director_employee_code})</b> <br />
                  {value}
               </div>
            ),
      },
      start_date: {
         label: "Fecha Inicio",
         render: (value, _row) => `${formatDatetime(value, false)}`,
         getFilterValue: (value) => `${formatDatetime(value, false)}`,
      },
      end_date: {
         label: "Fecha Fin",
         render: (value, _row) => `${formatDatetime(value, false)}`,
         getFilterValue: (value) => `${formatDatetime(value, false)}`,
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
   .tableHeader({
      title: "Departamentos",
      subtitle: "Gestión de departamentos",
      icon: <icons.Hi.HiBuildingLibrary size={30} />,
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
         subtitle: (row) => `${row.code} | ${row.name || "Sin org"}`,
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
            { dataField: "code", label: "Código", type: "text" },
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
