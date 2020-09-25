import { Button, CircularProgress, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Form from '@rjsf/material-ui';
import { useInvasivesApi } from 'api/api';
import { DatabaseContext } from 'contexts/DatabaseContext';
import { JSONSchema7 } from 'json-schema';
import React, { useContext, useEffect, useState } from 'react';
import { Activity } from 'rjsf/uiSchema';

// Custom themed `Form` component, using @rjsf/material-ui as default base theme
// const Form = withTheme({ ...rjsfMaterialTheme });

const useStyles = makeStyles((theme: Theme) => ({
  formControlsTop: {
    marginBottom: '1rem'
  },
  formControlsBottom: {
    marginTop: '1rem'
  }
}));

interface IFormControlProps {
  classes?: { root?: any };
  formRef: { submit: Function };
  activity: any;
}

const FormControls: React.FC<IFormControlProps> = (props) => {
  const save = async (formData: any) => {
    props.formRef.submit();
  };

  console.log(props);
  return (
    <>
      <Grid container spacing={3} className={props.classes.root}>
        <Grid container item spacing={3}>
          <Grid item>
            <Button size="small" variant="contained" color="primary" onClick={save}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

interface IFormContainerProps {
  classes?: any;
  activity: any;
}

const FormContainer: React.FC<IFormContainerProps> = (props) => {
  const classes = useStyles();

  const api = useInvasivesApi();
  const databaseContext = useContext(DatabaseContext);

  const [schemas, setSchemas] = useState<{ schema: any; uiSchema: any }>({ schema: null, uiSchema: null });

  const [formRef, setFormRef] = useState(null);

  const submitHandler = async (event: any) => {
    await databaseContext.database.upsert(props.activity._id, (activity) => {
      return { ...activity, formData: event.formData };
    });
  };

  useEffect(() => {
    const getApiSpec = async () => {
      // TODO cache this response for offline/performance (since it shouldnt change much)
      const response = await api.getApiSpec();

      // TODO add the promise from `api-getApiSpec()` to this array.
      setSchemas({
        schema: { ...response.data.components.schemas.Activity, components: response.data.components },
        uiSchema: Activity
      });
    };

    getApiSpec();
  }, []);

  useEffect(() => {});

  if (!schemas.schema || !schemas.uiSchema) {
    return <CircularProgress />;
  }

  return (
    <div>
      <FormControls activity={props.activity} formRef={formRef} classes={{ root: classes.formControlsTop }} />

      <Form
        formData={props.activity?.formData || null}
        schema={schemas.schema as JSONSchema7}
        uiSchema={schemas.uiSchema}
        onSubmit={submitHandler}
        // `ref` does exist, but currently is missing from the `index.d.ts` types file.
        // @ts-ignore: No overload matches this call ts(2769)
        ref={(form) => setFormRef(form)}>
        <React.Fragment />
      </Form>

      <FormControls activity={props.activity} formRef={formRef} classes={{ root: classes.formControlsBottom }} />
    </div>
  );
};

export default FormContainer;
