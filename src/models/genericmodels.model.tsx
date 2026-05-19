// models/genericmodels.model.ts
// ====================================================================
// CONFIGURACIÓN CRUD GENÉRICA CON SOPORTE MÓVIL
// GENERIC CRUD CONFIGURATION WITH MOBILE SUPPORT
// ====================================================================

import * as yup from "yup";
import React from "react";
import type { GenericDataReturn } from "react-zustore";
import type { FilePreset } from "../ui/formik/FormikInputs/forminputimage";

// ====================================================================
// RESPONSIVE SIZES / TAMAÑOS RESPONSIVOS
// ====================================================================

/**
 * Configuración de tamaños responsivos para grids (sistema de 12 columnas de Tailwind)
 * Responsive grid sizes configuration (Tailwind 12-column system)
 *
 * @example { sm: 12, md: 6, lg: 4, xl: 3, "2xl": 2 }
 *
 * @property {number} sm - Pantallas pequeñas (< 640px) / Small screens (< 640px)
 * @property {number} md - Pantallas medianas (< 768px) / Medium screens (< 768px)
 * @property {number} lg - Pantallas grandes (< 1024px) / Large screens (< 1024px)
 * @property {number} xl - Pantallas extra grandes (< 1280px) / Extra large screens (< 1280px)
 * @property {number} "2xl" - Pantallas 2XL (≥ 1536px) / 2XL screens (≥ 1536px)
 */
type ResponsiveSizes = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
};

// ====================================================================
// BASE FIELD CONFIG / CONFIGURACIÓN BASE DE CAMPOS
// ====================================================================

/**
 * Configuración base común para todos los tipos de campos
 * Base configuration common to all field types
 *
 * @property {string} label - Etiqueta visible del campo / Field visible label
 * @property {string} placeholder - Texto de ayuda dentro del input / Input placeholder text
 * @property {boolean} disabled - Deshabilita el campo (no editable) / Disables the field (not editable)
 * @property {unknown} defaultValue - Valor por defecto inicial / Initial default value
 * @property {ResponsiveSizes} responsive - Configuración responsiva (tamaños en grid) / Responsive grid configuration
 */
type BaseFieldConfig = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: unknown;
  responsive?: ResponsiveSizes;
};

// ====================================================================
// TEXT FIELD CONFIG / CONFIGURACIÓN DE CAMPO TEXTO
// ====================================================================

/**
 * Configuración para campos de texto, email, password, número, teléfono, URL, fechas
 * Configuration for text, email, password, number, phone, URL, date fields
 *
 * @property {string} type - Tipo de input HTML / HTML input type
 * @property {boolean} readOnly - Modo solo lectura (no editable, pero puede tener valor) / Read-only mode
 * @property {Function} validation - Validación con Yup / Yup validation schema
 */
