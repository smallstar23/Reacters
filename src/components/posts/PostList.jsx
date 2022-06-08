import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import Responsive from "../common/responsive";
import Subinfo from "../common/subinfo";
import Tags from "../common/tags";

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem= ({post}) => {
    const {publishedDate, user, tags, title, body, _id}= post;

    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>{title}</Link>
            </h2>
            <Subinfo username={user.username} publishedDate={new Date(publishedDate)}/>
            <Tags tags={tags}/>
            <p>{body}</p>
        </PostItemBlock>
    )
}

const PostList=({posts, loading, error, showWriteButton}) =>{
    if(error){
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>
    }

    return(
        <PostListBlock>
            <WritePostButtonWrapper>
            {showWriteButton && (<Button cyan to="/write">새 글 작성하기</Button>)}
            </WritePostButtonWrapper>
            {/* 로딩중이 아니고, 포스트 배열이 존재할때 */}
            {!loading && posts && (
                <div>
                    {posts.map((post) => (
                        <PostItem post={post} key={post._id}/>
                    ))}
                </div>
            )}
        </PostListBlock>
    )
}

export default PostList;