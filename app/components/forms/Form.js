import React from 'react';
import { Formik } from 'formik';

function AppForm({
  initialValues,
  enableReinitialize,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