type TextConfig<TFormValues = any> = BaseFieldConfig & {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "date"
    | "datetime"
    | "time";
  readOnly?: boolean;
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// SELECT FIELD CONFIG / CONFIGURACIÓN DE CAMPO SELECCIÓN
// ====================================================================

/**
 * Configuración para campos de selección (dropdown / autocomplete)
 * Configuration for select/dropdown/autocomplete fields
 *
 * @property {string} keyId - Nombre de la propiedad que sirve como ID único (ej: "id") / Property name for unique ID (e.g., "id")
 * @property {string} keyLabel - Nombre de la propiedad que sirve como etiqueta visible (ej: "name") / Property name for visible label (e.g., "name")
 * @property {any[]} options - Opciones estáticas / Static options array
 * @property {Function} selectOptionsHook - Hook para cargar opciones asíncronamente (ej: useRolesData) / Hook for async options loading
 * @property {boolean} multiple - Permite selección múltiple / Enables multi-selection
 * @property {boolean} searchable - Habilita búsqueda dentro de opciones / Enables search within options
 * @property {Function} validation - Validación Yup / Yup validation
 */
type SelectConfig<TFormValues = any> = BaseFieldConfig & {
  keyId: string;
  keyLabel: string;
  options?: any[];
  selectOptionsHook?: () => any[];
  multiple?: boolean;
  searchable?: boolean;
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// FILE UPLOAD CONFIG / CONFIGURACIÓN DE CARGA DE ARCHIVOS
// ====================================================================

/**
 * Configuración para campos de carga de archivos (imágenes, documentos)
 * Configuration for file upload fields (images, documents)
 *
 * @property {FilePreset|FilePreset[]} preset - Preset de carpeta de destino / Destination folder preset
 * @property {number} maxFiles - Número máximo de archivos permitidos / Maximum number of files allowed
 * @property {number} maxSizeMB - Tamaño máximo en MB por archivo / Maximum size in MB per file
 * @property {boolean} multiple - Permite múltiples archivos / Allows multiple files
 * @property {boolean} showPreviews - Muestra previsualización de imágenes / Shows image preview
 * @property {boolean} compressImages - Comprime imágenes automáticamente / Automatically compress images
 * @property {string} hint - Texto de ayuda adicional / Additional hint text
 * @property {Function} validation - Validación Yup / Yup validation
 */
type FileUploadConfig<TFormValues = any> = BaseFieldConfig & {
  preset?: FilePreset | FilePreset[];
  maxFiles?: number;
  maxSizeMB?: number;
  multiple?: boolean;
  showPreviews?: boolean;
  compressImages?: boolean;
  hint?: string;
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// COLOR PICKER CONFIG / CONFIGURACIÓN DE SELECTOR DE COLOR
// ====================================================================

/**
 * Configuración para selector de colores
 * Configuration for color picker field
 *
 * @property {string[]} palette - Paleta de colores personalizada / Custom color palette
 * @property {Function} validation - Validación Yup / Yup validation
 */
type ColorPickerConfig<TFormValues = any> = BaseFieldConfig & {
  palette?: string[];
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// PASSWORD FIELD CONFIG / CONFIGURACIÓN DE CAMPO CONTRASEÑA
// ====================================================================

/**
 * Configuración para campo de contraseña (con toggle de visibilidad)
 * Configuration for password field (with visibility toggle)
 *
 * @property {Function} validation - Validación Yup (ej: mínimo 8 caracteres) / Yup validation (e.g., min 8 chars)
 */
type PasswordConfig<TFormValues = any> = BaseFieldConfig & {
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// TEXTAREA FIELD CONFIG / CONFIGURACIÓN DE ÁREA DE TEXTO
// ====================================================================

/**
 * Configuración para área de texto (textarea) multilínea
 * Configuration for multiline textarea field
 *
 * @property {number} rows - Número de filas visibles / Number of visible rows
 * @property {boolean} readOnly - Modo solo lectura / Read-only mode
 * @property {Function} validation - Validación Yup / Yup validation
 */
type TextareaConfig<TFormValues = any> = BaseFieldConfig & {
  rows?: number;
  readOnly?: boolean;
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// NUMBER FIELD CONFIG / CONFIGURACIÓN DE CAMPO NUMÉRICO
// ====================================================================

/**
 * Configuración para campo numérico (con validación de rango)
 * Configuration for numeric field (with range validation)
 *
 * @property {Function} validation - Validación Yup (min, max, integer, etc.) / Yup validation (min, max, integer, etc.)
 */
type NumberConfig<TFormValues = any> = BaseFieldConfig & {
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// RADIO GROUP CONFIG / CONFIGURACIÓN DE GRUPO DE RADIO BUTTONS
// ====================================================================

/**
 * Configuración para grupo de botones de opción (radio buttons)
 * Configuration for radio button group
 *
 * @property {TOption[]} options - Lista de opciones disponibles / List of available options
 * @property {keyof TOption} optionIdKey - Propiedad del objeto que sirve como ID / Object property for ID
 * @property {keyof TOption} optionLabelKey - Propiedad del objeto que sirve como etiqueta / Object property for label
 * @property {Function} validation - Validación Yup / Yup validation
 */
type RadioGroupConfig<TOption = any, TFormValues = any> = BaseFieldConfig & {
  options: TOption[];
  optionIdKey: keyof TOption;
  optionLabelKey: keyof TOption;
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// TOGGLE / SWITCH CONFIG / CONFIGURACIÓN DE INTERRUPTOR
// ====================================================================

/**
 * Configuración para interruptor (toggle / switch) de booleano
 * Configuration for boolean toggle/switch field
 *
 * @property {Function} validation - Validación Yup (generalmente .boolean()) / Yup validation (usually .boolean())
 */
type ToggleConfig<TFormValues = any> = BaseFieldConfig & {
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// CHECKBOX CONFIG / CONFIGURACIÓN DE CHECKBOX
// ====================================================================

/**
 * Configuración para checkbox individual (booleano)
 * Configuration for single checkbox (boolean)
 *
 * @property {Function} validation - Validación Yup / Yup validation
 */
type CheckboxConfig<TFormValues = any> = BaseFieldConfig & {
  validation?: (
    ctx: ValidationContext<TFormValues>,
  ) => yup.Schema<unknown> | undefined;
};

// ====================================================================
// HELPERS / UTILIDADES
// ====================================================================

/**
 * Obtiene las claves anidadas de un objeto (para paths como "user.address.city")
 * Gets nested keys of an object (for paths like "user.address.city")
 *
 * @template T - Tipo del objeto / Object type
 * @internal
 */
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? T[K] extends object
          ? `${K}` | `${K}.${NestedKeys<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

/**
 * Contexto de validación pasado a las funciones de validación Yup
 * Validation context passed to Yup validation functions
 *
 * @property {typeof yup} yup - Objeto Yup para crear esquemas / Yup object to create schemas
 * @property {any} value - Valor actual del campo / Current field value
 * @property {TFormValues} formData - Todos los datos del formulario / All form data
 */
type ValidationContext<TFormValues = any> = {
  yup: typeof yup;
  value: any;
  formData: TFormValues;
};

/**
 * Configuración de una columna en la tabla (para renderizado personalizado y filtros)
 * Table column configuration (for custom rendering and filtering)
 *
 * @property {string} label - Etiqueta visible de la columna / Column visible label
 * @property {Function} render - Función para renderizar el contenido de la celda / Function to render cell content
 * @property {Function} getFilterValue - Función para obtener el valor a filtrar (útil para fechas o valores complejos) / Function to get filterable value
 */
type TableColumnConfig<TTable> = {
  label: string;
  render?: (value: any, record: TTable) => React.ReactNode;
  getFilterValue?: (value: any) => string;
};

// ====================================================================
// TABLE ACTIONS CONFIG (Desktop) / CONFIGURACIÓN DE ACCIONES DE TABLA (ESCRITORIO)
// ====================================================================

/**
 * Botón de acción personalizado en la tabla (aparece en menú "Más acciones" y en swipe móvil)
 * Custom action button in table (appears in "More actions" menu and mobile swipe)
 *
 * @property {string} label - Texto del botón / Button text
 * @property {string|React.ReactNode} icon - Ícono (puede ser string con clase CSS o componente React) / Icon (CSS class string or React component)
 * @property {string} iconName - Deprecated: usar 'icon' en su lugar / Deprecated: use 'icon' instead
 * @property {string} tooltip - Texto de ayuda al hacer hover / Tooltip text on hover
 * @property {Function} handleOnClick - Función que se ejecuta al hacer clic / Function executed on click
 * @property {string} color - Color del botón (opciones: "blue", "red", "green", "orange", "ruby", etc.) / Button color
 * @property {boolean} permission - Permiso requerido para mostrar el botón (si es false, se oculta) / Permission required to show button (if false, hidden)
 * @property {boolean|null} multiple - Si es true, permite selección múltiple (no implementado aún) / If true, allows multi-selection (not yet implemented)
 */
 interface TableActionButton<TRecord = any> {
  label: string;
  icon?: string | React.ReactNode;
  iconName?: string;
  tooltip?: string;
  handleOnClick: (record: TRecord) => void;
  color?: string;
  permission?: boolean;
  multiple?: boolean | null;
}

/**
 * Configuración de acciones de la tabla (botones de editar, eliminar y personalizados)
 * Table actions configuration (edit, delete, and custom buttons)
 *
 * @property {boolean} isEditing - Muestra el botón de editar (por defecto true) / Shows edit button (default true)
 * @property {boolean} isDelete - Muestra el botón de eliminar (por defecto true) / Shows delete button (default true)
 * @property {TableActionButton[]} moreButtons - Botones personalizados adicionales (aparecen en menú desplegable) / Additional custom buttons (appear in dropdown menu)
 */
 interface TableActionsConfig<TRecord = any> {
  isEditing?: boolean;
  isDelete?: boolean;
  moreButtons?: TableActionButton<TRecord>[];
}

/**
 * Configuración del encabezado de la tabla (título, subtítulo, ícono)
 * Table header configuration (title, subtitle, icon)
 *
 * @property {string} title - Título principal de la tabla / Main table title
 * @property {string} subtitle - Subtítulo / Subtitle
 * @property {string|React.ReactNode} icon - Ícono (string con clase CSS o componente React) / Icon (CSS class string or React component)
 */
 interface TableHeaderConfig {
  title?: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
}

// ====================================================================
// MOBILE CONFIGURATION / CONFIGURACIÓN MÓVIL
// ====================================================================

/**
 * Ítem de acción para deslizamiento (swipe) en móvil
 * Swipe action item for mobile
 *
 * @property {React.ReactNode} icon - Ícono a mostrar (componente React) / Icon to display (React component)
 * @property {string} color - Color de fondo (clase de Tailwind como "bg-red-500") / Background color (Tailwind class like "bg-red-500")
 * @property {string} label - Etiqueta opcional / Optional label
 * @property {Function} action - Acción a ejecutar (recibe la fila) / Action to execute (receives the row)
 */
 interface SwipeActionItem {
  icon: React.ReactNode;
  color: string;
  label?: string;
  action?: (row: any) => void;
}

/**
 * Configuración de acciones de deslizamiento (swipe) para móvil
 * Swipe actions configuration for mobile
 *
 * @property {SwipeActionItem[]} left - Acciones al deslizar hacia la IZQUIERDA (acción DETRÁS del elemento) / Actions when swiping LEFT (action BEHIND the element)
 * @property {SwipeActionItem[]} right - Acciones al deslizar hacia la DERECHA (acción DETRÁS del elemento) / Actions when swiping RIGHT (action BEHIND the element)
 */
 interface SwipeActionsConfig {
  left?: SwipeActionItem[];
  right?: SwipeActionItem[];
}

/**
 * Configuración de cómo se muestra cada elemento en la lista móvil
 * Configuration of how each item appears in mobile list
 *
 * @property {Function} leading - Elemento a la izquierda (avatar, ícono, imagen) / Leading element (avatar, icon, image)
 * @property {Function} title - Título principal (negrita, más grande) / Main title (bold, larger)
 * @property {Function} subtitle - Subtítulo (texto gris, más pequeño) / Subtitle (gray text, smaller)
 * @property {Function} trailing - Elemento a la derecha (badge, estado, etc.) / Trailing element (badge, status, etc.)
 */
 interface MobileListTileConfig<T = any> {
  leading?: (row: T) => React.ReactNode;
  title?: (row: T) => React.ReactNode;
  subtitle?: (row: T) => React.ReactNode;
  trailing?: (row: T) => React.ReactNode;
}

/**
 * Ítem de filtro rápido para móvil (aparece en el modal de filtros)
 * Quick filter item for mobile (appears in filter modal)
 *
 * @property {keyof TTable} dataField - Campo de la tabla a filtrar (debe ser una clave válida de TTable) / Table field to filter (must be a valid key of TTable)
 * @property {string} label - Etiqueta visible del filtro / Filter visible label
 * @property {string} type - Tipo de filtro (texto, fecha, select, número) / Filter type (text, date, select, number)
 * @property {Array} options - Opciones para el tipo "select" / Options for "select" type
 * @property {string} placeholder - Texto de ayuda en el input / Input placeholder text
 */
 interface MobileQuickFilterItem<TTable = any> {
  dataField: keyof TTable;
  label: string;
  type?: "text" | "date" | "select" | "number";
  options?: { label: string; value: any }[];
  placeholder?: string;
}

/**
 * Configuración de filtros rápidos para móvil
 * Quick filters configuration for mobile
 *
 * @property {boolean} enabled - Habilita el botón de filtros en móvil / Enables filter button on mobile
 * @property {MobileQuickFilterItem[]} filters - Lista de filtros disponibles / List of available filters
 */
 interface MobileQuickFiltersConfig<TTable = any> {
  enabled?: boolean;
  filters?: MobileQuickFilterItem<TTable>[];
}

/**
 * Configuración completa para la experiencia móvil de la tabla
 * Complete configuration for mobile table experience
 *
 * @property {boolean} enabled - Habilita/deshabilita toda la configuración móvil / Enables/disables all mobile configuration
 * @property {boolean} activeViews - Muestra el selector de vistas (lista, tarjetas, timeline, etc.) / Shows view selector (list, cards, timeline, etc.)
 * @property {MobileListTileConfig} listTile - Personalización del aspecto de cada fila / Customization of each row appearance
 * @property {SwipeActionsConfig} swipeActions - Acciones de deslizamiento (swipe) / Swipe actions
 * @property {MobileQuickFiltersConfig} quickFilters - Filtros rápidos en modal / Quick filters modal
 */
 interface MobileConfig<T = any> {
  enabled?: boolean;
  activeViews?: boolean;
  listTile?: MobileListTileConfig<T>;
  swipeActions?: SwipeActionsConfig;
  quickFilters?: MobileQuickFiltersConfig<T>;
}

// ====================================================================
// OVERRIDES COMPONENTS / COMPONENTES SOBRESCRITOS
// ====================================================================

/**
 * Componentes personalizados para sobrescribir el renderizado de campos y tabla
 * Custom components to override field and table rendering
 *
 * @property {React.ComponentType} text - Componente personalizado para campos de texto / Custom text field component
 * @property {React.ComponentType} select - Componente personalizado para campos de selección / Custom select field component
 * @property {React.ComponentType} file - Componente personalizado para campos de archivo / Custom file field component
 * @property {React.ComponentType} color - Componente personalizado para selector de color / Custom color picker component
 * @property {React.ComponentType} password - Componente personalizado para campo de contraseña / Custom password field component
 * @property {React.ComponentType} textarea - Componente personalizado para área de texto / Custom textarea component
 * @property {React.ComponentType} number - Componente personalizado para campo numérico / Custom number field component
 * @property {React.ComponentType} radio - Componente personalizado para radio buttons / Custom radio group component
 * @property {React.ComponentType} toggle - Componente personalizado para toggle/switch / Custom toggle/switch component
 * @property {React.ComponentType} checkbox - Componente personalizado para checkbox / Custom checkbox component
 * @property {React.ComponentType} date - Componente personalizado para fecha / Custom date component
 * @property {React.ComponentType} range - Componente personalizado para rango / Custom range component
 * @property {React.ComponentType} tableColumns - Componente personalizado para la tabla completa / Custom full table component
 * @property {React.ComponentType} submitButton - Componente personalizado para el botón de envío / Custom submit button component
 * @property {React.ComponentType} [fieldName] - Permite sobrescribir campos por nombre específico / Allows overriding fields by specific name
 */
export interface OverrideComponents {
  text?: React.ComponentType<OverrideFieldProps>;
  select?: React.ComponentType<OverrideSelectProps>;
  file?: React.ComponentType<OverrideFieldProps>;
  color?: React.ComponentType<OverrideFieldProps>;
  password?: React.ComponentType<OverrideFieldProps>;
  textarea?: React.ComponentType<OverrideFieldProps>;
  number?: React.ComponentType<OverrideFieldProps>;
  radio?: React.ComponentType<OverrideFieldProps>;
  toggle?: React.ComponentType<OverrideFieldProps>;
  checkbox?: React.ComponentType<OverrideFieldProps>;
  date?: React.ComponentType<OverrideFieldProps>;
  range?: React.ComponentType<OverrideFieldProps>;
  tableColumns?: React.ComponentType<OverrideTableProps>;
  submitButton?: React.ComponentType<OverrideSubmitButtonProps>;
  [fieldName: string]: React.ComponentType<any> | undefined;
}

/**
 * Props estándar para componentes de campo sobrescritos
 * Standard props for overridden field components
 *
 * @property {string} name - Nombre del campo (key en Formik) / Field name (key in Formik)
 * @property {string} label - Etiqueta visible / Visible label
 * @property {any} value - Valor actual del campo / Current field value
 * @property {Function} onChange - Función para actualizar el valor / Function to update value
 * @property {Function} onBlur - Función para marcar como tocado / Function to mark as touched
 * @property {string} error - Mensaje de error de validación / Validation error message
 * @property {boolean} touched - Indica si el campo fue tocado / Indicates if field was touched
 * @property {boolean} required - Indica si es obligatorio / Indicates if required
 * @property {boolean} disabled - Indica si está deshabilitado / Indicates if disabled
 * @property {string} placeholder - Texto de ayuda / Placeholder text
 */
export interface OverrideFieldProps {
  name: string;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: any;
}

/**
 * Props específicas para componentes de selección sobrescritos
 * Specific props for overridden select components
 *
 * @property {Array} options - Opciones disponibles / Available options
 * @property {boolean} multiple - Permite selección múltiple / Allows multi-selection
 * @property {boolean} searchable - Habilita búsqueda / Enables search
 */
export interface OverrideSelectProps extends OverrideFieldProps {
  options?: Array<{ id: string | number; name: string; [key: string]: any }>;
  multiple?: boolean;
  searchable?: boolean;
}

/**
 * Props para componente de tabla sobrescrito
 * Props for overridden table component
 *
 * @property {Array} columns - Configuración de columnas / Columns configuration
 * @property {any[]} data - Datos de la tabla / Table data
 * @property {Function} onEdit - Función de edición / Edit callback
 * @property {Function} onDelete - Función de eliminación / Delete callback
 * @property {boolean} loading - Estado de carga / Loading state
 * @property {TableActionsConfig} actionsConfig - Configuración de acciones heredada / Inherited actions configuration
 * @property {TableHeaderConfig} headerConfig - Configuración de cabecera heredada / Inherited header configuration
 */
export interface OverrideTableProps<T = any> {
  columns: Array<{
    field: string;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
  actionsConfig?: TableActionsConfig<T>;
  headerConfig?: TableHeaderConfig;
}

/**
 * Props para botón de envío sobrescrito
 * Props for overridden submit button
 *
 * @property {boolean} isSubmitting - Estado de envío / Submitting state
 * @property {string} label - Texto normal del botón / Normal button text
 * @property {string} loadingLabel - Texto mientras se envía / Text while submitting
 * @property {Function} onClick - Función al hacer clic / Click handler
 */
export interface OverrideSubmitButtonProps {
  isSubmitting?: boolean;
  label?: string;
  loadingLabel?: string;
  onClick?: () => void;
}

// ====================================================================
// BUILD RESULT / RESULTADO DEL CONSTRUCTOR
// ====================================================================

/**
 * Resultado final de la configuración del CRUD
 * Final CRUD configuration output
 *
 * @property {string[]} textFields - Lista de campos de texto / Text fields list
 * @property {string[]} selectFields - Lista de campos de selección / Select fields list
 * @property {string[]} fileFields - Lista de campos de archivo / File fields list
 * @property {string[]} colorFields - Lista de campos de color / Color fields list
 * @property {string[]} passwordFields - Lista de campos de contraseña / Password fields list
 * @property {string[]} textareaFields - Lista de áreas de texto / Textarea fields list
 * @property {string[]} numberFields - Lista de campos numéricos / Number fields list
 * @property {string[]} radioFields - Lista de grupos de radio / Radio group fields list
 * @property {string[]} toggleFields - Lista de interruptores / Toggle fields list
 * @property {string[]} checkboxFields - Lista de checkboxes / Checkbox fields list
 * @property {Record} textConfigs - Configuraciones de campos de texto / Text field configurations
 * @property {Record} tableColumns - Configuraciones de columnas de tabla / Table column configurations
 * @property {Record} selectConfigs - Configuraciones de campos de selección / Select field configurations
 * @property {Record} fileConfigs - Configuraciones de campos de archivo / File field configurations
 * @property {Record} colorConfigs - Configuraciones de campos de color / Color field configurations
 * @property {Record} passwordConfigs - Configuraciones de campos de contraseña / Password field configurations
 * @property {Record} textareaConfigs - Configuraciones de áreas de texto / Textarea field configurations
 * @property {Record} numberConfigs - Configuraciones de campos numéricos / Number field configurations
 * @property {Record} radioConfigs - Configuraciones de grupos de radio / Radio group configurations
 * @property {Record} toggleConfigs - Configuraciones de interruptores / Toggle configurations
 * @property {Record} checkboxConfigs - Configuraciones de checkboxes / Checkbox configurations
 * @property {Record} tableConfig - Configuración de tabla (alias de tableColumns) / Table configuration (alias of tableColumns)
 * @property {TableActionsConfig} tableActions - Configuración de acciones de tabla / Table actions configuration
 * @property {TableHeaderConfig} tableHeader - Configuración de cabecera de tabla / Table header configuration
 * @property {any} uiLayout - Configuración de diseño de UI (stepper/box) / UI layout configuration (stepper/box)
 * @property {any} validationSchema - Esquema de validación Yup / Yup validation schema
 * @property {OverrideComponents} overrides - Componentes sobrescritos / Overridden components
 * @property {Function} render - Función de renderizado personalizado / Custom render function
 * @property {Function} getOptionLabel - Obtiene la etiqueta de una opción de select / Gets select option label
 * @property {Function} getOptionValue - Obtiene el valor de una opción de select / Gets select option value
 * @property {MobileConfig} mobileConfig - Configuración para experiencia móvil / Mobile configuration
 */
export type BuildResult<TForm = any, TTable = any> = {
  textFields: string[];
  selectFields: string[];
  fileFields: string[];
  colorFields: string[];
  passwordFields: string[];
  textareaFields: string[];
  numberFields: string[];
  radioFields: string[];
  toggleFields: string[];
  checkboxFields: string[];
  textConfigs: Record<string, TextConfig<TForm>>;
  tableColumns: Record<string, TableColumnConfig<TTable>>;
  selectConfigs: Record<string, SelectConfig<TForm>>;
  fileConfigs: Record<string, FileUploadConfig<TForm>>;
  colorConfigs: Record<string, ColorPickerConfig<TForm>>;
  passwordConfigs: Record<string, PasswordConfig<TForm>>;
  textareaConfigs: Record<string, TextareaConfig<TForm>>;
  numberConfigs: Record<string, NumberConfig<TForm>>;
  radioConfigs: Record<string, RadioGroupConfig<any, TForm>>;
  toggleConfigs: Record<string, ToggleConfig<TForm>>;
  checkboxConfigs: Record<string, CheckboxConfig<TForm>>;
  tableConfig: Record<string, TableColumnConfig<TTable>>;
  tableActions?: TableActionsConfig<TTable>;
  tableHeader?: TableHeaderConfig;
  uiLayout: any;
  validationSchema: any;
  overrides: OverrideComponents;
  render: ((ctx: RenderContext<TForm, TTable>) => React.ReactNode) | null;
  getOptionLabel: (field: string, option: any) => string;
  getOptionValue: (field: string, option: any) => any;
  mobileConfig?: MobileConfig<TTable>;
};

// ====================================================================
// RENDER CONTEXT / CONTEXTO DE RENDERIZADO
// ====================================================================

/**
 * Contexto de renderizado para la función personalizada de render
 * Render context for custom render function
 *
 * @property {Object} fields - Campos agrupados por tipo / Fields grouped by type
 * @property {React.ComponentType} Formik - Componente Formik para envolver el formulario / Formik wrapper component
 * @property {React.ComponentType} Table - Componente de tabla por defecto (opcional) / Default table component (optional)
 * @property {OverrideComponents} overrides - Componentes sobrescritos / Overridden components
 * @property {GenericDataReturn} hook - Hook principal del CRUD / Main CRUD hook
 * @property {Object} modal - Control del modal / Modal control
 * @property {boolean} modal.open - Indica si el modal está abierto / Indicates if modal is open
 * @property {Function} modal.close - Cierra el modal / Closes the modal
 * @property {Function} modal.openWith - Abre el modal con datos opcionales / Opens modal with optional data
 */
export type RenderContext<TForm, TTable> = {
  fields: {
    text: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    select: Array<{
      name: string;
      component: React.ComponentType<OverrideSelectProps>;
      config: any;
      props: any;
    }>;
    file: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    color: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    password: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    textarea: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    number: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    radio: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    toggle: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    checkbox: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    date?: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
    range?: Array<{
      name: string;
      component: React.ComponentType<OverrideFieldProps>;
      config: any;
      props: any;
    }>;
  };
  Formik: React.ComponentType<{
    children: (formikBag: {
      values: TForm;
      setFieldValue: (name: string, value: any) => void;
      setFieldTouched: (name: string, touched: boolean) => void;
      errors: Record<string, string>;
      touched: Record<string, boolean>;
      isSubmitting: boolean;
      submitForm: () => Promise<void>;
      handleSubmit: () => void;
    }) => React.ReactNode;
  }>;
  Table?: React.ComponentType<{}>;
  overrides: OverrideComponents;
  hook: GenericDataReturn<TForm>;
  modal: {
    open: boolean;
    close: () => void;
    openWith: (data?: TForm) => void;
  };
};

// ====================================================================
// CONFIGURATION BUILDER / CONSTRUCTOR DE CONFIGURACIÓN
// ====================================================================

/**
 * Constructor fluido para configurar un CRUD completo
 * Fluent builder for complete CRUD configuration
 *
 * @template TForm - Tipo del formulario (datos que se guardan en BD) / Form type (data saved to database)
 * @template TTable - Tipo de la tabla (datos enriquecidos para mostrar) / Table type (enriched data for display)
 *
 * @example
 * const config = ConfigCrud<MyForm, MyTable>()
 *   .fields({ text: ["name", "email"], select: ["role_id"] })
 *   .text({ name: { label: "Nombre" } })
 *   .select({ role_id: { label: "Rol", keyId: "id", keyLabel: "name" } })
 *   .build();
 */
export const ConfigCrud = <
  TForm extends object,
  TTable extends object = TForm,
>() => {
  // Listas de campos / Field lists
  let textFieldsList: (NestedKeys<TForm> & string)[] = [];
  let selectFieldsList: (NestedKeys<TForm> & string)[] = [];
  let fileFieldsList: (NestedKeys<TForm> & string)[] = [];
  let colorFieldsList: (NestedKeys<TForm> & string)[] = [];
  let passwordFieldsList: (NestedKeys<TForm> & string)[] = [];
  let textareaFieldsList: (NestedKeys<TForm> & string)[] = [];
  let numberFieldsList: (NestedKeys<TForm> & string)[] = [];
  let radioFieldsList: (NestedKeys<TForm> & string)[] = [];
  let toggleFieldsList: (NestedKeys<TForm> & string)[] = [];
  let checkboxFieldsList: (NestedKeys<TForm> & string)[] = [];

  // Configuraciones / Configurations
  let textConfigs: Record<string, TextConfig<TForm>> = {};
  let selectConfigs: Record<string, SelectConfig<TForm>> = {};
  let fileConfigs: Record<string, FileUploadConfig<TForm>> = {};
  let colorConfigs: Record<string, ColorPickerConfig<TForm>> = {};
  let passwordConfigs: Record<string, PasswordConfig<TForm>> = {};
  let textareaConfigs: Record<string, TextareaConfig<TForm>> = {};
  let numberConfigs: Record<string, NumberConfig<TForm>> = {};
  let radioConfigs: Record<string, RadioGroupConfig<any, TForm>> = {};
  let toggleConfigs: Record<string, ToggleConfig<TForm>> = {};
  let checkboxConfigs: Record<string, CheckboxConfig<TForm>> = {};
  let tableConfig: Record<string, TableColumnConfig<TTable>> = {};
  let uiLayoutConfig: any = null;

  // Configuraciones de tabla / Table configurations
  let tableActionsConfig: TableActionsConfig<TTable> | undefined = undefined;
  let tableHeaderConfig: TableHeaderConfig | undefined = undefined;
  let mobileConfigValue: MobileConfig<TTable> | undefined = undefined;

  // Overrides y render / Overrides and render
  let overrideComponents: OverrideComponents = {};
  let renderFunction:
    | ((ctx: RenderContext<TForm, TTable>) => React.ReactNode)
    | null = null;

  /**
   * Construye el esquema de validación Yup combinando todas las validaciones de los campos
   * Builds the Yup validation schema combining all field validations
   *
   * @returns {yup.ObjectSchema} Esquema de validación / Validation schema
   * @internal
   */
  const buildValidationSchema = () => {
    const schema: Record<string, yup.Schema<unknown>> = {};
    const addValidations = (configs: Record<string, any>) => {
      Object.entries(configs).forEach(([field, cfg]) => {
        if (cfg?.validation) {
          const validation = cfg.validation({
            yup,
            value: undefined,
            formData: {} as TForm,
          });
          if (validation) schema[field] = validation;
        }
      });
    };
    addValidations(textConfigs);
    addValidations(selectConfigs);
    addValidations(fileConfigs);
    addValidations(colorConfigs);
    addValidations(passwordConfigs);
    addValidations(textareaConfigs);
    addValidations(numberConfigs);
    addValidations(radioConfigs);
    addValidations(toggleConfigs);
    addValidations(checkboxConfigs);
    return yup.object().shape(schema);
  };

  const api = {
    /**
     * Define qué campos existen en el CRUD y de qué tipo son
     * Defines which fields exist in the CRUD and their types
     *
     * @param {Object} config - Configuración de campos / Field configuration
     * @param {TText} config.text - Campos de texto / Text fields
     * @param {TSelect} config.select - Campos de selección / Select fields
     * @param {TFile} config.file - Campos de archivo / File fields
     * @param {TColor} config.color - Campos de color / Color fields
     * @param {TPassword} config.password - Campos de contraseña / Password fields
     * @param {TTextarea} config.textarea - Áreas de texto / Textarea fields
     * @param {TNumber} config.number - Campos numéricos / Number fields
     * @param {TRadio} config.radio - Grupos de radio / Radio groups
     * @param {TToggle} config.toggle - Interruptores / Toggles
     * @param {TCheckbox} config.checkbox - Checkboxes / Checkboxes
     * @returns {Object} Métodos encadenables / Chainable methods
     */
    fields: <
      TText extends readonly (NestedKeys<TForm> & string)[],
      TSelect extends readonly (NestedKeys<TForm> & string)[],
      TFile extends readonly (NestedKeys<TForm> & string)[],
      TColor extends readonly (NestedKeys<TForm> & string)[],
      TPassword extends readonly (NestedKeys<TForm> & string)[],
      TTextarea extends readonly (NestedKeys<TForm> & string)[],
      TNumber extends readonly (NestedKeys<TForm> & string)[],
      TRadio extends readonly (NestedKeys<TForm> & string)[],
      TToggle extends readonly (NestedKeys<TForm> & string)[],
      TCheckbox extends readonly (NestedKeys<TForm> & string)[],
    >(config: {
      text?: TText;
      select?: TSelect;
      file?: TFile;
      color?: TColor;
      password?: TPassword;
      textarea?: TTextarea;
      number?: TNumber;
      radio?: TRadio;
      toggle?: TToggle;
      checkbox?: TCheckbox;
    }) => {
      if (config.text) textFieldsList = [...config.text];
      if (config.select) selectFieldsList = [...config.select];
      if (config.file) fileFieldsList = [...config.file];
      if (config.color) colorFieldsList = [...config.color];
      if (config.password) passwordFieldsList = [...config.password];
      if (config.textarea) textareaFieldsList = [...config.textarea];
      if (config.number) numberFieldsList = [...config.number];
      if (config.radio) radioFieldsList = [...config.radio];
      if (config.toggle) toggleFieldsList = [...config.toggle];
      if (config.checkbox) checkboxFieldsList = [...config.checkbox];

      type AllAllowed =
        | TText[number]
        | TSelect[number]
        | TFile[number]
        | TColor[number]
        | TPassword[number]
        | TTextarea[number]
        | TNumber[number]
        | TRadio[number]
        | TToggle[number]
        | TCheckbox[number];

      const methods = {
        /**
         * Configura los campos de texto
         * Configures text fields
         *
         * @param {Partial<Record<TText[number], TextConfig<TForm>>>} newConfig - Configuración de campos de texto / Text field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        text: (
          newConfig: Partial<Record<TText[number], TextConfig<TForm>>>,
        ) => {
          textConfigs = { ...textConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los campos de selección
         * Configures select fields
         *
         * @param {Partial<Record<TSelect[number], SelectConfig<TForm>>>} newConfig - Configuración de campos de selección / Select field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        select: (
          newConfig: Partial<Record<TSelect[number], SelectConfig<TForm>>>,
        ) => {
          selectConfigs = { ...selectConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los campos de archivo
         * Configures file fields
         *
         * @param {Partial<Record<TFile[number], FileUploadConfig<TForm>>>} newConfig - Configuración de campos de archivo / File field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        file: (
          newConfig: Partial<Record<TFile[number], FileUploadConfig<TForm>>>,
        ) => {
          fileConfigs = { ...fileConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los campos de color
         * Configures color fields
         *
         * @param {Partial<Record<TColor[number], ColorPickerConfig<TForm>>>} newConfig - Configuración de campos de color / Color field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        color: (
          newConfig: Partial<Record<TColor[number], ColorPickerConfig<TForm>>>,
        ) => {
          colorConfigs = { ...colorConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los campos de contraseña
         * Configures password fields
         *
         * @param {Partial<Record<TPassword[number], PasswordConfig<TForm>>>} newConfig - Configuración de campos de contraseña / Password field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        password: (
          newConfig: Partial<Record<TPassword[number], PasswordConfig<TForm>>>,
        ) => {
          passwordConfigs = { ...passwordConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura las áreas de texto
         * Configures textarea fields
         *
         * @param {Partial<Record<TTextarea[number], TextareaConfig<TForm>>>} newConfig - Configuración de áreas de texto / Textarea field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        textarea: (
          newConfig: Partial<Record<TTextarea[number], TextareaConfig<TForm>>>,
        ) => {
          textareaConfigs = { ...textareaConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los campos numéricos
         * Configures number fields
         *
         * @param {Partial<Record<TNumber[number], NumberConfig<TForm>>>} newConfig - Configuración de campos numéricos / Number field configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        number: (
          newConfig: Partial<Record<TNumber[number], NumberConfig<TForm>>>,
        ) => {
          numberConfigs = { ...numberConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los grupos de radio
         * Configures radio groups
         *
         * @param {Partial<Record<TRadio[number], RadioGroupConfig<any, TForm>>>} newConfig - Configuración de grupos de radio / Radio group configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        radio: (
          newConfig: Partial<
            Record<TRadio[number], RadioGroupConfig<any, TForm>>
          >,
        ) => {
          radioConfigs = { ...radioConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los interruptores
         * Configures toggle/switch fields
         *
         * @param {Partial<Record<TToggle[number], ToggleConfig<TForm>>>} newConfig - Configuración de interruptores / Toggle configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        toggle: (
          newConfig: Partial<Record<TToggle[number], ToggleConfig<TForm>>>,
        ) => {
          toggleConfigs = { ...toggleConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura los checkboxes
         * Configures checkbox fields
         *
         * @param {Partial<Record<TCheckbox[number], CheckboxConfig<TForm>>>} newConfig - Configuración de checkboxes / Checkbox configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        checkbox: (
          newConfig: Partial<Record<TCheckbox[number], CheckboxConfig<TForm>>>,
        ) => {
          checkboxConfigs = { ...checkboxConfigs, ...newConfig };
          return methods;
        },

        /**
         * Configura las columnas de la tabla
         * Configures table columns
         *
         * @param {Partial<Record<keyof TTable, TableColumnConfig<TTable>>>} newConfig - Configuración de columnas / Column configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        tableColumns: (
          newConfig: Partial<Record<keyof TTable, TableColumnConfig<TTable>>>,
        ) => {
          tableConfig = { ...tableConfig, ...newConfig };
          return methods;
        },

        /**
         * Configura las acciones de la tabla (editar, eliminar, botones personalizados)
         * Configures table actions (edit, delete, custom buttons)
         *
         * @param {TableActionsConfig<TTable>} actions - Configuración de acciones / Actions configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        tableActions: (actions: TableActionsConfig<TTable>) => {
          tableActionsConfig = actions;
          return methods;
        },

        /**
         * Configura la cabecera de la tabla (título, subtítulo, ícono)
         * Configures table header (title, subtitle, icon)
         *
         * @param {TableHeaderConfig} header - Configuración de cabecera / Header configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        tableHeader: (header: TableHeaderConfig) => {
          tableHeaderConfig = header;
          return methods;
        },

        /**
         * Configura la experiencia móvil (swipe actions, list tile, quick filters)
         * Configures mobile experience (swipe actions, list tile, quick filters)
         *
         * @param {MobileConfig<TTable>} config - Configuración móvil / Mobile configuration
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        mobile: (config: MobileConfig<TTable>) => {
          mobileConfigValue = config;
          return methods;
        },

        /**
         * Configura el diseño del formulario (stepper o box con secciones)
         * Configures form layout (stepper or box with sections)
         *
         * @param {Object} uiConfig - Configuración de UI / UI configuration
         * @param {("stepper"|"box")} uiConfig.mode - Modo de layout / Layout mode
         * @param {TNames} uiConfig.sections - Nombres de las secciones / Section names
         * @param {Object} uiConfig.fieldsPerSection - Mapeo de campos por sección / Fields per section mapping
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        layout: <TNames extends readonly string[]>(uiConfig: {
          mode: "stepper" | "box";
          sections: TNames;
          fieldsPerSection: { [K in TNames[number]]: AllAllowed[] };
        }) => {
          uiLayoutConfig = uiConfig;
          return methods;
        },

        /**
         * Sobrescribe componentes por defecto con componentes personalizados
         * Overrides default components with custom components
         *
         * @param {Object} overrides - Componentes sobrescritos / Overridden components
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        override: (overrides: {
          text?: React.ComponentType<OverrideFieldProps>;
          select?: React.ComponentType<OverrideSelectProps>;
          file?: React.ComponentType<OverrideFieldProps>;
          color?: React.ComponentType<OverrideFieldProps>;
          password?: React.ComponentType<OverrideFieldProps>;
          textarea?: React.ComponentType<OverrideFieldProps>;
          number?: React.ComponentType<OverrideFieldProps>;
          radio?: React.ComponentType<OverrideFieldProps>;
          toggle?: React.ComponentType<OverrideFieldProps>;
          checkbox?: React.ComponentType<OverrideFieldProps>;
          date?: React.ComponentType<OverrideFieldProps>;
          range?: React.ComponentType<OverrideFieldProps>;
          tableColumns?: React.ComponentType<OverrideTableProps<TTable>>;
          submitButton?: React.ComponentType<OverrideSubmitButtonProps>;
          [fieldName: string]: React.ComponentType<any> | undefined;
        }) => {
          overrideComponents = { ...overrideComponents, ...overrides };
          return methods;
        },

        /**
         * Permite renderizar completamente el CRUD con un diseño personalizado
         * Allows completely custom CRUD rendering with a custom design
         *
         * @param {Function} fn - Función de renderizado que recibe el contexto / Render function that receives the context
         * @returns {Object} Métodos encadenables / Chainable methods
         */
        render: (
          fn: (ctx: RenderContext<TForm, TTable>) => React.ReactNode,
        ) => {
          renderFunction = fn;
          return methods;
        },

        /**
         * Construye la configuración final del CRUD
         * Builds the final CRUD configuration
         *
         * @returns {BuildResult<TForm, TTable>} Configuración final / Final configuration
         */
        build: (): BuildResult<TForm, TTable> => ({
          tableColumns: tableConfig,
          tableConfig: tableConfig,
          textFields: textFieldsList,
          selectFields: selectFieldsList,
          fileFields: fileFieldsList,
          colorFields: colorFieldsList,
          passwordFields: passwordFieldsList,
          textareaFields: textareaFieldsList,
          numberFields: numberFieldsList,
          radioFields: radioFieldsList,
          toggleFields: toggleFieldsList,
          checkboxFields: checkboxFieldsList,
          textConfigs,
          selectConfigs,
          fileConfigs,
          colorConfigs,
          passwordConfigs,
          textareaConfigs,
          numberConfigs,
          radioConfigs,
          toggleConfigs,
          checkboxConfigs,
          tableActions: tableActionsConfig,
          tableHeader: tableHeaderConfig,
          mobileConfig: mobileConfigValue,
          uiLayout: uiLayoutConfig,
          validationSchema: buildValidationSchema(),
          getOptionLabel: (field: string, option: any) => {
            const cfg = selectConfigs[field];
            const keyLabel = cfg?.keyLabel ?? "label";
            return option?.[keyLabel] ?? "";
          },
          getOptionValue: (field: string, option: any) => {
            const cfg = selectConfigs[field];
            const keyId = cfg?.keyId ?? "id";
            return option?.[keyId];
          },
          overrides: overrideComponents,
          render: renderFunction,
        }),
      };
      return methods;
    },
  };
  return api;
};

// ====================================================================
// EXPORTED TYPES / TIPOS EXPORTADOS
// ====================================================================

export type {
  ResponsiveSizes,
  TextConfig,
  SelectConfig,
  FileUploadConfig,
  ColorPickerConfig,
  PasswordConfig,
  TextareaConfig,
  NumberConfig,
  RadioGroupConfig,
  ToggleConfig,
  CheckboxConfig,
  TableActionButton,
  TableActionsConfig,
  TableHeaderConfig,
  SwipeActionItem,
  SwipeActionsConfig,
  MobileListTileConfig,
  MobileQuickFiltersConfig,
  MobileConfig,
};
