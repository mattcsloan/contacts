import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    let showingContacts;
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((contact) => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to="/create"
            className="add-contact"
          >Add Contact</Link>
        </div>
        {showingContacts.length !== contacts.length &&
          <div className="showing-contacts">
            <span>Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={() => this.updateQuery('')}>Show All</button>
          </div>
        }
        <ol className="contact-list">
          {
            showingContacts.map(contact => (
              <li className="contact-list-item" key={contact.id}>
                <div className="contact-avatar" style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }} />
                <div className="contact-details">
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button
                  className="contact-remove"
                  onClick={() => onDeleteContact(contact)}
                >Remove</button>
              </li>
            ))
          }
        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ListContacts;