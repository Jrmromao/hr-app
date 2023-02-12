import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React, {Fragment, useEffect} from "react";
import {Button, Header, Label, Form as SemanticForm, Segment, Divider} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import {useStore} from "../../../stores/store";
import {contract, EmployeeFormData, jobTitle, team} from "../../../models/employee";
import MySelectInput from "../FormComponents/MySelectInput";
import {useNavigate} from "react-router-dom";
import MyDateInput from "../FormComponents/MyDateInput";

export default observer(function NewEmployeeForm() {
    const {employeeStore, sideDrawerStore} = useStore();


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
                    social_security: '',
                    contract_type: '',
                    job_title: '',
                    company_id: '',
                    address_line_1: '',
                    address_line_2: '',
                    city: '',
                    postcode: '',
                    country: '',
                    nationality:'',
                    phone_number:'',
                    error: null
                }}

                onSubmit={(values, {setErrors}) =>
                    employeeStore.create(values as EmployeeFormData)
                        .catch((error) => setErrors({error: error.message}))
                }


                validationSchema={Yup.object({
                    staff_number: Yup.string().required('Staff number is required'),
                    email_address: Yup.string().required('Email address is required'),
                    first_name: Yup.string().required('First name is required'),
                    last_name: Yup.string().required('Last name is required'),
                    confirm_email_address: Yup.string().required('Email confirmation is required')
                        .oneOf([Yup.ref('email_address'), null], 'Email addresses must match'),
                    social_security: Yup.string().required('Social security number is required'),
                    contract_type: Yup.string().required('Contract type is required'),
                    job_title: Yup.string().required('Job title is required'),
                    team: Yup.string().required('Team is required'),
                    address_line_1: Yup.string().required('Address line 1 is required'),
                    city: Yup.string().required('City is required'),
                    postcode: Yup.string().required('Postcode is required'),
                    country: Yup.string().required('Country is required'),
                    date_of_birth: Yup.string().required('Date of birth is required'),
                    nationality: Yup.string().required('Nationality is required'),

                    phone_number: Yup.string().required('Phone number is required'),

                })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty, resetForm}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="company_id" type={'hidden'} value={'f8905237-1510-420e-bf6b-0ec6b288dd2b'}/>
                        {/*personal details*/}
                        <Segment>
                            <SemanticForm.Group widths='equal'>
                                <MyTextInput name="first_name" placeholder="First Name" label='First Name' required={true}/>
                                <MyTextInput name="last_name" placeholder="Last Name" label='Last Name' required={true}/>
                            </SemanticForm.Group>

                            <SemanticForm.Group widths='equal'>
                                <MyDateInput name="date_0f_birth" label='Date of birth' required={true}/>
                                <MyTextInput name="gender" placeholder="Legal gender" label='Legal gender'/>
                            </SemanticForm.Group>
                            <SemanticForm.Group widths='equal'>
                                <MySelectInput name="nationality" placeholder="Nationality" label='Nationality' required={true} options={contract}/>
                                <MyTextInput name="phone_number" placeholder="Phone number" label='Phone number' required={true}/>
                            </SemanticForm.Group>

                            <MyTextInput name="email_address" placeholder="Email address" label='Email address' type='email' required={true}/>
                            <MyTextInput name="confirm_email_address" placeholder="Confirm email address" label='Confirm email address' type='email' required={true}/>
                        </Segment>

                        {/*work details*/}
                        <Segment>
                            <MyTextInput name="staff_number" placeholder="Staff number" label='Staff number' required={true}/>
                            <SemanticForm.Group widths='equal'>
                                <MySelectInput name="job_title" placeholder="Job title" label='Job title' required={true} options={jobTitle}/>
                                <MySelectInput name="team" placeholder="Team" label='Team' required={true} options={team}/>
                            </SemanticForm.Group>

                            <SemanticForm.Group widths='equal'>
                                <MyTextInput name="social_security" placeholder="Social security #" label='Social security' required={true}/>
                                <MySelectInput name="contract_type" placeholder="Contract type" label='Contract type' required={true} options={contract}/>
                            </SemanticForm.Group>
                        </Segment>
                        {/*address*/}
                        <Segment>
                            <SemanticForm.Group widths='equal'>
                                <MyTextInput name="address_line_1" placeholder="Address line 1" label='Address line 1' required={true}/>
                                <MyTextInput name="address_line_2" placeholder="Address line 2" label='Address line 2'/>
                            </SemanticForm.Group>
                            <SemanticForm.Group widths='equal'>
                                <MyTextInput name="city" placeholder="City" label='City' required={true}/>

                            </SemanticForm.Group>
                            <SemanticForm.Group widths='equal'>
                                <MyTextInput name="postcode" placeholder="Postcode" label='Postcode' required={true}/>
                                <MySelectInput name="country" placeholder="Country" label='Country' required={true} options={contract}/>
                            </SemanticForm.Group>
                        </Segment>
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
                            fluid
                            name='submit'
                            content="Submit"
                            type="submit"

                        />

                    </Form>

                )}
            </Formik> </Fragment>);


});
