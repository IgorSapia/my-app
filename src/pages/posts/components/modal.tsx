import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiModal from '@mui/material/Modal';
import { createPostService, editPostService } from '../../../services/posts';
import { IPostsProps } from './postTable';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Modal({selectedItem, handleResetSelectedItem, getPosts}: {selectedItem: IPostsProps | null, handleResetSelectedItem: () => void, getPosts:() => void}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)
        handleResetSelectedItem()};
    const [title, setTitle] = React.useState(selectedItem?.title ?? '')
    const [text, setText] = React.useState(selectedItem?.text ?? '')


    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    React.useEffect(()=>{
        if(selectedItem){
            setText(selectedItem.text)
            setTitle(selectedItem.title)
        }
    },[selectedItem])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(selectedItem?.id){
            const res = await editPostService({
                text,
                title,
            }, selectedItem.id)
        }else{
            const res = await createPostService({
                text,
                title,
    
            })
        }

        getPosts()
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Criar Post</Button>
            <MuiModal
                open={open || !!selectedItem?.id}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Título:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="text">Texto:</label>
                            <input
                                type="text"
                                id="text"
                                value={text}
                                onChange={handleTextChange}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </Box>
            </MuiModal>
        </div>
    );
}