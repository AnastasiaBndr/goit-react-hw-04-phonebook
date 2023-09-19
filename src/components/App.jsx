import React, { Component } from "react";
import css from './App.module.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

import Filter from './Filter';
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+380004814000' },
      { id: 'id-2', name: 'Hermione Kline', number: '+380018050200' },
      { id: 'id-3', name: 'Eden Clements', number: '+382004004700' },
      { id: 'id-4', name: 'Annie Copeland', number: '+380002023600' },
      { id: 'id-5', name: 'Rosie Simpson', number: '+382804000500' },
      { id: 'id-6', name: 'Hermione Kline', number: '+380020304050' },
      { id: 'id-7', name: 'Eden Clements', number: '+380000300567' },
      { id: 'id-8', name: 'Annie Copeland', number: '+380204050600' },
    ],
    name: '',
    number: '',
    filter: ''
  }

  componentDidMount() {
    if (localStorage.getItem("contacts") !== null)
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    else return this.state.contacts;

  }

  handleChangeName = evt => {
    this.setState({ name: evt.target.value });
  }

  handleChangeNumber = evt => {
    this.setState({ number: evt.target.value });
  }

  onClickSubmit = evt => {
    evt.preventDefault();
    const namePattern = new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$");
    const numberPattern = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/s/./0-9]*$");

    const { name, number, contacts } = this.state;
    if (!namePattern.test(name) && !numberPattern.test(number))
      Notiflix.Notify.failure("Name and phone number are incorrect!");
    else if (!namePattern.test(name))
      Notiflix.Notify.failure("Name is incorrect!")
    else if (!numberPattern.test(number))
      Notiflix.Notify.failure("Phone number is incorrect!")
    else {

      if (contacts.find(contact => contact.number === number))
        Notiflix.Notify.failure("This contact exists!")
      else {
        const idNumb = contacts.length + 1;
        contacts.push({ id: "id-" + idNumb, name: name, number: number });
        const newArr = contacts;
        localStorage.setItem("contacts", JSON.stringify(newArr));
        this.setState({ contacts: newArr });

        var getValue = document.getElementById("name");
        if (getValue.value !== "") {
          getValue.value = "";
        }

        getValue = document.getElementById("tel");
        if (getValue.value !== "") {
          getValue.value = "";
        }
      }

    }

  }

  handleFindContact = evt => {
    this.setState({ filter: evt.target.value });
  }

  onClickDelete = async (id) => {

    await this.setState(prevState => ({ contacts: prevState.contacts.filter(contact => contact.id !== id) }));
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));

  }


  render() {
    return (<div className={css.contact__container}>

      <h1 className="main__title">Phonebook</h1>
      <ContactForm handleChangeName={debounce(this.handleChangeName, 100)} handleChangeNumber={debounce(this.handleChangeNumber, 100)} onClickSubmit={this.onClickSubmit} />

      <h3 className="contacts__title">Contacts</h3>
      <Filter handleFilter={debounce(this.handleFindContact, 100)} />
      <ContactList contacts={this.state.contacts} filter={this.state.filter} onClickDelete={this.onClickDelete} />
    </div>)
  }

};

App.propTypes = {
  contacts: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
}
