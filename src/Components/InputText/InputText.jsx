import React from "react";
import { Form } from 'react-bootstrap';
import './InputText.css'

export const InputText = ({
    className,
    type,
    name,
    maxLength,
    min,
    max,
    placeholder,
    required,
    changeFunction,
    blurFunction,
}) => {
    return (
        <>
        <Form.Control
            className={className}
            type={type}
            maxLength={maxLength}
            min={min}
            max={max}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={(e) => changeFunction(e)}
            onBlur={(e) => blurFunction(e)}
        />
        </>
    );
};
