import React, {useState} from 'react';
import {Image} from 'semantic-ui-react';

function Attachment({attachment}) {
    const [showFull, setShowFull] = useState(false);

    function toggleSize(e) {
        e.preventDefault();
        setShowFull(!showFull);
    }

    return (
        <a href={attachment.url} target='_blank' rel='noopener noreferrer'>
            <Image verticalAlign='top' src={attachment.url} className={showFull ? 'fullsize' : ''} onClick={toggleSize}
                   style={{height: attachment.thumbHeight + 'px', width: attachment.thumbWidth + 'px'}}/>
        </a>
    );
}

export default Attachment;