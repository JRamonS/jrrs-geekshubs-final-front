import React from "react";
import { Form } from 'react-bootstrap';
import './InputText.css'

export const InputText = ({
    className,
    type,
    name,
    maxLength,
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
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={(e) => changeFunction(e)}
            onBlur={(e) => blurFunction(e)}
        />
        </>
    );
};
