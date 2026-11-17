// FormField.jsx
// Renderiza un campo de formulario según su "type". Es "tonto" a propósito:
// no sabe nada de validación de negocio, solo dibuja y avisa cambios via onChange(name, value).

export const FormField = ({ field, value, error, onChange }) => {
    const {
        name,
        type,
        placeholder,
        label,
        maxLength,
        options,
        defaultOption,
        allowDecimals,
        text,
        description,
        iconAlert,
        errorMessage,
    } = field;

    const ErrorBlock = () =>
        error ? (
            <div className="formCotization-form-input-noData">
                <i className={"formCotization-form-input-noData-icon " + iconAlert}></i>
                <p className="formCotization-form-input-noData-text">{errorMessage}</p>
            </div>
        ) : null;

    switch (type) {
        case "textarea":
            return (
                <div className="formCotization-form-input-container">
                    <textarea
                        id={name}
                        value={value}
                        maxLength={maxLength}
                        rows={4}
                        onChange={(e) => onChange(name, e.target.value)}
                        className="formCotization-form-input"
                        placeholder=" "
                    />
                    <label htmlFor={name} className="formCotization-form-label">
                        {placeholder}
                    </label>
                    <ErrorBlock />
                </div>
            );

        case "select":
            return (
                <div className="formCotization-form-input-container formCotization-form-select-container">
                    <label className="formCotization-form-labelSelect">{label}</label>
                    <select
                        value={value}
                        className="formCotization-form-select"
                        onChange={(e) => onChange(name, e.target.value)}
                    >
                        <option className="formCotization-form-select-option" value={0}>
                            {defaultOption}
                        </option>
                        {options.map((option, index) => (
                            <option
                                className="formCotization-form-select-option"
                                key={option.text + index}
                                value={option.value}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
                    <ErrorBlock />
                </div>
            );

        case "checkboxGroup":
            return (
                <>
                    <p className="formCotization-form-textExtraInfo">{label}</p>
                    {options.map((opt, index) => {
                        const current = Array.isArray(value) ? value : [];
                        const checked = current.includes(opt.value);
                        return (
                            <div
                                className="filterProducts-mainPart-filter-filters-item-option"
                                key={opt.text + index}
                            >
                                <input
                                    className="filterProducts-mainPart-filter-filters-item-option-checkbox"
                                    checked={checked}
                                    onChange={() => {
                                        const next = checked
                                            ? current.filter((v) => v !== opt.value)
                                            : [...current, opt.value];
                                        onChange(name, next);
                                    }}
                                    type="checkbox"
                                />
                                <p className="filterProducts-mainPart-filter-filters-item-option-text">
                                    {opt.text}
                                </p>
                            </div>
                        );
                    })}
                </>
            );
        // Título de sección: no guarda valor, solo separa visualmente el formulario.
        // "text" es el título y "description" (opcional) un texto de apoyo debajo.
        case "sectionTitle":
            return (
                <div className="formCotization-form-section">
                    <h2 className="formCotization-form-section-title">{text}</h2>
                    {description && (
                        <p className="formCotization-form-section-description">{description}</p>
                    )}
                </div>
            );

        // Casilla única (true/false). Si es "required", obliga a marcarla.
        case "checkbox":
            return (
                <div className="formCotization-form-input-container formCotization-form-checkbox-container">
                    <label htmlFor={name} className="formCotization-form-checkbox">
                        <input
                            id={name}
                            type="checkbox"
                            checked={!!value}
                            onChange={(e) => onChange(name, e.target.checked)}
                            className="formCotization-form-checkbox-input"
                        />
                        <span className="formCotization-form-checkbox-text">{label}</span>
                    </label>
                    <ErrorBlock />
                </div>
            );
        // "text", "tel" y "number" comparten el mismo <input>, "tel" y "number" solo agrega
        // el filtrado de caracteres y los atributos de teclado numérico.
        // "number" con allowDecimals:true permite un punto y hasta 2 decimales (montos).
        case "number":
            return (
                <div className="formCotization-form-input-container">
                    <input
                        id={name}
                        type="text"
                        value={value}
                        maxLength={maxLength}
                        inputMode={allowDecimals ? "decimal" : "numeric"}
                        autoComplete="off"
                        onChange={(e) => {
                            const raw = e.target.value;
                            const cleaned = allowDecimals
                                ? raw.replace(/[^\d.]/g, "").replace(/^(\d*\.?\d{0,2}).*$/, "$1").slice(0, maxLength)
                                : raw.replace(/\D/g, "").slice(0, maxLength);
                            onChange(name, cleaned);
                        }}
                        className="formCotization-form-input"
                        placeholder=" "
                    />
                    <label htmlFor={name} className="formCotization-form-label">
                        {placeholder}
                    </label>
                    <ErrorBlock />
                </div>
            );
        case "tel":
        case "text":
        default:
            return (
                <div className="formCotization-form-input-container">
                    <input
                        id={name}
                        type="text"
                        value={value}
                        maxLength={maxLength}
                        inputMode={type === "tel" ? "tel" : undefined}
                        autoComplete={type === "tel" ? "tel" : undefined}
                        onChange={(e) => {
                            const raw = e.target.value;
                            const cleaned =
                                type === "tel" ? raw.replace(/[^\d+\-()\s]/g, "") : raw;
                            onChange(name, cleaned);
                        }}
                        className="formCotization-form-input"
                        placeholder=" "
                    />
                    <label htmlFor={name} className="formCotization-form-label">
                        {placeholder}
                    </label>
                    <ErrorBlock />
                </div>
            );
    }
};

export default FormField;
