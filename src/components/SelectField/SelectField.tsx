import React from "react";
import { Form } from "react-bootstrap";

interface SelectFieldProps {
  options: any;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
interface IGender {
  value: string;
  label: string;
}
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label className="form-label">{label} </Form.Label>
        <Form.Select
          className="form-control"
          aria-label="Default select example"
          onChange={onChange}
        >
          {options.map((item: IGender, index: number) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </>
  );
};
