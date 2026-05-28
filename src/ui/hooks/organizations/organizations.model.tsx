// config/users.crud.ts
import { ConfigCrud } from "../../../models/genericmodels.model";
import icons from "./../../../constant/icons";

// 1. Interfaz del formulario (lo que se guarda en BD)
export interface OrganizationForm {
   id: number;
   code: string | null;
   name: string | null;
   active: boolean;

   // metadata: {
   //    department_id?: number;
   //    position?: string;
   //    hire_date?: string;
   // } | null;
   created_at?: string | null;
   updated_at?: string | null;
   deleted_at?: string | null;
}

// 2. Interfaz para la tabla (datos enriquecidos)
export interface OrganizationTableRow extends OrganizationForm {}

// 3. Configuración CORREGIDA
export const organizationCrudConfig = ConfigCrud<
   OrganizationForm,
   OrganizationTableRow
>()
   .fields({
      text: ["code", "name"],
      toggle: ["active"],
   })
   .text({
      code: {
         label: "Código",
         placeholder: "AD",
         validation: ({ yup }) => yup.string().required("Código Requerido"),
      },
      name: {
         label: "Organización",
         placeholder: "Nombre de la organización",
         validation: ({ yup }) =>
            yup.string().required("Organización requerido"),
      },
   })
   .toggle({
      active: {
         label: "Organización Activo",
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
   .tableHeader({
      title: "Orgnaizaciones",
      subtitle: "Gestión de organizaciones",
      icon: <icons.Pi.PiCodepenLogoFill size={30} />,
   })
   .tableColumns({
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
         label: "Organización",
         render: (value, _row) => `${value}`,
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
               statusConfig[value ? "true" : "false"?.toLowerCase()] ||
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
