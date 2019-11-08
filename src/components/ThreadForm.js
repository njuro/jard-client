import React from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react';

function ThreadForm(props) {
    return (
        <Modal style={{'padding-bottom': '10px'}}
               trigger={<Button basic size='small'><Icon name='plus'/><strong>New thread</strong></Button>}>
            <Modal.Content>
                <Form>
                    <Header as='h4' dividing>Create new thread</Header>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name'/>
                        <Form.Input fluid label='Tripcode password' placeholder='Password'/>
                    </Form.Group>
                    <Form.Input label='Subject' placeholder='Subject'/>
                    <Form.TextArea label='Comment' rows='8'/>
                    <Form.Input label='Upload image' type='file' accept='image/*' required/>
                    <Form.Button floated='right'>Create thread</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default ThreadForm;
