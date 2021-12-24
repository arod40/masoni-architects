import React from 'react';
import { MdEmail } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { useState } from 'react/cjs/react.development';
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
      li {
        display: inline-block;
      }
      .email-span {
        cursor: pointer;
      }
      .email-span:hover {
        text-shadow: 2px 2px 4px #000000;
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
              <li>{contact.name}:</li>
              <li>
                <ReactTooltip
                  effect="solid"
                  afterShow={() => setTimeout(ReactTooltip.hide, 1200)}
                  type="success"
                />
                <span
                  className="email-span"
                  key="hola"
                  onClick={() => {
                    navigator.clipboard.writeText(contact.email);
                  }}
                  onKeyDown={() => {
                    navigator.clipboard.writeText(contact.email);
                  }}
                  role="button"
                  tabIndex={0}
                  data-tip="Email copied!"
                  data-event="click"
                >
                  {contact.email}
                </span>
                <span>
                  <MdEmail />
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </ContactsStyle>
  );
}
