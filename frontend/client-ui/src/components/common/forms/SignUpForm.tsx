import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React, {Fragment} from "react";
import {Button, Grid, Header, Icon, Label, Menu, Progress, Segment} from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import {useStore} from "../../../stores/store";

import MySelectInput from "../FormComponents/MySelectInput";


export default observer(function SignUpForm() {
    const {companyStore} = useStore();

    return (

        <Fragment>
            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}

            <Header icon={'briefcase'} content={'New job'}/>

            {/* <p>Enter a name for the new role and select the legal entities for which it will be available.</p> */}
            <Formik
                initialValues={{companyName: "", password: "", email: "", phoneNumber: "", numEmployees: 0, error: null}}

                onSubmit={(values, {setErrors}) =>
                    companyStore
                        .signUp(values)
                        .catch((error) => setErrors({error: error.message}))
                }
                validationSchema={Yup.object({
                    companyName: Yup.string().required(),
                    email: Yup.string().required(),
                    password: Yup.string().required(),
                    phoneNumber: Yup.string().required(),
                    numEmployees: Yup.number().required(),
                })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (


                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="companyName" placeholder="" label='Company name' required={true}/>
                        <MyTextInput name="email" label='Work email address' placeholder='' type='email'
                                     required={true}/>
                        <MyTextInput name="password" label='Password' placeholder='' type={'password'} required={true}/>
                        <MyTextInput name="phoneNumber" label='Phone number' placeholder='' required={true}/>
                        <MyTextInput name="numEmployees" label='Number of employees' placeholder='' type={'number'} required={true}/>
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

                        <Segment color="teal">
                           Company Data
                        </Segment>
                        <br/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            positive
                            name='sign-up'
                            content="Sign Up"
                            type="submit"
                            fluid
                        />
                    </Form>
                )}
            </Formik> </Fragment>);


});
