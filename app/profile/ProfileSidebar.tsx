'use client'
import Link from 'next/link';
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaUserCircle, FaUser, FaBook, FaQuestionCircle, FaCog, FaSignOutAlt, FaPen } from 'react-icons/fa';

function ProfileCard() {
  return (
    <Card style={{ borderRadius: '1rem' }} className="text-center shadow mb-3">
      <Card.Body>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <FaUserCircle
            size={200}
            color="#ccc"
          />
          <FaPen
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: '0px',
              cursor: 'pointer'
            }}
          />
        </div>
      </Card.Body>
      <ListGroup variant="flush">
        <Link href='/profile'><ListGroup.Item action><FaUser className="me-2 my-2" /> My Profile</ListGroup.Item></Link>
        <Link href='/magazine'><ListGroup.Item action><FaBook className="me-2 my-2" /> Magazine</ListGroup.Item></Link>
        <Link href='/profile/support'><ListGroup.Item action><FaQuestionCircle className="me-2 my-2" /> Help & Support</ListGroup.Item></Link>
        <Link href='/user/settings'><ListGroup.Item action><FaCog className="me-2 my-2" /> Account Setting</ListGroup.Item></Link>
        <ListGroup.Item action><FaSignOutAlt className="me-2 my-2" /> Logout</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default ProfileCard;
