import React from 'react';
import { CKEditor } from "ckeditor4-react";


const CkEditor = ({ props, handleEditor }) => {
    return (
        props &&
        <CKEditor
            initData={props}
            onChange={(event, editor) => {
                const data = event.editor.getData();
                handleEditor(data);
            }}
        />

    )
}

export default CkEditor