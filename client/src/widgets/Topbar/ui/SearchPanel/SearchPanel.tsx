import { observer } from 'mobx-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Person } from '@/entities/Person';
import { CrossInsideCircle } from '@/shared/assets/svg-icons/status';
import { getRouteSearch } from "@/shared/const/router"
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import cls from './SearchPanel.module.scss';
import { SearchResults } from './SearchResults/SearchResults';
import { fetchSearchData } from '../../lib/fetchSearchData';
import searchPanelStore from '../../model/store/searchPanelStore';

interface Props {
	className?: string;
}

export const SearchPanel = observer(({ className }: Props) => {

    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(document.activeElement === ref.current);
    
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState<Person[]>([])

    const debouncedFetchData = useDebounce(async () => {
        const data = await fetchSearchData(inputValue);
        setSearchData(data);
    }, 300);
    
    useEffect(() => {
        if (searchPanelStore.searchLine) {
            setInputValue(searchPanelStore.searchLine);
            ref.current?.focus();
            searchPanelStore.clearSearchLine();
        }
    // Установка значения в строку поиска из других компонентов (через хук useSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPanelStore.searchLine]);

    useEffect(() => {
        if (inputValue.length > 0) {
            setSearchData([])
            debouncedFetchData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputValue]);

    useEffect(() => {
        if (!isFocused) {
            setInputValue('');
        }
        // очистка введённого текста в поле поиска, в случае если элемент не в фокусе
    }, [isFocused]);

    const clickInputHandler = useCallback(() => {
        rootStore.updateFocusedCardNumber(-1);
        rootStore.updateFocusedPersonId("");  
    // сброс фокуса на карточке при нажатии на строку поиска
    }, [rootStore]);

    const updateFocus = useCallback((newValue: number) => {
        console.log(newValue)
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
        if(newValue == len) {
            rootStore.updateFocusedCardNumber(0);
            rootStore.updateFocusedPersonId(arr[0].id);  
        }        
    }, [rootStore, searchData])

    const keyDownHandler = useCallback((event: {keyCode: number}) => {
        // переход на страницу поиска по нажатию на клавишу Enter
        if(event.keyCode === 13) {
            if(rootStore.focusedPersonId != "") {
                navigate(getRouteSearch(searchData[rootStore.focusedCardNumber].name));
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

    }, [inputValue, navigate, rootStore.focusedCardNumber, rootStore.focusedPersonId, searchData, updateFocus]);

    useEffect(() => {
        rootStore.updateFocusedCardNumber(-1);
        rootStore.updateFocusedPersonId("");  
    // сброс фокуса на карточке при изменении inputValue
    }, [inputValue, rootStore]);

    return (
        <div className={classNames(cls.SearchPanel, {}, [className])}>

            {rootStore.auth && 
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder='Поиск...'
                    inputVariant='clear'
                    className={cls.input}
                    onKeyDown={keyDownHandler}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onClick={clickInputHandler}
                />
            }

            <SearchResults 
                inputValue={inputValue}
                searchData={searchData}
                setInputValue={setInputValue}
                setSearchData={setSearchData}
                keyDownHandler={keyDownHandler}
            />

            {inputValue && 
                <Icon
                    Svg={CrossInsideCircle}
                    color='inverted'
                    clickable
                    onClick={() => setInputValue('')}
                    className={cls.clearBtn}
                />
            }

        </div>
    );
});
