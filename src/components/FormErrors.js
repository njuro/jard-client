import React from 'react';
import {List, Message} from 'semantic-ui-react';

function FormErrors({errors}) {
    return (
        errors && errors.length > 0 && <Message error content={<List items={errors} bulleted/>}/>
    );
}

export default FormErrors;