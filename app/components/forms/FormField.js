import React from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({ name, defaultValue, width, ...otherProps }) {
  const { setFieldTouched, values, setFieldValue, errors, touched } =
    useFormikContext();

  return (
    <>
      <TextInput
        value={values[name]}
        onChangeText={(text) => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        defaultValue={defaultValue}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
