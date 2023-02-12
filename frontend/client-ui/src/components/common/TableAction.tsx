import {observer} from 'mobx-react-lite';
import React, {useState} from 'react'
import {Button, Icon, SemanticICONS} from 'semantic-ui-react'
import '../../styles/tableAction.css'
import {useStore} from "../../stores/store";
import {uuid} from "aws-sdk/clients/customerprofiles";
import {useNavigate} from "react-router-dom";

interface IProps {
    itemId: string
    modalContent: JSX.Element
    viewPath: string

}


const TableAction: React.FC<IProps> = ({itemId, modalContent, viewPath}) => {

    const {modalStore} = useStore()
    const [active, setActive] = useState("");
    const history = useNavigate();
    return (

        <div className='table-action-option'>
            <Button icon={'eye'} color={'orange'} onClick={() => history(viewPath)}/>
            <Button icon={'edit'} color={'blue'} onClick={() => modalStore.openModal(modalContent)}/>
            <Button icon={'trash '} color={'red'} onClick={() => modalStore.openModal(modalContent)}/>
        </div>


    )
}

export default observer(TableAction);