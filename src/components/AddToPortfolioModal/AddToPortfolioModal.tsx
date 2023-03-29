import { Button } from 'components';
import { PortfolioContext } from 'context';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './styles.scss';

interface Currency {
    name: string;
    symbol: string;
    price: string;
}

interface Props {
    isOpenModal: boolean;
    toggleModal: () => void;
    currency: Currency;
}

interface FormValues {
    value: number;
}

export const AddToPortfolioModal = ({
    isOpenModal,
    toggleModal,
    currency,
}: Props) => {
    const { addCurrency, portfolioCurrencies } = useContext(PortfolioContext);
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

    const onSubmit: SubmitHandler<FormValues> = ({ value }) => {
        const price = String((+currency.price * value).toFixed(2));
        const currencyToSet = { ...currency, price: price, amount: value };
        addCurrency(currencyToSet, value);
        toggleModal();
        reset();
    };

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolioCurrencies));
    }, [portfolioCurrencies]);

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
                        step="0.1"
                    />
                    {errors.value && (
                        <p className="input-error">{errors.value.message}</p>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="submit" className="modal-footer__button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
