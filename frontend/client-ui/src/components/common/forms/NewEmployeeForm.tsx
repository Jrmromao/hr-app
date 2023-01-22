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
  const { employeeStore } = useStore();

  return (

    <Fragment>
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}


      <Header content='Add Employee' icon={'user plus'} />
      <p>Fill in the employee's personal information.</p>
      <Formik
        initialValues={{ firstName: '',lastName: '', grossSalary: 0, employeeNumb: '', email: '', error: null }}
        onSubmit={(values, { setErrors }) =>
          employeeStore.create(values)
            .catch((error) => setErrors({ error: error.message }))
        }
        validationSchema={Yup.object({
          employeeNumb: Yup.string().required(),
          email: Yup.string().required(),
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          // dob: Yup.string().required(),
          // grossSalary: Yup.string().required(),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="employeeNumb" placeholder="Employee number" label='Employee number' />

            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 9 }}>
                <MyTextInput name="firstName" placeholder="First Name" label='First Name' /></div>
              <div style={{ marginLeft: 3 }}>
                <MyTextInput name="lastName" placeholder="Last Name" label='Last Name' /></div>
            </div>
            <MyTextInput name="email" placeholder="Email" label='Email' type='email' />

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
