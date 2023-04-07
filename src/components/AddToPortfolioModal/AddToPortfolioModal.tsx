import { Button, Portal, PortalTarget } from "components";
import { PortfolioContext, PortfolioCurrency } from "context";
import { useCallback, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";

interface Currency {
  id: string;
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

export const AddToPortfolioModal = ({ isOpenModal, toggleModal, currency }: Props) => {
  const { addCurrency, portfolioCurrencies } = useContext(PortfolioContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClose = useCallback(() => {
    toggleModal();
    reset();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = ({ value }) => {
    const price: string = String((+currency.price * value).toFixed(2));
    const currencyToSet: PortfolioCurrency = { ...currency, price: price, amount: value };
    addCurrency(currencyToSet, value);
    toggleModal();
    reset();
  };

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolioCurrencies));
  }, [portfolioCurrencies]);

  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpenModal]);

  return (
    <Portal target={PortalTarget.ADD_TO_PORTFOLIO}>
      <div className={`modal-background ${isOpenModal ? "" : "none"}`} data-cy="modal-background">
        <form onSubmit={handleSubmit(onSubmit)} className="modal">
          <div className="modal-header">
            <h2 className="modal-title">Add to portfolio</h2>
            <Button
              type="button"
              label="x"
              onClick={handleClose}
              mode="cancel"
              dataCy="button-cancel"
            />
          </div>
          <div className="modal-main">
            <input
              {...register("value", {
                required: "*value is required",
                maxLength: {
                  value: 5,
                  message: "*max 5 characters",
                },
                min: {
                  value: 0.1,
                  message: "*min value 0.1",
                },
              })}
              className="modal-main__input"
              type="number"
              placeholder="Enter amount"
              step="0.1"
              data-cy="input"
            />
            {errors.value && <p className="input-error">{errors.value.message}</p>}
          </div>
          <div className="modal-footer">
            <button type="submit" className="modal-footer__button" data-cy="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Portal>
  );
};
