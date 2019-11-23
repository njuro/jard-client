import React, {useContext, useState} from 'react';
import {postApiRequest} from '../../helpers/api';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import FormErrors from '../utils/FormErrors';
import {BoardContext} from '../board/Board';
import {ThreadContext} from '../thread/Thread';
import {objectToFormData} from '../../helpers/forms';

function ReplyForm() {
    const board = useContext(BoardContext);
    const {thread, onNewPosts} = useContext(ThreadContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault();

        const post = {
            name, password, body
        };
        const replyForm = new FormData();
        replyForm.append('postForm', objectToFormData(post));
        replyForm.append('attachment', attachment);

        postApiRequest(`boards/${board.label}/${thread.originalPost.postNumber}/reply`, replyForm)
            .then(post => {
                setOpen(false);
                onNewPosts([post]);
            })
            .catch(err => setErrors(err.response.data.errors));
    }

    return (
        <Modal style={{paddingBottom: '10px'}}
               open={open}
               trigger={<Button basic circular size='mini' icon='reply' onClick={() => setOpen(true)}/>}>
            <Modal.Content>
                <Form onSubmit={handleSubmit} encType='multipart/form-data' error={errors !== undefined}>
                    <Header as='h4' dividing>Reply to thread</Header>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name' value={name}
                                    onChange={e => setName(e.target.value)}/>
                        <Form.Input fluid label='Tripcode password' placeholder='Password' value={password}
                                    onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.TextArea label='Comment' rows='8' value={body} onChange={e => setBody(e.target.value)}/>
                    <Form.Input label='Upload image' type='file' accept='image/*'
                                onChange={e => setAttachment(e.target.files[0])}/>
                    <FormErrors errors={errors}/>
                    <Form.Button floated='right'>Submit post</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}


export default ReplyForm;