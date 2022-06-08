import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]}
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

// React.memo 를 사용하여 tag값만 바뀔때만 리렌더링 되도록 처리
const TagItem= React.memo(({tag, onRemove, onChnageTags}) =>(
    <Tag onClick={()=> onRemove(tag)}>#{tag}</Tag>
))

// React.memo 를 사용하여 tags값만 바뀔때만 리렌더링 되도록 처리
const TagList = React.memo(({tags, onRemove}) =>(
    <TagListBlock>
        {tags.map(tag =>(
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
))

const TagBox= ({tags, onChangeTags}) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTags = useCallback(
        tag => {
            if(!tag) return; // tag가 공백이면 추가 x
            if(localTags.includes(tag)) return; // 이미 존재하는 tag면 추가 x
            const nextTags= [...localTags, tag];
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        },
        [localTags, onChangeTags],
    );

    const onRemove= useCallback(
        tag => {
            const nextTags = localTags.filter(t => t!== tag);
            setLocalTags(nextTags);
            onChangeTags(nextTags);
        }, [localTags, onChangeTags],
    )


    const onChange = useCallback(e =>{
      setInput(e.target.value);
    }, []) // 빈 배열을 넣으면 어떤 데이터가 바뀌던지 항상 바뀌게됨

    const onSubmit = useCallback( e=>{
      e.preventDefault(); // 새로고침이 일어나지 않음: 이벤트를 막음
      insertTags(input.trim()); // 앞뒤 공백 없애고 등록함
      setInput('');   // input 초기화
    }, [input, insertTags])


    //tags 값이 바뀔때
    useEffect(() => {
      setLocalTags(tags);
    }, [tags]);

    return (
      <TagBoxBlock>
        <h4>태그</h4>
        <TagForm onSubmit={onSubmit}>
          <input 
          placeholder='태그를 입력하세요'
          value={input}
          onChange={onChange}
          ></input>
          <button type="submit"></button>
        </TagForm>
        <TagList tags={localTags} onRemove={onRemove}/>
      </TagBoxBlock>
    )
}

export default TagBox;