import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Button, Divider, Grid, Header, Label, Menu, Progress } from "semantic-ui-react";

import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useStore } from "../../../stores/store";

import MyDateInput from "./MyDateInput";
import MySelectInput from "./MySelectInput";


export default observer(function NewEmployeeForm() {
  const { userStore } = useStore();

  return (

    <Fragment>
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}


      <Header content='Add Employee' icon={'user plus'} />
      <p>Fill in the employee's personal information.</p>
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
            <MyTextInput name="email" placeholder="Email" label='Email' type="email" />
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 9 }}>
                <MyTextInput name="name" placeholder="Name" label='First Name' /></div>
              <div style={{ marginLeft: 3 }}>
                <MyTextInput name="name" placeholder="Name" label='Last Name' /></div>
            </div>
            <MySelectInput name="location" placeholder="Select" label='Location' options={[]} />

            <MySelectInput name="role" placeholder="Select" label='Role' options={[]} />
            <MySelectInput name="roleLevel" placeholder="Select" label='Level' options={[]} />

            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 9 }}>
                <MySelectInput name="salaryType" placeholder="Select" label='Salary type' options={['Montly', 'Yearly', 'Weekly', 'Daily']} /></div>
              <div style={{ marginLeft: 3 }}>
                <MyTextInput name="grossSalary" placeholder="EUR" label='Gross salary' type="number" /></div>
            </div>


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
