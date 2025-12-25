
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


export function MultiSelect() {

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });


    return (
        <section>
            <h2>Multi Select</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='formik-container'>
                        <h4>First Name</h4>
                        <Field name="firstName" />
                        {errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                        ) : ''}
                        <h4>Last Name</h4>
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                        ) : ''}
                        <h4>Email</h4>
                        <Field name="email" type="email" />
                        <h4>Email</h4>
                        {errors.email && touched.email ? <div>{errors.email}</div> : ''}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

