import { Button } from 'components';
import './styles.scss';

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
}

export const AddToPortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
    const handleClose = () => {
        toggleModal();
        // reset();
    };

    return (
        <div className={`modal-background ${isOpenModal ? '' : 'none'}`}>
            <form className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Add to portfolio</h2>
                    <Button type="button" label="x" onClick={handleClose} />
                </div>
                <div className="modal-main">
                    <input
                        className="modal-main__input"
                        type="number"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="modal-footer">
                    <p className="modal-footer__info">Total: $27971.53</p>
                    <button type="submit" className="modal-footer__button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
