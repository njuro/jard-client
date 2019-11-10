import React, {useState} from 'react';
import {usePostApi} from '../api';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

function ReplyForm({thread, board}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(undefined);
    const [replyForm, setReplyForm] = useState(undefined);

    const [createdReply, submitReply] = usePostApi(undefined, replyForm);

    function handleSubmit(e) {
        e.preventDefault();

        const post = {
            name, password, body
        };
        const formData = new FormData();
        formData.append('postForm', new Blob([JSON.stringify(post)], {
            type: 'application/json'
        }));
        formData.append('attachment', attachment);
        setReplyForm(formData);

        submitReply('boards/' + board.label + '/' + thread.originalPost.postNumber + '/reply');
    }

    if (createdReply) {
        return <Redirect to={'/boards/' + board.label + '/' + thread.originalPost.postNumber}/>;
    }

    return (
        <Modal style={{paddingBottom: '10px'}}
               trigger={<Button basic circular size='mini' icon='reply'/>}>
            <Modal.Content>
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                    <Form.Button floated='right'>Submit post</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}


export default ReplyForm;