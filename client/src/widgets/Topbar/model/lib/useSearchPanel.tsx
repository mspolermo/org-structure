import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { PersonSearched, searchPersons } from "@/entities/Person";
import { getRouteSearch, getRouteViewPerson } from "@/shared/const/router"
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";

import searchPanelStore from '../../model/store/searchPanelStore';

/**
 * Хук для бработки поведения SearchPanel.
 * Возвращает clickInputHandler, keyDownHandler
 * @param inputValue - значение из input
 * @param setInputValue - функция для изменения response
 * @param ref - ref на input
 * @param searchData - данные поиска
 * @param isFocused - фокус на строке поиска
 * @param setIsLoading - функция для изменения isLoading
 * @param setSearchData - функция для изменения searchData
*/

interface Props {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    ref: React.RefObject<HTMLInputElement>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setSearchData: React.Dispatch<React.SetStateAction<PersonSearched[]>>
    searchData: PersonSearched[]
    isFocused: boolean
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
}

export const UseSearchPanel = (props: Props) => {
    const {inputValue, setInputValue, ref, searchData, isFocused, setIsLoading, setIsFocused, setSearchData} = props;

    const { rootStore } = useStoreProvider();
    const navigate = useNavigate();

    const debouncedFetchData = useDebounce(async () => {
        setIsLoading(true);
        const data = await searchPersons(inputValue);
        setSearchData(data);
        setIsLoading(false);
    }, 300);
        
    useEffect(() => {
        if (searchPanelStore.searchLine) {
            setIsFocused(true);
            setInputValue(searchPanelStore.searchLine);
            ref.current?.focus();
            setIsFocused(true);
        }
    // Установка значения в строку поиска из других компонентов (через хук useSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPanelStore.searchLine]);

    useEffect(() => {
        if (!isFocused && !searchPanelStore.searchLine) {
            setTimeout( () => setInputValue(''), 100);
        }
        if (!isFocused && searchPanelStore.searchLine) {
            setTimeout( () => setInputValue(''), 1);
            searchPanelStore.clearSearchLine();
        }
        // очистка введённого текста в поле поиска, в случае если элемент не в фокусе
    }, [isFocused, setInputValue]);

    useEffect(() => {
        if (inputValue.length > 0) {
            setIsLoading(true);
            setSearchData([])
            debouncedFetchData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputValue]);

    useEffect(() => {
        rootStore.updateFocusedCardNumber(-1);
        rootStore.updateFocusedPersonId("");  
    // сброс фокуса на карточке при изменении inputValue
    }, [inputValue, rootStore]);

    const clickInputHandler = useCallback(() => {
        rootStore.updateFocusedCardNumber(-1);
        rootStore.updateFocusedPersonId("");  
    // сброс фокуса на карточке при нажатии на строку поиска
    }, [rootStore]);

    const updateFocus = useCallback((newValue: number) => {
        const arr = searchData;
        const len = arr.length;

        if (len == 0) return

        if(len > newValue && newValue > -1) {
            rootStore.updateFocusedCardNumber(newValue);
            rootStore.updateFocusedPersonId(arr[newValue].id);           
        }
        if(newValue == -1) {
            rootStore.updateFocusedCardNumber(len - 1);
            rootStore.updateFocusedPersonId(arr[len - 1].id);  
        }
        if(newValue == 5) {
            rootStore.updateFocusedCardNumber(0);
            rootStore.updateFocusedPersonId(arr[0].id);  
        }        
    }, [rootStore, searchData])

    const keyDownHandler = useCallback((event: {keyCode: number}) => {
        // переход на страницу поиска по нажатию на клавишу Enter
        if(event.keyCode === 13) {
            if(rootStore.focusedPersonId != "") {
                navigate(getRouteViewPerson(searchData[rootStore.focusedCardNumber].id));
            } else if (inputValue) {
                navigate(getRouteSearch(inputValue));
            }
            setSearchData([]);
            setInputValue('');
        }
        // сброс inputValue при нажатии на клавишу Esc
        if(event.keyCode === 27) {
            setInputValue('');
        }
        // переход между результатами поиска стрелками вверх/вниз
        if(event.keyCode === 38) {
            updateFocus(rootStore.focusedCardNumber - 1);
        }
        if(event.keyCode === 40) {
            updateFocus(rootStore.focusedCardNumber + 1);
        }

    }, [
        inputValue,
        navigate,
        rootStore.focusedCardNumber,
        rootStore.focusedPersonId,
        searchData,
        setInputValue,
        setSearchData,
        updateFocus
    ]);

    return { clickInputHandler, keyDownHandler }
}
