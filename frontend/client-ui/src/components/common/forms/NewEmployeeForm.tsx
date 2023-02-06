import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React, {Fragment} from "react";
import {Button, Divider, Grid, Header, Label, Menu, Progress} from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import {useStore} from "../../../stores/store";

import MyDateInput from "../FormComponents/MyDateInput";
import MySelectInput from "../FormComponents/MySelectInput";


export default observer(function NewEmployeeForm() {
    const {employeeStore} = useStore();

    return (

        <Fragment>
            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}


            <Header content='Add Employee' icon={'user plus'}/>
            <p>Fill in the employee's personal information.</p>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    gross_salary: 0,
                    staff_number: '',
                    email: '',
                    company_id: 'c2a4b1a1-4441-41c6-bcb4-8fc8485f71e1',
                    error: null
                }}
                onSubmit={(values, {setErrors}) =>
                    employeeStore.create(values)
                        .catch((error) => setErrors({error: error.message}))
                }
                validationSchema={Yup.object({
                    staff_number: Yup.string().required(),
                    email: Yup.string().required(),
                    first_name: Yup.string().required(),
                    last_name: Yup.string().required(),
                    // dob: Yup.string().required(),
                    // grossSalary: Yup.string().required(),
                })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (


                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="company_id" type={'hidden'} />
                        <MyTextInput name="staff_number" placeholder="Staff number" label='Staff number'/>
                        <div style={{display: 'flex'}}>
                            <div style={{marginRight: 9}}>
                                <MyTextInput name="first_name" placeholder="First Name" label='First Name'/></div>
                            <div style={{marginLeft: 3}}>
                                <MyTextInput name="last_name" placeholder="Last Name" label='Last Name'/></div>
                        </div>
                        <MyTextInput name="email" placeholder="Email" label='Email' type='email'/>

                        {/* <MySelectInput name="role" placeholder="Select" label='Role' options={[]} /> */}
                        {/* <MyTextInput name="grossSalary" placeholder="Salary" label='Gross Salary' type='number' /> */}
                        {/* <MySelectInput name="roleLevel" placeholder="Select" label='Level' options={[]} /> */}

                        {/* <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 9 }}>
                <MySelectInput name="salaryType" placeholder="Select" label='Salary type' options={[]} /></div>
              <div style={{ marginLeft: 3 }}>
                <MyTextInput name="grossSalary" placeholder="EUR" label='Gross salary' type="number" /></div>
            </div> */}

                        <ErrorMessage
                            name="error"
                            render={() => (
                                <Label
                                    style={{marginBottom: 10}}
                                    basic
                                    color="red"
                                    content={errors.error}
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
