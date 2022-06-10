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
    let didCancel = false;
   
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((fetchedPost: Post) => {
        if (!didCancel) {
          setPost(fetchedPost);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
   
    return () => {
      didCancel = true;
    }
  }, [postId]);
 
  return {
    post,
    isLoading,
  };
}
 
export default usePostLoading;