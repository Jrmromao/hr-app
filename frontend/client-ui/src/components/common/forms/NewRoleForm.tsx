import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React, {Fragment} from "react";
import {Button, Grid, Header, Icon, Label, Menu, Progress, Segment} from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import {useStore} from "../../../stores/store";

import MyDateInput from "../FormComponents/MyDateInput";
import MySelectInput from "../FormComponents/MySelectInput";


export default observer(function NewRoleForm() {
    const {roleStore} = useStore();

    return (

        <Segment loading={true}>
            {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}

            <Header icon={'briefcase'} content={'New Role'}/>

            <p>Enter a name for the new role and select the legal entities for which it will be available.</p>
            <Formik
                initialValues={{name: "", error: null}}
                onSubmit={(values, {setErrors}) =>
                    roleStore
                        .create(values)
                        .catch((error) => setErrors({error: error.message}))
                }
                validationSchema={Yup.object({
                    name: Yup.string().required(),
                })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name="name" placeholder="" label='Role name' required={true}/>
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
                            Set levels that indicate the degree of performance within a role. E.g. junior, mid and
                            senior.
                        </Segment>
                        <br/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            positive
                            name='login'
                            content="Login"
                            type="submit"
                            fluid
                        />
                    </Form>
                )}
            </Formik>
        </Segment>);


});
