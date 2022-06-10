import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
 
interface Post {
  id: number;
  title: string;
  body: string;
}
 
function usePostLoading() {
  const { postId } = useParams<{ postId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
 
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((fetchedPost: Post) => {
        setPost(fetchedPost);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);
 
  return {
    post,
    isLoading,
  };
}
 
export default usePostLoading;