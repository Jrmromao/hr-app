import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Icon, Menu, SemanticICONS } from 'semantic-ui-react'


interface IProps {
    redirectTo: string
    iconName: SemanticICONS
    name: string
}


const IconMenyItem: React.FC<IProps> = ({ redirectTo, iconName, name}) => {

    const [active, setActive] = useState("");

    return (

        <div className='sidebar-icon-menu-item'>
            <Icon name={iconName} />
            <Menu.Item active={active == redirectTo} content={name} as={NavLink} to={redirectTo} fluid />
        </div>



    )
}

export default observer(IconMenyItem);