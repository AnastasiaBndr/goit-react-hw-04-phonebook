import css from './ContactList.module.css';

const ContactList = ({ contacts, filter, onClickDelete }) => {
    return (<div className={css.contacts__list__container}>
        <ul>
            {contacts.map(contact => {
                if (contact.name.toLowerCase().includes(filter.toLowerCase()) || filter === 0)
                    return (
                        <li key={contact.id}>
                            <p>{contact.name}: {contact.number}</p>
                            <button type="button" onClick={() => onClickDelete(contact.id)}>Delete</button>
                        </li>)
                else return "";
            })}</ul>
    </div>);
}

export default ContactList;