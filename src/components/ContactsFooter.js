import React from 'react';
import { MdEmail } from 'react-icons/md';
import styled from 'styled-components';

const ContactsStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  height: 100%;
  text-align: end;
  margin: 0 1%;
  .contacts {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    padding-right: 1%;
    overflow-x: auto;
    overflow-y: hidden;
    .contact {
      padding: 10px;
      font-size: 2vh;
      span {
        margin: 0 2px;
      }
      svg {
        position: relative;
        top: 3px;
      }
      .material-icons {
        position: relative;
        top: 3px;
        font-size: 18px;
      }
    }
  }
`;

export default function ContactsFooter(props) {
  const { contacts } = props;
  return (
    <ContactsStyle>
      <div className="contacts">
        {contacts.map((contact) => (
          <div key={contact.name} className="contact">
            <ul>
              <li>{contact.name}</li>
              <li>
                <span>
                  <MdEmail />
                </span>
                <span>{contact.email}</span>
              </li>
              <li>
                <span className="material-icons">whatsapp</span>
                <span>{contact.phone}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </ContactsStyle>
  );
}
