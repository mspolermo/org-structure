import { observer } from 'mobx-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { Person, PersonSearchCard } from '@/entities/Person';
import { CrossInsideCircle } from '@/shared/assets/svg-icons/status';
import { getRouteSearch } from "@/shared/const/router"
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';

import cls from './SearchPanel.module.scss';
import { ChangeOpacityMotion } from '../../anim/OpacityAnimation';
import { ChangeSearchMotion } from '../../anim/SearchPanelAnimation';
import { fetchSearchData } from '../../lib/fetchSearchData';
import searchPanelStore from '../../model/store/searchPanelStore';

interface SearchPanelProps {
	className?: string;
}

// TODO добавить анимированное открытие\закрытие, навигацию по элементам в открытом меню по нажатию стрелок на клавиатуре

export const SearchPanel = observer(({ className }: SearchPanelProps) => {

    const navigate = useNavigate();
    const { rootStore } = useStoreProvider();

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(document.activeElement === ref.current);
    
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState<Person[]>([])
    const isNoResults = Boolean(!searchData.length);

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

    const clickHandler = useCallback((name: string) => {
        navigate(getRouteSearch(name));
        setSearchData([]);
        setInputValue('');
    }, [navigate]);

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
            <VStack
                id='block'
                align='center'
                justify='center'
                max
                className={cls.suggester}
                onKeyDown={keyDownHandler}
            >  
                <ChangeSearchMotion 
                    reanimate={searchData.length} 
                    flag={inputValue.length == 0}
                    duration={0.5} 
                    initialHeight={'80px'}
                    endHeight={'auto'}
                >
                    <ChangeOpacityMotion 
                        reanimate={searchData.length} 
                        initial={0} 
                        end={1} 
                        duration={2}
                    >
                        {searchData.map(p => 
                            <PersonSearchCard
                                key={p.id}
                                person={p}
                                department={'Отдел 16'}
                                onClick={() => clickHandler(p.name)}
                                className={searchData.length ? cls.display : cls.hidden}
                            />
                        )}
                    </ChangeOpacityMotion>
                </ChangeSearchMotion>

                {isNoResults && 
                <ChangeSearchMotion 
                    reanimate={inputValue.length == 0 ? "true" : "false"} 
                    duration={0.5} 
                    initialHeight={inputValue.length == 0 ? 'auto' : '0'}
                    endHeight={inputValue.length == 0 ? '0' : 'auto'}
                    loader
                >
                    <Loader className={inputValue.length == 0 ? cls.hidden : cls.loader}/>
                </ChangeSearchMotion>
                }
            </VStack>
            

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
