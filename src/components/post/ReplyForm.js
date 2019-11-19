import React, {useContext, useState} from 'react';
import {usePostApi} from '../../helpers/api';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import FormErrors from '../utils/FormErrors';
import {BoardContext} from '../board/Board';
import {ThreadContext} from '../thread/Thread';

function ReplyForm() {
    const board = useContext(BoardContext);
    const thread = useContext(ThreadContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [body, setBody] = useState('');
    const [attachment, setAttachment] = useState(undefined);

    const [createdReply, submitReply, isError] = usePostApi(`boards/${board.label}/${thread.originalPost.postNumber}/reply`);

    function handleSubmit(e) {
        e.preventDefault();

        const post = {
            name, password, body
        };
        const replyForm = new FormData();
        replyForm.append('postForm', new Blob([JSON.stringify(post)], {
            type: 'application/json'
        }));
        replyForm.append('attachment', attachment);
        submitReply(replyForm);
    }

    if (!isError && createdReply) {
        return <Redirect to={`/boards/${board.label}/${thread.originalPost.postNumber}`}/>;
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
                    {isError && createdReply && <FormErrors errors={createdReply.errors}/>}
                    <Form.Button floated='right'>Submit post</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    );
}


export default ReplyForm;