// ────────────────────────────────────────────────────────────
// Transformaciones de texto
// ────────────────────────────────────────────────────────────

export const toUpperCase = (value: unknown): string =>
    (value ?? "").toString().toUpperCase();

export const toLowerCase = (value: unknown): string =>
    (value ?? "").toString().toLowerCase();

/**
 * Tipo Oración: primera letra mayúscula, resto minúscula.
 * Preserva TODOS los espacios.
 */
export const toSentenceCase = (value: unknown): string => {
    const str = (value ?? "").toString();
    if (!str) return str;
    // Usar Array.from para respetar Unicode (acentos, emojis)
    const chars = Array.from(str);
    const first = chars[0].toUpperCase();
    const rest = chars.slice(1).join("").toLowerCase();
    return first + rest;
};

/**
 * Tipo Título: primera letra de cada palabra en mayúscula.
 * Preserva TODOS los espacios.
 */
export const toTitleCase = (value: unknown): string =>
    (value ?? "")
        .toString()
        .toLowerCase()
        .replace(/(^|\s)(\p{L})/gu, (_, sep, char) => sep + char.toUpperCase());

/**
 * Colapsa espacios múltiples a uno solo.
 */
export const collapseSpaces = (value: unknown): string =>
    (value ?? "").toString().replace(/\s{2,}/g, " ");

export const stripAccents = (value: unknown): string =>
    (value ?? "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

export const onlyDigits = (value: unknown): string =>
    (value ?? "").toString().replace(/\D+/g, "");

export const onlyLetters = (value: unknown): string =>
    (value ?? "").toString().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

export const onlyAlphaNumeric = (value: unknown): string =>
    (value ?? "").toString().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

export const sanitizeText = (value: unknown): string =>
    (value ?? "").toString().replace(/<[^>]*>?/gm, "");

const VALID_ROMANS = new Set([
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "XIII",
    "XIV",
    "XV",
    "XVI",
    "XVII",
    "XVIII",
    "XIX",
    "XX",
    "XXI",
    "XXII",
    "XXIII",
    "XXIV",
    "XXV",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "C",
]);

/**
 * Normaliza números romanos a MAYÚSCULAS, palabra por palabra.
 */
export const romanize = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    const str = value.toString();
    if (!str) return "";

    return str
        .split(/(\s+)/)
        .map((chunk) => {
            if (/^\s+$/.test(chunk)) return chunk;
            if (VALID_ROMANS.has(chunk.toUpperCase())) {
                return chunk.toUpperCase();
            }
            return chunk;
        })
        .join("");
};

// ────────────────────────────────────────────────────────────
// Números decimales con separador específico
// ────────────────────────────────────────────────────────────

export const decimalDot = (value: unknown): string => {
    let str = (value ?? "").toString().replace(/[^0-9.]/g, "");
    const parts = str.split(".");
    if (parts.length > 2) {
        str = parts[0] + "." + parts.slice(1).join("");
    }
    return str;
};

export const decimalComma = (value: unknown): string => {
    let str = (value ?? "").toString().replace(/[^0-9,]/g, "");
    const parts = str.split(",");
    if (parts.length > 2) {
        str = parts[0] + "," + parts.slice(1).join("");
    }
    return str;
};

export const detectWrongSeparator = (
    value: unknown,
    expected: "." | ",",
): "coma" | "punto" | null => {
    const str = (value ?? "").toString();
    if (expected === ".") {
        if (str.includes(",")) return "coma";
    } else if (expected === ",") {
        if (str.includes(".")) return "punto";
    }
    return null;
};

// ────────────────────────────────────────────────────────────
// Máscaras
// ────────────────────────────────────────────────────────────

/**
 * Aplica una máscara Y limita la cantidad de dígitos al número de '0' del patrón.
 * '0' = dígito, cualquier otro carácter = literal.
 */
export const applyMask = (value: unknown, mask: string): string => {
    if (!mask) return (value ?? "").toString();

    const maxDigits = (mask.match(/0/g) || []).length;
    const digits = onlyDigits(value).slice(0, maxDigits);

    let result = "";
    let digitIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        if (digitIndex >= digits.length) break;
        if (mask[i] === "0") {
            result += digits[digitIndex];
            digitIndex++;
        } else {
            result += mask[i];
        }
    }
    return result;
};

export const removeMask = (value: unknown): string => onlyDigits(value);

// ────────────────────────────────────────────────────────────
// Validaciones comunes
// ────────────────────────────────────────────────────────────

export const isEmail = (value: unknown): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? "").toString());

export const isPhone = (value: unknown): boolean =>
    /^[0-9]{7,15}$/.test(onlyDigits(value));

// ────────────────────────────────────────────────────────────
// Transformaciones por nombre + pipeline
// ────────────────────────────────────────────────────────────

export type TransformerName =
    | "upper"
    | "lower"
    | "title"
    | "sentence"
    | "noAccents"
    | "digits"
    | "letters"
    | "alphanumeric"
    | "collapseSpaces"
    | "sanitize"
    | "roman"
    | "decimalDot"
    | "decimalComma";

export const transformers: Record<TransformerName, (v: unknown) => string> = {
    upper: toUpperCase,
    lower: toLowerCase,
    title: toTitleCase,
    sentence: toSentenceCase,
    noAccents: stripAccents,
    digits: onlyDigits,
    letters: onlyLetters,
    alphanumeric: onlyAlphaNumeric,
    collapseSpaces,
    sanitize: sanitizeText,
    roman: romanize,
    decimalDot,
    decimalComma,
};

/**
 * Aplica transformaciones en cadena.
 * 'upper|noAccents' → primero upper, luego noAccents.
 */
export const applyTransform = (value: unknown, transform: string): string => {
    if (!transform) return (value ?? "").toString();
    const names = transform
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean) as TransformerName[];
    return names.reduce<string>(
        (acc, name) => {
            const fn = transformers[name];
            return fn ? fn(acc) : acc;
        },
        (value ?? "").toString(),
    );
};
