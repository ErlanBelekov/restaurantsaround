import React from 'react';

import { Spring, Trail } from 'react-spring/renderprops';

export const FadeIn = props => {
    return (
        <Spring
            from={{opacity:0}}
            to={{opacity:1}}
        >
            {
                fade =>
                    <div style={fade}>
                        {props.children}
                    </div>
            }
        </Spring>
    );
}

export const FadeMany = props => {
    return (
        <Trail
            config={{duration: 200}}
            items={props.children}
            keys={ch => ch}
            from={{opacity:0.2, marginLeft: -20}}
            to={{opacity:1, marginLeft:0}}
        >
            {
                ch => props => <div style={props}>
                    {ch}
                </div>
            }
        </Trail>
    );
}
