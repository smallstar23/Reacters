import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/common/header';
import {logout} from '../../modules/user';

const HeaderContainer = () =>{
    //user가 바뀔때마다 컴포넌트가 랜더링 됨
    const {user}= useSelector(({user})=> ({user: user.user}));
    const dispatch= useDispatch();
    const onLogout= () =>{
        dispatch(logout())
    }
    return <Header user={user} onLogout={onLogout}/>
}

export default HeaderContainer;