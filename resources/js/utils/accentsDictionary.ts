/**
 * Diccionario de palabras comunes con acentos correctos.
 * La clave es la versión SIN acentos (lowercase) → el valor es la versión CORRECTA.
 */
export const accentsDictionary: Record<string, string> = {
    // Nombres propios
    jose: "José",
    maria: "María",
    ramon: "Ramón",
    martin: "Martín",
    lucia: "Lucía",
    sofia: "Sofía",
    andres: "Andrés",
    marquez: "Marquéz",
    dia: "Día",
    hector: "Héctor",
    angel: "Ángel",
    adrian: "Adrián",
    fabian: "Fabián",
    sebastian: "Sebastián",
    joaquin: "Joaquín",
    agustin: "Agustín",
    german: "Germán",
    isaias: "Isaías",
    tobias: "Tobías",
    matias: "Matías",
    elias: "Elías",
    ines: "Inés",
    mendez: "Méndez",
    gonzalez: "González",
    gutierrez: "Gutiérrez",
    hernandez: "Hernández",
    jimenez: "Jiménez",
    lopez: "López",
    martinez: "Martínez",
    perez: "Pérez",
    ramirez: "Ramírez",
    rodriguez: "Rodríguez",
    sanchez: "Sánchez",
    vasquez: "Vásquez",
    velasquez: "Velásquez",
    diaz: "Díaz",
    marin: "Marín",
    davila: "Dávila",
    avila: "Ávila",
    cordoba: "Córdoba",
    bogota: "Bogotá",
    medellin: "Medellín",

    // Palabras comunes en formularios
    cedula: "cédula",
    direccion: "dirección",
    subdireccion: "subdirección",
    telefono: "teléfono",
    numero: "número",
    matricula: "matrícula",
    academico: "académico",
    academica: "académica",
    basico: "básico",
    basica: "básica",
    publico: "público",
    publica: "pública",
    privado: "privado",
    privada: "privada",
    informacion: "información",
    educacion: "educación",
    institucion: "institución",
    descripcion: "descripción",
    observacion: "observación",
    seccion: "sección",
    estadistica: "estadística",
    estadistico: "estadístico",
    matematicas: "matemáticas",
    geografia: "geografía",
    biologia: "biología",
    quimica: "química",
    fisica: "física",
    ingles: "inglés",
    frances: "francés",
    musica: "música",
    tecnico: "técnico",
    tecnica: "técnica",
    tecnologia: "tecnología",
};

/**
 * Normaliza una palabra para comparar:
 * minúsculas + sin acentos + trim
 */
export const normalizeForCompare = (word: unknown): string =>
    (word ?? "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

/**
 * Compara dos palabras ignorando SOLO el case (mayúsculas/minúsculas)
 * pero respetando los acentos.
 */
export const sameAccentsIgnoringCase = (a: unknown, b: unknown): boolean =>
    (a ?? "").toString().toLowerCase() === (b ?? "").toString().toLowerCase();

/**
 * Busca la corrección para una palabra.
 * Devuelve null si:
 *  - no hay sugerencia en el diccionario
 *  - el valor ya tiene los acentos correctos (aunque difiera en case)
 */
export const findAccentCorrection = (word: unknown): string | null => {
    if (!word) return null;

    const original = word.toString().trim();
    if (!original) return null;

    const key = normalizeForCompare(original);
    const corrected = accentsDictionary[key];

    if (!corrected) return null;

    // Si el valor ya tiene los mismos acentos que la corrección (aunque sea en mayúsculas), no sugerir.
    if (sameAccentsIgnoringCase(original, corrected)) return null;

    return corrected;
};

export type AccentCorrection = {
    index: number;
    original: string;
    corrected: string;
};

/**
 * Analiza un texto completo (varias palabras) y devuelve sugerencias
 * palabra por palabra con su índice.
 */
export const findAccentCorrectionsInText = (
    text: unknown,
): AccentCorrection[] => {
    const words = (text ?? "").toString().split(/(\s+)/);
    const corrections: AccentCorrection[] = [];

    words.forEach((word, index) => {
        const corrected = findAccentCorrection(word);
        if (corrected) {
            corrections.push({ index, original: word, corrected });
        }
    });

    return corrections;
};
