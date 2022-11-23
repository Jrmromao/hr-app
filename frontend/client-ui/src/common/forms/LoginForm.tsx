import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Header, Label } from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";
export default observer(function LoginForm() {
  const { userStore } = useStore();
 


  // useEffect(() => {


  //   if (userStore.isLoggedIn)
  //     navigate("/")
  // }, [userStore])


  return (
    <Formik
      initialValues={{ username: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: error.message }))
      }
      validationSchema={Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to HR"
            color="orange"
            textAlign="center"
          />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="password" placeholder="Password" type="password" />


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
