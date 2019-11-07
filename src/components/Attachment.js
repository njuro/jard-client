import React from 'react';
import {Image} from 'semantic-ui-react';

function Attachment({attachment}) {
    return (
        <a href={attachment.url} target='_blank' rel='noopener noreferrer'>
            <Image verticalAlign='top' src={attachment.url}
                   style={{height: attachment.thumbHeight + 'px', width: attachment.thumbWidth + 'px'}}/>
        </a>
    );
}

export default Attachment;