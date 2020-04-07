import React, { useState } from 'react';
import { Button, Image, Modal, Input } from 'semantic-ui-react'

function StartModal(props) {
  const { isOpen, setIsOpen, floorSize, setFloorSize } = props
  const [ error, setError ] = useState(false)
     
  function submitFloorSize() {
    console.log(floorSize)
    if (isNaN(floorSize) || floorSize <= 0){
      setError(true)
    }else{
      setError(false)
      setIsOpen(false)
    }
  }

    return (
      <Modal open={isOpen}>
        <Modal.Header>Ree Eng Architecture Viz tool</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Order-Floor-Plans-2D-Floor-Plan.jpg' />
          <Modal.Description>
            <p>
              Before you get started please specify the square footage area required for your draft
            </p>
            <Input labelPosition='right' error={error} focus placeholder='1200' label='ft2' onChange={e => setFloorSize(e.target.value)} style={{paddingRight: '15px'}} />
            <Button content='Enter' onClick={submitFloorSize} primary />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
}

export default StartModal;