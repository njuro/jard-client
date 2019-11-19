import React, {useState} from 'react';
import {Image} from 'semantic-ui-react';

function Attachment({attachment}) {
    const [showFull, setShowFull] = useState(false);

    function toggleSize(e) {
        e.preventDefault();
        setShowFull(!showFull);
    }

    return (
        <Image href={attachment.url} target='_blank' rel='noopener noreferrer' verticalAlign='top'
               src={attachment.url} onClick={toggleSize}
               style={showFull ? {} : {height: attachment.thumbHeight + 'px', width: attachment.thumbWidth + 'px'}}/>
    );
}

export default Attachment;