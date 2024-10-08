import { IPromiseBasedObservable } from "mobx-utils"
import { ReactElement } from 'react';

/**
 * Хук возвращает один из двух реакт-элементов, в зависимости от асинхронного статуса поля в mobx Store
 * @param storeField - Асинхронное поле mobx Store 
 * @param pendindElement - Элемент, возвращаемый в случае статуса pending для асинхронного запроса или undefiend для поля mobx Store (случай когда запрос еще не успел отправится) 
 * @param fulfilledElement - Функция возвращающая элемент (изи данные) в случае успешной загрузки данных
*/

interface useStoreRetrieveProps<T> {
    storeField: IPromiseBasedObservable<T> | undefined,
    pendindElement: ReactElement | null,
    fulfilledElement: (res: T) => ReactElement | T | null
}

export function useStoreRetrieve<T>( props: useStoreRetrieveProps<T>) {
    //TODO: нужен ли вообще этот хук (проверить используется ли под конец разработки)
    const {storeField, pendindElement, fulfilledElement} = props;

    return (storeField)
        ? storeField.case({
            pending: () => pendindElement,
            rejected: (e) => {throw new Error(e)},
            fulfilled: fulfilledElement
        })
        : pendindElement
}
