import React from 'react';
import parse from 'html-react-parser';
import Link from './link';
import _ from 'lodash';

const convertChildren = (children, index) => parse(children);

export default function htmlToReact(html) {
    if (!html) {
        return null;
    }
    return parse(html, {
        replace: node => {            
            if (node.type === 'tag' && node.name === 'a') {
                const href = node.attribs.href;
                const props = _.omit(node.attribs, 'href');
                // use Link only if there are no custom attributes like style, class, and what's not that might break react
                if (_.isEmpty(props)) {
                    return (
                        <Link key={index} href={href} {...props}>
                            {convertChildren(node.children, index)}
                        </Link>
                    );
                }
            }
        }
    });
}
