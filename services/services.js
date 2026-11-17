import JsonData from "../data/data.json";

// Llama a una Edge Function de Supabase.
// Se usa fetch directo (y no supabase-js) porque la función tiene desactivado
// "Enforce JWT verification": no hace falta enviar la anon key, y así el navegador
// solo manda la cabecera "Content-Type", que es la única que la función permite por CORS.
//
// - functionName: nombre de la función en Supabase (ej. "registrar-reclamo")
// - body: objeto que se envía como JSON
//
// Devuelve la respuesta de la función si todo salió bien.
// Si falla, lanza un Error con:
//   - message: mensaje general devuelto por la función (o uno genérico)
//   - errores: lista de errores de validación (si los hubo)
export const callSupabaseFunction = async (functionName, body) => {
    const response = await fetch(`${JsonData.urlSupabaseFunctions}/${functionName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok || !data || !data.ok) {
        const error = new Error((data && data.error) || "No se pudo completar la solicitud.");
        error.errores = (data && data.errores) || [];
        throw error;
    }
    return data;
};
