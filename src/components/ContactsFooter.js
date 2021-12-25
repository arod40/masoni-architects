import React from 'react';
import { MdEmail } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
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
      font-size: 16px;
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
      .email {
        cursor: pointer;
        transition-property: background-color box-shadow;
        transition: ease 0.2s;
        border-radius: 3px;
      }
      .email:hover {
        background-color: var(--white);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .contacts {
      flex-direction: column;
      .contact {
        padding: 0;
        font-size: 3.5vw;
      }
    }
  }
`;

export default function ContactsFooter(props) {
  const { contacts, mediaQueryLimitPixels } = props;
  return (
    <ContactsStyle mediaQueryLimitPixels={mediaQueryLimitPixels}>
      <ReactTooltip
        effect="solid"
        afterShow={(event) => {
          navigator.clipboard.writeText(event.target.innerText);
          setTimeout(ReactTooltip.hide, 1200);
        }}
        type="success"
      />
      <div className="contacts">
        {contacts.map((contact, index) => (
          <div key={index} className="contact">
            <ul>
              <li>{contact.name}:</li>
              <li className="email">
                <span data-tip="Email copied!" data-event="click">
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
