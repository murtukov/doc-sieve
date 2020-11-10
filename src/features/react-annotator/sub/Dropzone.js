import React from 'react';
import {useDropzone} from "react-dropzone";
import {createUseStyles} from "react-jss";
import {useDispatch} from "react-redux";

function Dropzone() {
    const c = useStyles();
    const dispatch = useDispatch();
    const {getRootProps, getInputProps} = useDropzone({
        multiple: false,
        onDrop
    });

    function onDrop(files) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const base64 = event.target.result.split(',')[1];
            dispatch.app.setText(Buffer.from(base64, "base64").toString());
        });
        reader.readAsDataURL(files[0]);
    }

    return (
        <div className={c.root} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a text file here, or click to select</p>
        </div>
    )
}

const useStyles = createUseStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        marginTop: "20%",
        height: 200,

        '&:focus': {
            borderColor: '#2196f3'
        },

        '& p': {
            fontSize: 22
        }
    }
});

export default Dropzone;