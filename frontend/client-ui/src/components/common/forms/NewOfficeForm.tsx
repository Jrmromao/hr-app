import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Button, Grid, Header, Icon, Label, Menu, Progress, Segment } from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "../FormComponents/MyTextInput";
import { useStore } from "../../../stores/store";

import MyDateInput from "../FormComponents/MyDateInput";
import MySelectInput from "../FormComponents/MySelectInput";


export default observer(function NewOfficeForm() {
  const { userStore } = useStore();

  return (

    <Fragment>
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}

      <Header icon={'briefcase'}  content={'New job'}/>

      {/* <p>Enter a name for the new role and select the legal entities for which it will be available.</p> */}
      <Formik
        initialValues={{ username: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((error) => setErrors({ error: error.message }))
        }
        validationSchema={Yup.object({
          roleName: Yup.string().required(),
          location: Yup.string().required(),

        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="rolaName" placeholder="" label='Role name' required={true} />

            <MySelectInput name="location" placeholder="Select" label='Location' options={[]}/>

            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <br />

            <Segment color="teal">
              Set levels that indicate the degree of performance within a role. E.g. junior, mid and senior.
            </Segment>
            <br />
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
      </Formik>   </Fragment>);


});
