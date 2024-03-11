import React, { useEffect, useState } from 'react';
import { getAllUsersService } from '../../services/users';
import { deletePostService, getAllPostsService } from '../../services/posts';
import Modal from './components/modal';
import PostTable from './components/postTable';

interface IUsersProps {
    id: number,
    name: string
}

export interface IPostsProps {
    id: number,
    authorName: string,
    title: string,
    text: string
}

interface IPostServiceProps {
    id: number,
    author_id: number,
    title: string,
    text: string,
    author: {
        id: number,
        name: string,
        email: string,
    }
}

const Post: React.FC = () => {
    const [users, setUsers] = useState<IUsersProps[]>([])
    const [posts, setPosts] = useState<IPostsProps[] | null>(null)
    const [selectedItem, setSelectedItem] = useState<IPostsProps | null> (null)

    const handleSelectPost = (item:IPostsProps) =>{
        setSelectedItem(item);
    }

    const handleResetSelectedItem = () =>{
        setSelectedItem(null);
    }

    const getUsers = async () => {
        const res = await getAllUsersService();

        if (res?.status === 200) {
            setUsers(res.data);
        }
    }

    const getPosts = async () => {
        const res = await getAllPostsService();

        if (res?.status === 200) {
            setPosts(res.data.map((post: IPostServiceProps) => {
                return {
                    authorName: post.author.name,
                    id: post.id,
                    title: post.title,
                    text: post.text
                } as IPostsProps
            }));
        }
    }

    const handleDeletePost = async (deletedId: number) => {
        await deletePostService(deletedId);
        getPosts();
    }

    useEffect(() => {
        getUsers()
        getPosts()
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    useEffect(() => {
        console.log(posts)
    }, [posts])

    return (
        <div>
            <PostTable {... { posts, handleDeletePost, handleSelectPost}} />

            <div>
                <Modal {... {selectedItem, handleResetSelectedItem, getPosts}}/>
            </div>

        </div>

    )
}

export default Post;