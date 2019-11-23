import React, {useContext, useState} from 'react';
import {Button, Form, Header, Icon, Modal} from 'semantic-ui-react';
import {postApiRequest} from '../../helpers/api';
import {Redirect} from 'react-router-dom';
import FormErrors from '../utils/FormErrors';
import {BoardContext} from '../board/Board';
import {objectToFormData} from '../../helpers/forms';

function ThreadForm() {
    const board = useContext(BoardContext);

    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(undefined);
    const [createdThread, setCreatedThread] = useState(undefined);
    const [errors, setErrors] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault();

        const thread = {
            subject,
            postForm: {name, password, body}
        };
        const threadForm = new FormData();
        threadForm.append('threadForm', objectToFormData(thread));
        threadForm.append('attachment', attachment);

        postApiRequest(`boards/${board.label}/submit`, threadForm)
            .then(thread => setCreatedThread(thread))
            .catch(err => setErrors(err.response.data.errors));
    }

    if (createdThread) {
        return <Redirect to={`/boards/${board.label}/${createdThread.originalPost.postNumber}`}/>;
    }

    return (
        <Modal style={{paddingBottom: '10px'}}
               trigger={<Button basic size='small'><Icon name='plus'/><strong>New thread</strong></Button>}>
            <Modal.Content>
                <Form onSubmit={handleSubmit} encType='multipart/form-data' error={errors !== undefined}>
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
                    <FormErrors errors={errors}/>
                    <Form.Button floated='right'>Create thread</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}

export default ThreadForm;
