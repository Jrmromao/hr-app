import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { } from "react";
import { Button, Grid, Header, Label, Menu } from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useStore } from "../../../stores/store";

import MyDateInput from "./MyDateInput";
 

export default observer(function Employees() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ username: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: error.message }))
      }
      validationSchema={Yup.object({
        email: Yup.string().required(),
        name: Yup.string().required(),
        dob: Yup.string().required(),
        department: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">

          <MyTextInput name="name" placeholder="Name" label='First Name' />
          <MyTextInput name="name" placeholder="Name" label='Last Name' />

          <MyDateInput name="dob" placeholderText="Date of Bith" timeCaption="time" dateFormat={'MMM d, yyyy'} label='Date of birth' />
          <MyTextInput name="gender" placeholder="Gender" label='Gender' />
          <MyTextInput name="nationality" placeholder="Nationality" label='Nationality' />
          <MyTextInput name="phoneNum" placeholder="Phone number" label='Phone number' />

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
  );
});
