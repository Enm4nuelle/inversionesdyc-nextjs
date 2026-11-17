"use client";

import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useProduct } from "@/context/ProductContext";
import FormField from "./formField";
import JsonData from "../data/data.json";
import ScrollAnimation from "./scrollAnimation";
import { callSupabaseFunction } from "@/services/services";

// Tipos de "campo" que solo dibujan algo y no guardan valor (ej. títulos de sección)
const NON_INPUT_TYPES = ["sectionTitle"];

export const FormCotization = (props) => {
    const { productInfo } = useProduct();
    //comprobamos si viene desde la página de detalle producto y jalamos esa info
    const { nameProduct, urlImg } = productInfo;

    const getInitialValue = (field) => {
        if (field.type === "select") return 0;
        if (field.type === "checkboxGroup") return [];
        if (field.type === "checkbox") return false;
        return "";
    };

    const isEmpty = (field, value) => {
        if (field.type === "select") {
            return Number(value) === 0;
        }
        if (field.type === "checkboxGroup") {
            return false;
        }
        if (field.type === "checkbox") {
            return value !== true;
        }
        return !value;
    };

    // Un campo es visible si:
    // - no tiene hideWhenProductRef o no venimos con producto de referencia
    // - no tiene showWhen, o el campo indicado en showWhen está marcado (ej. "isMinor")
    const isFieldVisible = (field, currentValues) =>
        !(field.hideWhenProductRef && nameProduct) &&
        !(field.showWhen && !currentValues[field.showWhen]);

    const fields = props.data.fields;

    // valores iniciales derivados del arreglo de campos, uno por cada "name"
    const initialValues = useMemo(() => {
        const values = {};
        fields.forEach((field) => {
            if (NON_INPUT_TYPES.includes(field.type)) {
                return;
            }
            values[field.name] = getInitialValue(field);
        });
        return values;
    }, [fields]);

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // honeypot: campo invisible para personas; si llega con texto, lo llenó un bot
    const [honeypot, setHoneypot] = useState("");
    const [isSending, setIsSending] = useState(false);
    // resultado del backend (código del reclamo, fecha límite, etc.)
    const [submitResult, setSubmitResult] = useState(null);

    const handleChange = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setHoneypot("");
    };

    // Campos visibles que sí guardan un valor (sin títulos de sección)
    const getInputFields = (currentValues) =>
        fields.filter((field) => !NON_INPUT_TYPES.includes(field.type) && isFieldVisible(field, currentValues));

    // Arma el JSON que se envía al backend.
    // Solo se envían los campos visibles que tengan "backendName" en el data.json;
    // la clave del JSON es ese backendName (ej. "name" -> "nombre").
    const buildBackendBody = (currentValues) => {
        const body = {
            empresa_id: props.data.idCompany,
            website: honeypot,
        };
        getInputFields(currentValues).forEach((field) => {
            if (!field.backendName) return;
            const value = currentValues[field.name];
            if (field.type === "checkbox") {
                body[field.backendName] = value === true;
            } else if (field.type === "select") {
                body[field.backendName] = Number(value) === 0 ? null : value;
            } else if (field.type === "checkboxGroup") {
                body[field.backendName] = value;
            } else {
                body[field.backendName] = typeof value === "string" ? value.trim() : value;
            }
        });
        return body;
    };

    // Formatea "2026-12-07" como "07/12/2026"
    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    };

    const sendToBackend = async () => {
        try {
            const data = await callSupabaseFunction(props.data.backendFunction, buildBackendBody(values));
            setSubmitResult(data);
            toast(props.data.messageSuccess);
            resetForm();
        } catch (error) {
            console.error("Error enviando al backend:", error);
            toast(error.errores && error.errores.length > 0
                ? error.errores.join(" ")
                : props.data.messageErrorSend);
        }
    };

    const sendToWeb3Forms = async () => {
        // si un bot llenó el honeypot, fingimos éxito sin enviar nada
        if (honeypot) {
            toast(props.data.messageSuccess);
            resetForm();
            return;
        }

        const formData = new FormData();
        formData.append("access_key", JsonData.keyWeb3Form);
        if(nameProduct){
            formData.append("Producto", nameProduct);
        }
        getInputFields(values).forEach((field)=>{
            if(field.type === "select"){
                const option = field.options.find((opt) => String(opt.value) === String(values[field.name]));
                if (option) formData.append(field.formLabel, option.text);
            }else if(field.type === "checkboxGroup"){
                const texts = values[field.name]
                    .map((v) => field.options.find((opt) => String(opt.value) === String(v)))
                    .filter(Boolean)
                    .map((opt) => opt.text);
                formData.append(field.formLabel, texts.join(", "));
            }else if(field.type === "checkbox"){
                formData.append(field.formLabel, values[field.name] ? "Sí" : "No");
            }else{
                formData.append(field.formLabel, values[field.name]);
            }
        });

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await response.json();
            if (data.success) {
                toast(props.data.messageSuccess);
                resetForm();
            } else {
                console.error("Error Web3Forms:", data);
                toast(props.data.messageErrorSend);
            }
        } catch (error) {
            console.error("Error enviando formulario:", error);
            toast(props.data.messageErrorSend);
        }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (isSending) return; // evita envíos dobles (ej. doble click)

        const newErrors = {};
        let hasError = false;
        // solo se validan los campos visibles (un campo oculto no puede bloquear el envío)
        getInputFields(values).forEach((field) => {
            if (field.required && isEmpty(field, values[field.name])) {
                newErrors[field.name] = true;
                hasError = true;
            } else if (field.exactLength && values[field.name].length !== field.maxLength){
                newErrors[field.name] = true;
                hasError = true;
            }
        });
        setErrors(newErrors);
        if (hasError) return;

        setIsSending(true);
        setSubmitResult(null);
        if (props.data.useBackend) {
            await sendToBackend();
        } else {
            await sendToWeb3Forms();
        }
        setIsSending(false);
    };

    // el campo "specifications" (u otro) puede marcarse con hideWhenProductRef:true
    // para ocultarse cuando ya venimos con producto de referencia, como en el original.
    // Con showWhen:"otroCampo" se muestra solo cuando ese otro campo está marcado.
    const visibleFields = fields.filter((field) => isFieldVisible(field, values));

    // Mensaje de éxito del backend con los datos reemplazados, ej:
    // "Su reclamo fue registrado con el código {codigo}..." -> "...código ASPEM-2026-000001..."
    const resultMessage = submitResult && props.data.messageSuccessBackend
        ? props.data.messageSuccessBackend
            .replace("{codigo}", submitResult.codigo || "")
            .replace("{fechaLimite}", formatDate(submitResult.fecha_limite))
        : "";

    return (
        <section
            className={"formCotization " + (props.data.isAfterHeader ? "firstOnPageWithHeader" : "")}
        >
            <div
                className="formCotization-container"
                style={{ "width": props.data.width ? `min(${props.data.width}, 90%)` : "90%" }}
            >
                <div className="formCotization-header">
                    <h1 className="formCotization-header-title">{props.data.title}</h1>
                    <p className="formCotization-header-description">{props.data.description}</p>
                </div>
                {nameProduct && (
                    <ScrollAnimation animation="left" pixelsDisplacement={80} duration={1000}>
                        <div className="formCotization-productReference-container">
                            <div className="formCotization-productReference">
                                <div className="formCotization-productReference-img-container">
                                    <img
                                        src={urlImg}
                                        alt={nameProduct}
                                        className="formCotization-productReference-img"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="formCotization-productReference-name">{nameProduct}</span>
                            </div>
                        </div>
                    </ScrollAnimation>
                )}

                <form className="formCotization-form" onSubmit={onSubmitForm} noValidate>
                    {visibleFields.map((field) => (
                        <FormField
                            key={field.name}
                            field={{
                                ...field,
                                iconAlert: props.data.iconAlert,
                                // un campo puede traer su propio "errorMessage" en el JSON
                                errorMessage: field.errorMessage ? field.errorMessage
                                    : field.exactLength ? (props.data.errorMessageLength1stPart + field.maxLength + props.data.errorMessageLength2ndPart)
                                    : props.data.errorMessage,
                            }}
                            value={values[field.name]}
                            error={!!errors[field.name]}
                            onChange={handleChange}
                        />
                    ))}

                    {/* Honeypot: oculto para personas y lectores de pantalla; los bots suelen llenarlo */}
                    <div className="formCotization-form-honeypot" aria-hidden="true">
                        <label htmlFor="website">No llenar este campo</label>
                        <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </div>

                    <p className="formCotization-form-textAlertForm">{props.data.alertForm}</p>

                    {submitResult && (
                        <div className="formCotization-form-result" role="status">
                            {props.data.successTitle && (
                                <p className="formCotization-form-result-title">{props.data.successTitle}</p>
                            )}
                            {submitResult.codigo && (
                                <p className="formCotization-form-result-code">{submitResult.codigo}</p>
                            )}
                            <p className="formCotization-form-result-text">{resultMessage}</p>
                            {submitResult.constanciaEnviada === false && props.data.messageNoEmail && (
                                <p className="formCotization-form-result-warning">{props.data.messageNoEmail}</p>
                            )}
                        </div>
                    )}

                    <button
                        className="buttonPrimary formCotization-form-button"
                        disabled={isSending}
                    >
                        {isSending && props.data.buttonSendingForm ? props.data.buttonSendingForm : props.data.buttonSendForm}
                    </button>
                </form>
            </div>
        </section>
    )
}
export default FormCotization;