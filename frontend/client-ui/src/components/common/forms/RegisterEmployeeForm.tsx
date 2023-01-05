import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { } from "react";
import { Button, Header, Label } from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useStore } from "../../../stores/store";

import MyDateInput from "./MyDateInput";
import MainLayout from "../../../layout/MainLayout";
export default observer(function RegisterEmployeeForm() {
  const { userStore } = useStore();

  return (
    <MainLayout>
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
        dob:  Yup.string().required(),
        department: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Register Employee"
            color="orange"
            textAlign="left"
          />
          <MyTextInput name="name" placeholder="Name" />
          <MyTextInput name="email" placeholder="Email" type='email' />
          <MyDateInput name="dob" placeholderText="Date of Bith" timeCaption="time" dateFormat={'MMM d, yyyy'} />
          <MyTextInput name="department" placeholder="Department" />


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
    </MainLayout>
  );
});
