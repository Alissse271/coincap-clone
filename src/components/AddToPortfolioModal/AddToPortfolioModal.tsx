import { Button } from 'components';
import { SubmitHandler, useForm } from 'react-hook-form';
import './styles.scss';

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
}

interface FormValues {
    value: number;
}

export const AddToPortfolioModal = ({ isOpenModal, toggleModal }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const handleClose = () => {
        toggleModal();
        reset();
    };

    const onSubmit: SubmitHandler<FormValues> = (value) => {
        reset();
    };

    return (
        <div className={`modal-background ${isOpenModal ? '' : 'none'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Add to portfolio</h2>
                    <Button type="button" label="x" onClick={handleClose} />
                </div>
                <div className="modal-main">
                    <input
                        {...register('value', {
                            required: '*value is required',
                        })}
                        className="modal-main__input"
                        type="number"
                        placeholder="Enter amount"
                    />
                    {errors.value && (
                        <p className="input-error">{errors.value.message}</p>
                    )}
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
