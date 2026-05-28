// config/users.crud.ts
import { ConfigCrud } from "../../../models/genericmodels.model";
import { formatDatetime } from "../../../utils/helpers";
import icons from "../../../constant/icons";
import usePositionsData from "./usePositionsData";

// 1. Interfaz del formulario (lo que se guarda en BD)
export interface PositionForm {
   id: number;
   uuid: string;
   // department_uuid: string | null;
   name: string | null;
   parent_position_uuid: string | null;
   start_date: Date | string | null;
   end_date: Date | string | null;
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
export interface PositionTableRow extends PositionForm {}

// 3. Configuración CORREGIDA
export const positionCrudConfig = ConfigCrud<PositionForm, PositionTableRow>()
   .fields({
      text: ["uuid", "name", "start_date"],
      select: ["parent_position_uuid"],
      toggle: ["active"],
   })
   .text({
      uuid: {
         label: "UUID",
         placeholder: "9X9999XX9X9XX9",
         disabled: true,
         validation: ({ yup }) => yup.string().notRequired(),
      },
      name: {
         label: "Puesto",
         placeholder: "Nombre del puesto",
         validation: ({ yup }) => yup.string().required("Puesto requerido"),
      },
      start_date: {
         label: "Fecha de inicio",
         type: "date",
         placeholder: "Nombre del puesto",
         validation: ({ yup }) =>
            yup.string().required("Fecha de inicio requerido"),
      },
   })
   .select({
      parent_position_uuid: {
         label: "Puesto Superior",
         keyId: "uuid",
         keyLabel: "name",
         selectOptionsHook: () => usePositionsData().items,
         validation: ({ yup }) => yup.string().notRequired(),
      },
   })
   .toggle({
      active: {
         label: "Puesto Activo",
      },
   })
   .layout(
      "box",
      "Información General",
      "Opcional",
   )({
      "Información General": ["uuid", "name", "start_date", "active"],
      Opcional: ["parent_position_uuid"],
   })
   .tableHeader({
      title: "Puestos",
      subtitle: "Gestión de puestos",
      icon: <icons.Pi.PiDesk size={30} />,
   })
   .tableColumns({
      uuid: {
         label: "UUID",
      },
      name: {
         label: "Puesto",
         render: (value, _row) => `${value}`,
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
         subtitle: (row) => `${row.uuid} | ${row.name || "Sin org"}`,
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
