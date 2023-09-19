import css from "./ContactForm.module.css";

const ContactForm = ({ handleChangeName, handleChangeNumber, onClickSubmit }) => {
    return (<div className={css.add__contact__container}>
        <div className={css.name_container}>
            <h3>Name</h3>
            <input
                type="text"
                id="name"
                name="name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleChangeName}
            />
        </div>
        <div className={css.number_container}>
            <h3>Number</h3>
            <input
                type="tel"
                id="tel"
                name="number"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleChangeNumber}
                className={css.number__input}
            />
        </div>
        <button type="button" onClick={onClickSubmit}>Add Contact</button>
    </div>);
}

export default ContactForm;