import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React, {Fragment} from "react";
import {Button, Header, Label} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import {useStore} from "../../../stores/store";
import {EmployeeFormData} from "../../../models/employee";

export default observer(function NewEmployeeForm() {
    const {employeeStore} = useStore();

    return (

        <Fragment>
            <Header content='Add Employee' icon={'user plus'}/>
            <p>Fill in the employee's personal information.</p>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    gross_salary: 0,
                    staff_number: '',
                    email_address: '',
                    company_id: 'f8905237-1510-420e-bf6b-0ec6b288dd2b',
                    error: null
                }}
                onSubmit={(values, {setErrors}) =>
                    employeeStore.create(values as EmployeeFormData)
                        .catch((error) => setErrors({error: error.message}))
                }
                validationSchema={Yup.object({
                    staff_number: Yup.string().required(),
                    email_address: Yup.string().required(),
                    first_name: Yup.string().required(),
                    last_name: Yup.string().required(),
                })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="company_id" type={'hidden'}/>
                        <MyTextInput name="staff_number" placeholder="Staff number" label='Staff number'/>
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: 9}}>
                                <MyTextInput name="first_name" placeholder="First Name" label='First Name'/></div>
                            <div style={{marginLeft: 3}}>
                                <MyTextInput name="last_name" placeholder="Last Name" label='Last Name'/></div>
                        </div>
                        <MyTextInput name="email_address" placeholder="Email" label='Email' type='email'/>
                        <ErrorMessage
                            name="error"
                            render={() => (
                                <Label
                                    style={{marginBottom: 10}}
                                    basic
                                    color="red"
                                    content={errors.error as string}
                                />
                            )}
                        />
                        <br/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            positive
                            name='submit'
                            content="Submit"
                            type="submit"
                            fluid
                        />
                    </Form>
                )}
            </Formik> </Fragment>);


});
