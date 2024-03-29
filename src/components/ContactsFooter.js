import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { ReactComponent as LinkedInIco } from '../assets/linkedin.svg';
import { ReactComponent as OrcidIco } from '../assets/orcid.svg';
import { ReactComponent as MailIco } from '../assets/mail.svg';

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
      font-size: 12px;
      color: var(--white);
      span {
        margin: 0 6px;
      }
      svg {
        position: relative;
        top: 3px;
        width: 20px;
        height: 20px;
      }
      li {
        display: inline-block;
        margin: 10px;
        border-radius: 3px;
        cursor: pointer;
        transition-property: background-color box-shadow;
        transition: ease 0.2s;
        .email {
          position: relative;
          bottom: 3px;
        }
      }
    }
  }

  @media (max-width: ${(props) => props.mediaQueryLimitPixels}px) {
    .contacts {
      flex-direction: column;
      .contact {
        padding: 0;
        font-size: 3.5vw;
        .email {
          display: none;
        }
      }
    }
  }
`;

export default function ContactsFooter(props) {
  const { contacts, mediaQueryLimitPixels } = props;
  return (
    <ContactsStyle mediaQueryLimitPixels={mediaQueryLimitPixels}>
      <div className="contacts">
        {contacts.map((contact, index) => (
          <div key={index} className="contact">
            <ul>
              <ReactTooltip
                effect="solid"
                afterShow={() =>
                  navigator.clipboard
                    .writeText(contact.email)
                    .then(() => setTimeout(ReactTooltip.hide, 1200))
                }
                type="success"
              />
              {contact.email && (
                <li data-tip="Email copied!" data-event="click">
                  <span className="email">{contact.email}</span>
                  <span>
                    <MailIco fill="black" />
                  </span>
                </li>
              )}
              {contact.linkedin && (
                <li>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      window.open(contact.linkedin);
                    }}
                    onKeyDown={() => {
                      window.open(contact.linkedin);
                    }}
                  >
                    <LinkedInIco fill="black" />
                  </span>
                </li>
              )}
              {contact.orcid && (
                <li>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      window.open(contact.orcid);
                    }}
                    onKeyDown={() => {
                      window.open(contact.orcid);
                    }}
                  >
                    <OrcidIco fill="black" />
                  </span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </ContactsStyle>
  );
}
