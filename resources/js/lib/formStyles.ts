/**
 * Estilos compartidos para todos los componentes de formulario.
 * Cambiar aquí afecta a FormInput, FormSelect y FormMultiselect por igual.
 */

export const FIELD_LABEL =
    "flex items-center gap-1 text-[10px] font-bold text-slate-800 uppercase tracking-wider";

export const FIELD_WRAPPER_BASE =
    "relative w-full rounded-xl border bg-white transition-all duration-200";

export const FIELD_WRAPPER_STATE = {
    normal: "border-slate-300 hover:border-slate-400",
    focus: "border-blue-500 ring-2 ring-blue-500/15",
    error: "border-red-400 ring-2 ring-red-500/10",
    disabled: "bg-slate-50 cursor-not-allowed border-slate-200",
};

// ═══════════════════════════════════════════════════════════
// TEXTO INTERNO DE LOS INPUTS / SELECTS
// Cambia estas 3 líneas y se actualiza en los 3 componentes.
// ═══════════════════════════════════════════════════════════
export const FIELD_TEXT_VALUE =
    "text-[13px] font-bold text-slate-900 tracking-tight";

export const FIELD_TEXT_PLACEHOLDER =
    "text-[14px] font-medium text-slate-500 italic";

export const FIELD_TEXT_LAYOUT = "truncate";

export const FIELD_INPUT_BASE = [
    "w-full bg-transparent outline-none",
    FIELD_TEXT_VALUE,
    "placeholder:italic placeholder:font-medium placeholder:text-slate-500",
    "py-2",
].join(" ");

export const FIELD_ERROR =
    "text-[11px] font-semibold text-red-500 flex items-center gap-1";

export const FIELD_HELP = "text-[10px] text-slate-400 italic";

export const FIELD_CONTAINER = "w-full flex flex-col gap-1.5 relative";
