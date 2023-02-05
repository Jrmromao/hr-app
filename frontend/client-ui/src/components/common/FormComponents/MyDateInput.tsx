import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'



interface Props extends ReactDatePickerProps {
    label?: string;
    required?: boolean;
}

export default function MyDateInput(props: Partial<Props>) {
    const [field, meta, helpers] = useField(props.name!);
    return (

        <Form.Field error={meta.touched && !!meta.error} required={props.required}>
            <label>{props.label}</label>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}