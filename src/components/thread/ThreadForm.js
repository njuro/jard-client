import React, {useState} from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react';
import {usePostApi} from '../../helpers/api';
import {Redirect} from 'react-router-dom';
import FormErrors from '../utils/FormErrors';

function ThreadForm({board}) {
    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(undefined);

    const [createdThread, submitThread, isError] = usePostApi(`boards/${board.label}/submit`);

    function handleSubmit(e) {
        e.preventDefault();

        const thread = {
            subject,
            post: {name, password, body}
        };
        const threadForm = new FormData();
        threadForm.append('threadForm', new Blob([JSON.stringify(thread)], {
            type: 'application/json'
        }));
        threadForm.append('attachment', attachment);
        submitThread(threadForm);
    }

    if (!isError && createdThread) {
        return <Redirect to={`/boards/${board.label}/${createdThread.originalPost.postNumber}`}/>;
    }

    return (
        <Modal style={{paddingBottom: '10px'}}
               trigger={<Button basic size='small'><Icon name='plus'/><strong>New thread</strong></Button>}>
            <Modal.Content>
                <Form onSubmit={handleSubmit} encType='multipart/form-data' error={isError}>
                    <Header as='h4' dividing>Create new thread</Header>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name' value={name}
                                    onChange={e => setName(e.target.value)}/>
                        <Form.Input fluid label='Tripcode password' placeholder='Password' value={password}
                                    onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Input label='Subject' placeholder='Subject' value={subject}
                                onChange={e => setSubject(e.target.value)}/>
                    <Form.TextArea label='Comment' rows='8' value={body} onChange={e => setBody(e.target.value)}/>
                    <Form.Input label='Upload image' type='file' accept='image/*'
                                onChange={e => setAttachment(e.target.files[0])} required/>
                    {isError && createdThread && <FormErrors errors={createdThread.errors}/>}
                    <Form.Button floated='right'>Create thread</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default ThreadForm;
