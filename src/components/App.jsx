import { useEffect, useState } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";

import Filter from './Filter';
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const contactsFill = [{ id: 'id-1', name: 'Rosie Simpson', number: '+380004814000' },
  { id: 'id-2', name: 'Hermione Kline', number: '+380018050200' },
  { id: 'id-3', name: 'Eden Clements', number: '+382004004700' },
  { id: 'id-4', name: 'Annie Copeland', number: '+380002023600' },
  { id: 'id-5', name: 'Rosie Simpson', number: '+382804000500' },
  { id: 'id-6', name: 'Hermione Kline', number: '+380020304050' },
  { id: 'id-7', name: 'Eden Clements', number: '+380000300567' },
  { id: 'id-8', name: 'Annie Copeland', number: '+380204050600' },];

  const [contacts, setContacts] = useState(result => [...contactsFill]);

  useEffect(() => {
    if (localStorage.getItem("contacts") !== null)
      setContacts(result => [...JSON.parse(localStorage.getItem("contacts"))]);
  }, []);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name': setName(e.target.value); break;
      case 'number': setNumber(e.target.value); break;
      case 'filter': setFilter(e.target.value); break;
      default: return;
    }
  }

  const onClickDelete = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

  }

  const onSubmit = evt => {
    evt.preventDefault();
    const namePattern = new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$");
    const numberPattern = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/s/./0-9]*$");

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
        const newUser = { id: "id-" + idNumb, name: name, number: number };
        const updatedContacts = [...contacts, newUser];
        setContacts(updatedContacts);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));

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

  return (<div className={css.contact__container}>

    <h1 className="main__title">Phonebook</h1>
    <ContactForm handleChangeName={debounce(handleChange, 300)} handleChangeNumber={debounce(handleChange, 300)} onClickSubmit={onSubmit} />

    <h3 className="contacts__title">Contacts</h3>
    <Filter handleFilter={debounce(handleChange, 100)} />
    <ContactList contacts={contacts} filter={filter} onClickDelete={onClickDelete} />
  </div>)
}

