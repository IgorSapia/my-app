import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IPostTableProps {
  handleDeletePost(id: number): void
  handleSelectPost(item: IPostsProps): void
  posts: IPostsProps[] | null
}

export interface IPostsProps {
  id: number,
  authorName: string,
  title: string,
  text: string
}

const PostTable = ({ handleDeletePost, posts, handleSelectPost }: IPostTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.authorName}</td>
            <td>
              <div style={{ display: "flex", gap: "10px", marginLeft: "20px" }}>
                <EditIcon onClick={() => handleSelectPost(item)}/>
                <DeleteIcon onClick={() => handleDeletePost(item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostTable;
