import React from 'react';
import {useDropzone} from "react-dropzone";
import {createUseStyles} from "react-jss";

function Dropzone({onDrop, multiple = false}) {
    const c = useStyles();
    const {getRootProps, getInputProps} = useDropzone({
        multiple,
        onDrop
    });

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