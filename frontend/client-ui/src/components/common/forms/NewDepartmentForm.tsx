import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Button, Header, Label} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useStore } from "../../../stores/store";


export default observer(function NewDepartmentForm() {
  const { departmentStore } = useStore();

  return (

    <Fragment>
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}>   </div> */}

      <Header>
        Add department
      </Header>
      <p>Fill in the employee's personal information.</p>
      <Formik
        initialValues={{ name: '', error: null }}
        onSubmit={(values, { setErrors }) =>
          departmentStore.create(values)
            .catch((error) => setErrors({ error: error.message }))
        }
        validationSchema={Yup.object({
          name: Yup.string().required(),
          // dob: Yup.string().required(),
          // grossSalary: Yup.string().required(),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="name" placeholder="Name" label='Name' />

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
