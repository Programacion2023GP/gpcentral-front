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
   created_at?: string;
   updated_at?: string;
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
   .layout({
      mode: "box",
      sections: ["Información Personal", "Información de Empleado"],
      fieldsPerSection: {
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
      },
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
               <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                  <PhotoZoom
                     src={value}
                     alt="Avatar"
                     title="Imagen del empleado"
                  />
               </div>
               <span className="font-medium text-gray-900">{value}</span>
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
            const config = statusConfig[value] || statusConfig.false;
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
   // .override({
   //   text: ({ label, value, onChange, error, placeholder }) => (
   //     <div className="mb-4">
   //       <label className="block mb-1 text-sm font-medium text-gray-700">
   //         {label}
   //       </label>
   //       <input
   //         className={`
   //           w-full px-3 py-2 rounded-lg border transition-all duration-200
   //           ${
   //             error
   //               ? "border-red-400 focus:border-red-500 focus:ring-red-500"
   //               : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
   //           }
   //           focus:outline-none focus:ring-2 focus:ring-opacity-50
   //         `}
   //         placeholder={placeholder}
   //         value={value || ""}
   //         onChange={(e) => onChange(e.target.value)}
   //       />
   //       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
   //     </div>
   //   ),
   //   select: ({ label, value, onChange, error, options, keyId, keyLabel }) => (
   //     <div className="mb-4">
   //       <label className="block mb-1 text-sm font-medium text-gray-700">
   //         {label}
   //       </label>
   //       <select
   //         className={`
   //           w-full px-3 py-2 rounded-lg border transition-all duration-200
   //           ${
   //             error
   //               ? "border-red-400 focus:border-red-500 focus:ring-red-500"
   //               : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
   //           }
   //           focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white
   //         `}
   //         value={value || ""}
   //         onChange={(e) => onChange(e.target.value)}
   //       >
   //         <option value="">Seleccione...</option>
   //         {options?.map((opt: any) => (
   //           <option key={opt[keyId]} value={opt[keyId]}>
   //             {opt[keyLabel]}
   //           </option>
   //         ))}
   //       </select>
   //       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
   //     </div>
   //   ),
   //   table: ({ columns, data, onEdit, onDelete }) => (
   //     <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
   //       <div className="overflow-x-auto">
   //         <table className="min-w-full divide-y divide-gray-200">
   //           <thead className="bg-gray-50">
   //             <tr>
   //               {columns.map((col) => (
   //                 <th
   //                   key={col.field}
   //                   className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
   //                 >
   //                   {col.label}
   //                 </th>
   //               ))}
   //               <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
   //                 Acciones
   //               </th>
   //             </tr>
   //           </thead>
   //           <tbody className="bg-white divide-y divide-gray-200">
   //             {data.map((row) => (
   //               <tr
   //                 key={row.id}
   //                 className="transition-colors duration-150 hover:bg-gray-50"
   //               >
   //                 {columns.map((col) => (
   //                   <td
   //                     key={col.field}
   //                     className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
   //                   >
   //                     {col.render
   //                       ? col.render(row[col.field], row)
   //                       : row[col.field]}
   //                   </td>
   //                 ))}
   //                 <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
   //                   <button
   //                     onClick={() => onEdit(row)}
   //                     className="mr-3 text-blue-600 transition-colors hover:text-blue-900"
   //                     title="Editar"
   //                   >
   //                     <svg
   //                       className="inline w-5 h-5"
   //                       fill="none"
   //                       stroke="currentColor"
   //                       viewBox="0 0 24 24"
   //                     >
   //                       <path
   //                         strokeLinecap="round"
   //                         strokeLinejoin="round"
   //                         strokeWidth={2}
   //                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
   //                       />
   //                     </svg>
   //                   </button>
   //                   <button
   //                     onClick={() => onDelete(row)}
   //                     className="text-red-600 transition-colors hover:text-red-900"
   //                     title="Eliminar"
   //                   >
   //                     <svg
   //                       className="inline w-5 h-5"
   //                       fill="none"
   //                       stroke="currentColor"
   //                       viewBox="0 0 24 24"
   //                     >
   //                       <path
   //                         strokeLinecap="round"
   //                         strokeLinejoin="round"
   //                         strokeWidth={2}
   //                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
   //                       />
   //                     </svg>
   //                   </button>
   //                 </td>
   //               </tr>
   //             ))}
   //           </tbody>
   //         </table>
   //       </div>
   //     </div>
   //   ),
   // })
   // ✅ CORREGIDO: Ahora usa Formik en lugar de Form
   // .render(({ Formik, Table, overrides, hook, modal, }) => {
   //   return (
   //     <div className="min-h-screen p-8 bg-gray-50">
   //       {/* Header */}
   //       <div className="mb-8">
   //         <div className="flex items-center justify-between">
   //           <div>
   //             <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
   //             <p className="mt-1 text-gray-600">
   //               Gestiona los usuarios del sistema
   //             </p>
   //           </div>
   //           <button
   //             onClick={() => modal.openWith()}
   //             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
   //           >
   //             <svg
   //               className="w-5 h-5"
   //               fill="none"
   //               stroke="currentColor"
   //               viewBox="0 0 24 24"
   //             >
   //               <path
   //                 strokeLinecap="round"
   //                 strokeLinejoin="round"
   //                 strokeWidth={2}
   //                 d="M12 4v16m8-8H4"
   //               />
   //             </svg>
   //             Nuevo usuario
   //           </button>
   //         </div>
   //       </div>

   //       {/* Tabla */}
   //       <Table />

   //       {/* Modal */}
   //       {modal.open && (
   //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
   //           <div className="w-full max-w-md transition-all transform bg-white shadow-2xl rounded-2xl">
   //             {/* Modal Header */}
   //             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
   //               <h2 className="text-xl font-bold text-gray-900">
   //                 {hook.formData?.id ? "Editar usuario" : "Crear nuevo usuario"}
   //               </h2>
   //               <button
   //                 onClick={() => modal.close()}
   //                 className="text-gray-400 transition-colors hover:text-gray-600"
   //               >
   //                 <svg
   //                   className="w-6 h-6"
   //                   fill="none"
   //                   stroke="currentColor"
   //                   viewBox="0 0 24 24"
   //                 >
   //                   <path
   //                     strokeLinecap="round"
   //                     strokeLinejoin="round"
   //                     strokeWidth={2}
   //                     d="M6 18L18 6M6 6l12 12"
   //                   />
   //                 </svg>
   //               </button>
   //             </div>

   //             {/* Modal Body - ✅ AHORA USA FORMIK */}
   //             <div className="px-6 py-4">
   //               <Formik >
   //                 {({ values, errors, isSubmitting, handleSubmit }) => (
   //                   <form onSubmit={handleSubmit}>
   //                     <overrides.text name="name" />
   //                     <overrides.text name="email" />
   //                     <div className="grid grid-cols-2 gap-3">
   //                       <overrides.text name="first_name" />
   //                       <overrides.text name="last_name" />
   //                     </div>
   //                     <overrides.select name="role_id" />
   //                     <overrides.select name="status_id" />

   //                     {/* Modal Footer */}
   //                     <div className="flex justify-end gap-3 mt-6">
   //                       <button
   //                         type="button"
   //                         onClick={() => modal.close()}
   //                         className="px-4 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
   //                       >
   //                         Cancelar
   //                       </button>
   //                       <button
   //                         type="submit"
   //                         disabled={isSubmitting}
   //                         className={`
   //                           px-4 py-2 rounded-lg font-medium text-white transition-all duration-200
   //                           ${
   //                             isSubmitting
   //                               ? "bg-gray-400 cursor-not-allowed"
   //                               : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md"
   //                           }
   //                         `}
   //                       >
   //                         {isSubmitting ? (
   //                           <span className="flex items-center gap-2">
   //                             <svg
   //                               className="w-4 h-4 animate-spin"
   //                               fill="none"
   //                               viewBox="0 0 24 24"
   //                             >
   //                               <circle
   //                                 className="opacity-25"
   //                                 cx="12"
   //                                 cy="12"
   //                                 r="10"
   //                                 stroke="currentColor"
   //                                 strokeWidth="4"
   //                               ></circle>
   //                               <path
   //                                 className="opacity-75"
   //                                 fill="currentColor"
   //                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
   //                               ></path>
   //                             </svg>
   //                             Guardando...
   //                           </span>
   //                         ) : (
   //                           "Guardar cambios"
   //                         )}
   //                       </button>
   //                     </div>
   //                   </form>
   //                 )}
   //               </Formik>
   //             </div>
   //           </div>
   //         </div>
   //       )}
   //     </div>
   //   );
   // })
   .build();
