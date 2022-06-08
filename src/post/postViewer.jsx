import React from "react";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import Responsive from "../components/common/responsive";
import Subinfo from "../components/common/subinfo";
import Tags from "../components/common/tags";
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer= ({post, error, loading, actionButtons, ownPost}) =>{
    if(error){
        if(error.response && error.response.status === 404){
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
        }
        return <PostViewerBlock>오류 발생</PostViewerBlock>
    }

    // 로딩중이거나 아직 포스트 데이터가 없을 시에
    if(loading || !post){
        return null;
    }

    const {title, body, user, publishedDate, tags} = post;
    return(
        <PostViewerBlock>
            <Helmet>
                <title>{title} - REACTERS</title>
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <Subinfo
                username={user.username}
                publishedDate={publishedDate}
                hasMarginTop
    
                />
                <Tags tags={tags}/>
            </PostHead>
            {actionButtons}
            {/* 태그들을 걸러내주는 역할 */}
            <PostContent dangerouslySetInnerHTML={{__html:body}}/>
        </PostViewerBlock>
    )
}

export default PostViewer;