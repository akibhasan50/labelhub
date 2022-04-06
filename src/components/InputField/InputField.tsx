import React from "react";
import { Form } from "react-bootstrap";

interface InputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="form-label">{label} </Form.Label>
        <Form.Control
          value={value}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      </Form.Group>
    </>
  );
};
